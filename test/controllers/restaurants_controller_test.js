require('../test_helper.js').controller('restaurants', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        name: '',
        address: '',
        phone: '',
        website: '',
        type: ''
    };
}

exports['restaurants controller'] = {

    'GET new': function (test) {
        test.get('/restaurants/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/restaurants', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Restaurant.find;
        Restaurant.find = sinon.spy(function (id, callback) {
            callback(null, new Restaurant);
        });
        test.get('/restaurants/42/edit', function () {
            test.ok(Restaurant.find.calledWith('42'));
            Restaurant.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Restaurant.find;
        Restaurant.find = sinon.spy(function (id, callback) {
            callback(null, new Restaurant);
        });
        test.get('/restaurants/42', function (req, res) {
            test.ok(Restaurant.find.calledWith('42'));
            Restaurant.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var restaurant = new ValidAttributes;
        var create = Restaurant.create;
        Restaurant.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, restaurant);
            callback(null, restaurant);
        });
        test.post('/restaurants', {Restaurant: restaurant}, function () {
            test.redirect('/restaurants');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var restaurant = new ValidAttributes;
        var create = Restaurant.create;
        Restaurant.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, restaurant);
            callback(new Error, null);
        });
        test.post('/restaurants', {Restaurant: restaurant}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Restaurant.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/restaurants/1', new ValidAttributes, function () {
            test.redirect('/restaurants/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Restaurant.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/restaurants/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

