const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
      .then((beersFromApi) => {
        //console.log(beersFromApi)
        res.render('beers', {beersFromApi})
      })
      .catch((error) => {
        res.render(error)
      })
});

// app.get('/beers/:id', (req, res) => {
//   const beerNum = req.params.id
//   punkAPI.getBeer(beerNum)
//   .then(beers => {
//     const beersFromApi = beers[0] //its because how the api works!
//     console.log(beersFromApi)
//     res.render('beers',{beersFromApi})
//     })
//     .catch(error => {
//       console.log(error)
//     })
// })


app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then((responseFromApi) => {
      res.render('random-beers', {responseFromApi})
    })
    .catch((error) => {
      res.render(error)
    })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
