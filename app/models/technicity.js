var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Technicity   = new Schema({
    name: String
});

module.exports = mongoose.model('Technicity', Technicity);

