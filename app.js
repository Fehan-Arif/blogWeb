//jshint esversion:6
// 
// Required Packages
// 
const express = require("express"),
      bodyParser = require("body-parser"),
      ejs = require("ejs"),
      _ = require("lodash"),
      app = express();
// 
// Generic Init Data
// 
const homeStartingContent = "Just a basic web application on using Node.js delivering content via arrays. No Database in this one.";
const aboutContent = "Hi, I am Fehan Arif. A web Developer. I love making apps such as these for fun. Feel free to contact me about them.";
const contactContent = "You can contact me by sending me a message below!";
// 
// Global Array
// 
let posts = [];
// 
// View Settings
//
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// 
// Home Route
//
app.route("/")
.get((req, res) => {
  res.render( "home", {
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});
// 
// About Route
//
app.route("/about")
.get((req, res) => {
  res.render("about", {aboutContent:aboutContent});
});
// 
// Contact Route
//
app.route("/contact")
.get((req, res) => {
  res.render("contact", {contactContent: contactContent});
});
// 
// Compose Route
//
app.route("/compose")
.get((req, res) => {
  res.render("compose");
})
.post((req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});
// 
// Post Route
//
app.route("/posts/:postName")
.get((req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    let storedTitle = _.lowerCase(post.title);
    if(requestedTitle === storedTitle){
      console.log("Found match");
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }})
  
});
// 
// Listen Port
//
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
