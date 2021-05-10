
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();



app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//routes
const movieRoutes = require('./routes/movies');
const tvRoutes = require('./routes/tv');
const homeRoutes = require('./routes/home');


app.use(movieRoutes);
app.use(tvRoutes);
app.use(homeRoutes);


app.listen(process.env.PORT || 3000,()=>{
    console.log('Server started on Port 3000');
})