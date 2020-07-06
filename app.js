const express = require("express")
const app = express();

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

var campgrounds = [
    {name: "Shimla" , image:"https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507440762679d6934cc1_340.jpg"},
    {name: "Kashmir" , image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Goa" , image:"https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Nanital" , image:"https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Lakshdeep" , image:"https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Maunt Abu" , image:"https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Manali" , image:"https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507440762679d6934cc1_340.jpg"},
    {name: "kerela" , image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"}
]

app.get("/", function(req, res){
    res.render("home")
})

app.get("/campgrounds", function(req,res){
  
    res.render("campgrounds",{campgrounds:campgrounds});
})

app.post("/campgrounds", function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var newcampground={name:name,image:image};
    campgrounds.push(newcampground);
    res.redirect("campgrounds")
})

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs")
})


app.listen(3000, function(){
    console.log("YelpCamp server started at http://localhost:3000/")
})