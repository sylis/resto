/*
var User = define('User', function () {
    property('email', String, { index: true });
    property('password', String);
    property('activated', Boolean, {default: false});
});

var Restaurant = describe('Restaurant', function () {
    property('name', String);
    property('address', String);
    property('phone', String);
    property('website', String);
    property('type', String);
});
*/

customSchema(function () {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');

    var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

    var Restaurant = new Schema({
        name    : ObjectId
        , address     : String
        , phone       : String
        , website     : String
        , type        : [String]
    });

    var Resto = mongoose.model('Restaurant', Restaurant);
    Resto.modelName = 'Restaurant'; // this is for some features inside railway (helpers, etc)

    module.exports['Restaurant'] = Resto;
});
