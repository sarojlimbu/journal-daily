const express=require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const { contentType } = require("express/lib/response");
const _=require("lodash")

let posts=[];



const homeStartingContent=`The daily log is when you journal about your 
day-to-day: what you did, what you ate, who 
you saw and spoke with. Whatever you want.
It’s a working way to log your life.
The best part about this journaling habit is 
that you literally have a hand-written record of what
you’ve done on any given day… And believe 
me when I tell you that it comes in handy.`

const aboutContent=`Gratitude journaling can be done anytime during 
the day, but I’d recommend doing it in the morning before beginning
 your workday. Why? Because genuine gratitude reverberates into the
  rest of your entire day, setting off a domino effect of optimism 
  with which you can approach your work, your clients, your family,
   and everyone else you cross paths with.`

const contactContent=`the act or state of touching; a touching
 or meeting, as of two things or people.
immediate proximity or association.
an acquaintance, colleague, or relative
 through whom a person can gain access to
  information, favors, influential people, 
  and the like.`

const app=express();

app.set("view engine","ejs");


app.use(bodyparser.urlencoded({extended:true}));
// app.use(express.static("public"));
app.use(express.static('public'));

app.get("/",function(req,res){
  
   res.render('home',{hContent:homeStartingContent,posts:posts});
})

app.get("/about",function(req,res){
    res.render('about',{aContent:aboutContent});
 })

app.get("/contact",function(req,res){
    res.render('contact',{cContent:contactContent});
 })


app.get("/compose",function(req,res){
    res.render("compose");
 
})
 

app.post("/compose",function(req,res){
  const post={
      title:req.body.iText,
      content:req.body.tText,
  }
  posts.push(post);
  res.redirect("/");
})



app.get("/post/:postId",function(req,res){
     const temp=req.params.postId;
    _.toLower(temp);
    posts.forEach(function(post){
        if(_.toLower(post.title)===temp){
            res.render("post",{post:post})

        }
    })
    
})

app.listen(3000,function(){
    console.log("server is running on port 3000.")
})