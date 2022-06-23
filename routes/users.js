let nedb = require('nedb');
let database = new nedb({
    filename: 'users.db',
    autoload: true,
});

module.exports = (app) => {
    let route = app.route('/users');

    route.get((req, res) => {
        database.find({}).sort({name:1}).exec((error, user) => {
            if (error) app.utils.error.send(error, req, res);
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({user});
            }
        });
    });

    route.post((req, res) => {
        database.insert(req.body, (error, user) => {
            error ? app.utils.error.send(error, req, res) : res.status(200).json(user);
        });
    });
}