
const router = require('express').Router()

const movies = [
    {
 }] //on the FLY

//APIs  Request 
//Get Requst ==> Get all movies

router.get('/', function (req, res) {   
    res.send('No Thing')
  })

  router.get('/:id', function (req, res) {
    const {id} = req.params
    const movieIndex = movies.findIndex((item)=>item.id == id)
    if (movieIndex == -1)
    {
        res.statusCode = 404
        res.send({message:"movie not Found"})
    }
    else{
        res.send(movies[movieIndex])
    }
  })
  module.exports=router;