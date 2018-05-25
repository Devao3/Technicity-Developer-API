const expect = require("chai").expect;
const request = require("superagent");
const config = require("../configuration/config");
const baseUrl = `http://localhost:${config.port}`;
let devId;

describe("Augie Tests", function(done) {
  it("should get root", () => {
    return request
      .get(`${baseUrl}/api`)
      .send()
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message");
      });
  });

  it("should post a dev", () => {
    return request
      .post(`${baseUrl}/api/devforhire`)
      .send({ name: "BJ" })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message");
        devId = res.body.id;
      });
  });

  it("should find devs", () => {
    return request
      .get(`${baseUrl}/api/devforhire/${devId}`)
      .send()
      .then(res => {
        expect(res.status).to.equal(200);
      });
  });

  it("should delete devs", () => {
    return request
      .del(`${baseUrl}/api/devforhire/${devId}`)
      .send()
      .then(res => {
        expect(res.status).to.equal(200);
      });
  });
});
