// Main Servier file
// Written by Agustin Ortiz for Technicity

var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');


//app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;      

// Router
var router = express.Router();          

var mongoose   = require('mongoose');
mongoose.connect('mongodb://augieortiz:DevAO1@ds135760.mlab.com:35760/technicityapi');

var Technicity = require('./app/models/technicity');
var tableify = require('tableify');
var path    = require("path");


router.get('/', function(req, res) {
    //res.json({message: 'Welcome to the Technicity Developer API. You can hire, fire, or view a list of developers.'}); 
    res.sendFile(path.join(__dirname+'/index.html'));

});

router.use(function(req, res, next) {
    console.log('Log for request...');
    next(); 
});



router.route('/technicity')

    .post(function(req, res) {

        var tech = new Technicity();     
        tech.name = req.body.name;  

        tech.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Test technicity object created!' });
        });



    })

    .get(function(req, res) {

		var tech = new Technicity();  

        Technicity.find(function(err, Technicity) {
            if (err)
                res.send(err);

            res.json(Technicity);            
         });

    });


router.route('/devforhire')

    .post(function(req, res) {

        var tech = new Technicity();     
        tech.name = req.body.name;  

        tech.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Developer hired! -' + tech.name });
        });



    })

    .get(function(req, res) {

		var tech = new Technicity();  

        Technicity.find(function(err, Technicity) {
            if (err)
                res.send(err);

            res.json(Technicity);
         });
    });

router.route('/devforhire/:dev_id')

	.get(function(req, res) {
        Technicity.findById(req.params.dev_id, function(err, Technicity) {
            if (err)
                res.send(err);
            res.json({message: 'Developer viewed: ' + Technicity.name });
        });
 

	})


    .delete(function(req, res) {
        Technicity.remove({
            _id: req.params.dev_id
        }, function(err, Technicity) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully fired developer! - ' + req.params.dev_id });
        });
    });



app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Agustin Ortiz - Technicity API starting now....' + port);





