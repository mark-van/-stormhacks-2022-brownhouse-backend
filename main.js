const express = require('express')
const app = express()
const mongoose = require('mongoose')
const axios = require('axios')
const path = require('path')
//const session = require('express-session')
const port = 3000

const Picks = require('./models/picks');

mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })



app.set('view engine', 'ejs');//express will require the package behind the scenes
app.set('views', path.join(__dirname, '/views'));//comonly used

//oops this is a get for our won site(like into it)
// app.get('https://api.themoviedb.org/3/movie/550?api_key=55e40d26cd17e226fb76168257d32c02&language=en-US', (req, res) => {
//     res.render('Hare');
// })
app.use(express.urlencoded({extended: true})); //middelware
//app.use(session({ secret: 'verysecret' }));

app.get('/', (req, res) => {
    res.render('home.ejs');
    // if(req.session.count10){
    //   req.session.count10 +=1;
    // }else {
    //   req.session.count10 =1;
    // }
  
    //worked
    // axios
    //   .get('https://api.themoviedb.org/3/movie/550?api_key=55e40d26cd17e226fb76168257d32c02&language=en-US')
    //   .then(res => {
    //     console.log(`statusCode: ${res.status}`)
    //     console.log(res.data)
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })

    // axios
    //   .get('https://api.themoviedb.org/3/genre/movie/list?api_key=55e40d26cd17e226fb76168257d32c02&language=en-US')
    //   .then(res => {
    //     console.log(`statusCode: ${res.status}`)
    //     console.log(res.data)
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })
    //lets have this trigger with a button
    // axios
    //   .get('https://api.themoviedb.org/3/discover/movie?api_key=55e40d26cd17e226fb76168257d32c02&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2012&release_date.lte=2022&with_genres=Action&with_watch_monetization_types=flatrate')
    //   .then(res => {
    //     console.log(`statusCode: ${res.status}`)
    //     console.log(res.data)
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   }) 

})

app.get('/movies/selection/:id/:genre/:release', async (req, res) => {
  const { id, genre, release } = req.params;
  console.log(`${id}`)
  console.log(`${genre}`)
  console.log(`${release}`)

  //setup release later
  let data;
  axios
      .get('https://api.themoviedb.org/3/discover/movie?api_key=55e40d26cd17e226fb76168257d32c02&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2012&release_date.lte=2022&with_genres=genre&with_watch_monetization_types=flatrate')
      .then(res => {
        console.log(`statusCode: ${res.status}`)
        data = res.data.results;
        console.log(res.data.results)
      })
      .catch(error => {
        console.error(error)
      }) 
  res.render(`/select`, {id , data})
})


app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`)
})
    
app.get('/type/choose', (req, res) => {   
  res.render('type.ejs')
})

app.post('/type', async (req, res) => {
  const newPicks = new Picks(req.body);
  console.log(`picks: ${newPicks}`)
  await newPicks.save();
  res.redirect(`/`)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})