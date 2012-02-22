define('User', function () {
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
});var Restaurant = describe('Restaurant', function () {
    property('name', String);
    property('address', String);
    property('phone', String);
    property('website', String);
    property('type', String);
});