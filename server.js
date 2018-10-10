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

app.get('/pokemon', (req, res) => {
    const context = {pokemon: Pokemon}
    res.render('index.ejs', context)
});

app.get('/pokemon/:id', (req, res) => {
    const context = {pokemon: Pokemon[req.params.id]}
    console.log(JSON.stringify(context))
    res.render('show.ejs', context)
});

app.listen(3000, () => {
    console.log('listening on port 3000')
})

module.exports = app;