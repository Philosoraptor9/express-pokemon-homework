const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const ejsLint = require('ejs-lint');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
//
app.use(express.static('/views'));


const Pokemon = require('./pokemon')

app.get('/', (req, res) => {
    res.send('Gotta catch em all...')
  });

// Display all the pokemons
app.get('/pokemon', (req, res) => {
    const context = {pokemon: Pokemon}
    res.render('index.ejs', context)
});

// Display a specific pokemon
app.get('/pokemon/:id', (req, res) => {
    const context = {pokemon: Pokemon[req.params.id]}
    console.log(JSON.stringify(context))
    res.render('show.ejs', context)
});

// Add a new pokemon
app.get('/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/pokemon', (req, res) => {
    Pokemon.push(req.body);
    res.redirect('/pokemon');
})

// Edit a pokemon
app.get('/pokemon/:id/edit', (req, res) => {
    const data = {pokemon: Pokemon[req.params.id], id: req.params.id}
    res.render('edit.ejs', data)
})

app.put('/pokemon/:id', (req, res) =>{
    Pokemon[req.params.id] = req.body;
    res.redirect('/pokemon')
})

// Delete a pokemon
app.delete('pokemon/:id', (req, res) => {
    console.log(req.params.id, 'id in delete route');
    Pokemon.splice(req.params.id, 1);
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})

module.exports = app;