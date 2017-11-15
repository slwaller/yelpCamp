const express = require("express")
const router = express.Router()

const Cafe = require("../models/cafe")
const Comment = require("../models/comment")

router.get("/", function(req, res){
    //gt all cafes from db
    Cafe.find({}, function(err, cafes){
        if(err){
            console.log(err)
        } else {
            res.render("cafes/index", {cafes: cafes})
        }
    })

})

router.post("/", function(req, res){
    const name = req.body.name
    const image = req.body.image
    const desc = req.body.description
    const newCafe = {
        name: name,
        image: image,
        description: desc
    }
    //create new cafe and save to db
    Cafe.create(newCafe, function(err, newCafe){
        if(err){
            console.log(err)
        } else {
            res.redirect("")
        }
    })
})

router.get("/new", function(req, res){
    res.render("cafes/new")
})

router.get("/:id", function(req, res){
    Cafe.findById(req.params.id).populate("comments").exec(function(err, foundCafe){
        if(err){
            console.log
        } else {
            console.log(foundCafe)
            res.render("cafes/show", {cafe: foundCafe})
        }
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router