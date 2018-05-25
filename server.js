// Main Servier file
// Written by Agustin Ortiz for Technicity

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const config = require("./configuration/config");
const morgan = require("morgan");

//app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Router
var router = express.Router();

var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://augieortiz:DevAO1@ds135760.mlab.com:35760/technicityapi"
);

var Technicity = require("./app/models/technicity");
const path = require("path");

router.get("/", function(req, res) {
  res.json({
    message:
      "Welcome to the Technicity Developer API. You can hire, fire, or view a list of developers."
  });
  // res.sendFile(path.join(__dirname+'/index.html'));
});

// router.use(function(req, res, next) {
//   console.log("Log for request...");
//   next();
// });

router
  .route("/technicity")

  .post(function(req, res) {
    var tech = new Technicity();
    tech.name = req.body.name;

    tech.save(function(err) {
      if (err) {
        return res.json(err);
      }

      res.json({ message: "Test technicity object created!" });
    });
  })

  .get(function(req, res) {
    var tech = new Technicity();

    Technicity.find(function(err, Technicity) {
      if (err) res.send(err);

      res.json(Technicity);
    });
  });

router.post("/devforhire", async (req, res) => {
  var tech = new Technicity();
  tech.name = req.body.name;

  let dev = await tech.save();
  console.log(dev);
  return res.json({ message: "Developer hired! -" + tech.name, id: dev._id });
});

router.get("/devforhire", async (req, res) => {
  let devs = await Technicity.find({});
  return res.json(devs);
});

router.get("/devforhire/:dev_id", async (req, res) => {
  let dev = await Technicity.findById(req.params.dev_id);
  res.json(dev.toJSON());
});

router.delete("/devforhire/:dev_id", (req, res) => {
  Technicity.remove(
    {
      _id: req.params.dev_id
    },
    function(err, Technicity) {
      if (err) res.send(err);

      res.json({
        message: "Successfully fired developer! - " + req.params.dev_id
      });
    }
  );
});

app.use("/api", router);

// START THE SERVER
app.listen(config.port);
console.log("Agustin Ortiz - Technicity API starting now...." + config.port);
