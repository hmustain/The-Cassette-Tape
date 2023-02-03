const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');



 const hbs = exphbs.create({ helpers });

 // Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res) {
    res.render('event');
  });

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');