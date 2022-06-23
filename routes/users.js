let nedb = require('nedb');
let database = new nedb({
    filename: 'users.db',
    autoload: true,
})

module.exports = (app) => {
    app.get('/users', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            users:[{
                name:'Fulano',
                email:'fulano@gmail.com',   
                id:1
            }]
        });
    });

    app.post('/users', (req, res) => {
        database.insert(req.body, (error, user) => {
            if (error) {
                console.log(error);
                res.status(400).json({
                    error: error
                });
            } else {
                res.status(200).json(user);
            }
        })
    });
}