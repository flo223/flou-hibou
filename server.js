console.log('May Node be with you');
const express = require('express');
const bodyParser= require('body-parser')
const app = express();


const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://flea:Castor5544332211@ds017896.mlab.com:17896/flou', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(process.env.PORT || 5000)
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())

var lecteurs = ["Stéphanie", "Marie-France", "Florent"]


app.put('/actu', (req, res) => {
    console.log(req.body.genre)
    db.collection('livres').findOneAndUpdate({titre:"bbb"},{
        $set: {
            titre: req.body.titre,
            genre: req.body.genre
        }
    }, {
        sort: {_id: -1},
        upsert: true
    },(err, result) => {
        if (err) return res.send(err)
        res.send(result)
        console.log(result)
    })
})

app.delete('/actu', (req, res) => {
  db.collection('livres').findOneAndDelete({titre: req.body.titre},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send(result)
    console.log('livre effacé')
  })
})





app.get('/', (req, res) => {
  var cursor = db.collection('genres').find().toArray(function(err, results) {
    res.render(__dirname +'/views/index.ejs', {genres: results})
  })
})

app.get('/liste', (req, res) => {
    var cursor = db.collection('livres').find().toArray(function(err, results) {
      res.render(__dirname +'/views/liste.ejs', {livres: results, lecteurs:lecteurs})
    })
  })

app.get('/statistiques', (req, res) => {
    res.render(__dirname +'/views/statistiques.ejs')
  })

app.get('/actualiser', (req, res) => {
    var cursor = db.collection('livres').find().toArray(function(err, results) {
          res.render(__dirname +'/views/update.ejs', {livres: results})
        })
  })




app.post('/flou', (req, res) => {
  db.collection('flon').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/liste')
      })
      })

 app.post('/livres', (req, res) => {
   db.collection('livres').save(req.body, (err, result) => {
       if (err) return console.log(err)
       console.log('saved to database')
       res.redirect('/liste')
       })
   })
