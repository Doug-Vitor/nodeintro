let nedb = require('nedb');
let database = new nedb({
    filename: 'users.db',
    autoload: true,
})

module.exports = (app) => {
    app.get('/users', (req, res) => {
        database.find({}).sort({name:1}).exec((error, users) => {
            if (error) {
                console.log(error);
                res.status(400).json({
                    error
                });
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                })
            }
        })
    });

    app.post('/users', (req, res) => {
        database.insert(req.body, (error, user) => {
            if (error) {
                console.log(error);
                res.status(400).json({
                    error
                });
            } else {
                res.status(200).json(user);
            }
        })
    });
}