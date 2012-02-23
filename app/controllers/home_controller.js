load('application');

action('index', function () {
    this.title="Resto Home";
    render({
        title: "home#index"
    });
});
