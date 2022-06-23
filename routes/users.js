let nedb = require('nedb');
const {body, validationResult} = require('express-validator');

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

    route.post([
            body('name').notEmpty().withMessage("Name can't be empty"),
            body('email').notEmpty().isEmail().withMessage("Invalid email")
        ],
        (req, res) => {

        if (app.utils.validator.user(app, validationResult, req, res))
            database.insert(req.body, (error, user) => {
                error ? app.utils.error.send(error, req, res) : res.status(200).json(user);
            });
    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {
        database.findOne({_id:req.params.id}).exec((error, user) => {
            error ? app.utils.error.send(error, req, res) : res.status(200).json(user);
        });
    });

    routeId.put((req, res) => {
        database.update({_id:req.params.id}, req.body, error => {
            error ? app.utils.error.send(error, req, res) : res.status(200).json(Object.assign(req.params, req.body));
        });
    });

    routeId.delete((req, res) => {
        database.remove({_id:req.params.id}, {}, error => {
            error ? app.utils.error.send(error, req, res) : res.status(200).json(req.params);
        });
    });
}