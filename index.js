const express = require('express');
const hbs = require('hbs')
const wax = require('wax-on');
require('dotenv').config();

// create express app
const app = express();

// setup the express app
app.set('view engine', 'hbs');

app.use(express.static('public'));

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// enable forms
app.use(express.urlencoded({
    'extended': false
}))

// custom middlewares
app.use(function(req,res,next){
    // declare a varianle named
    // date that is available for
    // all hbs file to access
    res.locals.date = Date();

    next(); // forward the request to the next middleware
            // or if there is no middleware,to the intended route function
})

// IMPORT IN THE ROUTES
const landingRoutes = require('./routes/landing');
const productRoutes = require('./routes/products');

async function main(){
    app.get('/', function(req,res){
                res.redirect('/landing');
            })

    app.use('/landing', landingRoutes);
    app.use('/products', productRoutes);
}
main();

// (async function(){
//     console.log("app")
//     console.log("app.get")
//     app.get('/', function(req,res){
//         console.log(res);
//         res.send("Hello World");
//     })
// })();

app.listen(3000,function(req,res){
    console.log("Server started");
})