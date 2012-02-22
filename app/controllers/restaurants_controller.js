load('application');

before(loadRestaurant, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New restaurant';
    this.restaurant = new Restaurant;
    render();
});

action(function create() {
    Restaurant.create(req.body.Restaurant, function (err, restaurant) {
        if (err) {
            flash('error', 'Restaurant can not be created');
            render('new', {
                restaurant: restaurant,
                title: 'New restaurant'
            });
        } else {
            flash('info', 'Restaurant created');
            redirect(path_to.restaurants);
        }
    });
});

action(function index() {
    this.title = 'Restaurants index';
    Restaurant.all(function (err, restaurants) {
        render({
            restaurants: restaurants
        });
    });
});

action(function show() {
    this.title = 'Restaurant show';
    render();
});

action(function edit() {
    this.title = 'Restaurant edit';
    render();
});

action(function update() {
    this.restaurant.updateAttributes(body.Restaurant, function (err) {
        if (!err) {
            flash('info', 'Restaurant updated');
            redirect(path_to.restaurant(this.restaurant));
        } else {
            flash('error', 'Restaurant can not be updated');
            this.title = 'Edit restaurant details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.restaurant.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy restaurant');
        } else {
            flash('info', 'Restaurant successfully removed');
        }
        send("'" + path_to.restaurants + "'");
    });
});

function loadRestaurant() {
    Restaurant.find(params.id, function (err, restaurant) {
        if (err) {
            redirect(path_to.restaurants);
        } else {
            this.restaurant = restaurant;
            next();
        }
    }.bind(this));
}
