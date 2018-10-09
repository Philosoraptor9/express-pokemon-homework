const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

const Pokemon = require('./pokemon')

app.get('/', (req, res) => {
    res.send('Gotta catch em all...')
  });

  app.get('/pokemon', (req, res) => {
    const pokeString = JSON.stringify(Pokemon)
    res.send(pokeString)
  });

app.listen(3000, () => {
    console.log('listening on port 3000')
  })