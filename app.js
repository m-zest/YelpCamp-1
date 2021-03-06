const { compile } = require("ejs");

const express       = require("express"),
    app             = express(),
    mongoose        = require('mongoose')

mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

//SCHEMA SETUP
var campgroundSchema= new mongoose.Schema({
    name:String,
    image:String,
    description:String
})

var Campground =mongoose.model("Campground",campgroundSchema);

//Create new Campground
//Campground.create({
//    name:"Finland, Stars Sky",
//    image:"https://pixabay.com/get/57e9dc404d52a514f1dc84609620367d1c3ed9e04e507440712e7ad39248c0_340.jpg"
//},function(err,campground){
//    if(err){
//        console.log(err)
//    }
//    else{
//        console.log("Newly Created Campground : ")
//        console.log(campground)
//    }
//})


app.get("/", function(req, res){
    res.render("home")
})

app.get("/campgrounds", function(req,res){
  //Getting all the campgrounds from DB
    Campground.find({}, function(err,campgrounds){
        if(err){
            console.log(err)
        }
        else
        {
            res.render("index",{campgrounds:campgrounds});
        }
    })
})

app.post("/campgrounds", function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newcampground={name:name,image:image,description:desc};
    Campground.create(newcampground, function(err,newlycreated){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("campgrounds")
        }
    });
})

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs")
})

app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id, function(err,foundcampground){
        if(err){
            console.log(err)
        }
        else{
            res.render("show",{campground:foundcampground})
        }
    })
})


app.listen(3000, function(){
    console.log("YelpCamp server has Started !!")
})