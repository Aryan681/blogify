//imports
const express = require ("express");
const path = require ("path");

const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const Blog = require("./model/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const port = 80;
const app = express();

//engines
app.set("view engine", "ejs");
app.set("views ",path.join(__dirname,"views"));
    
// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/blogify").then((e)=>console.log("mongo is on") );
//middleware
app.use('/asset' ,express.static('asset'));
app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
//routes
app.get('/',async (req, res) => {
    const allBlogs = await Blog.find({}).populate('createdBy');
   
    res.render('home', {
        current_page: 'home',
        user: req.user,
        blogs: allBlogs,
    });
});
app.get('/profile',async (req, res)=> {
   
    return res.render("profile",{
        current_page: 'profile',
       user :req.user,
    })
});
app.get('/contact',async (req, res)=> {
   
    return res.render("contact",{
        current_page: 'contact',
       user :req.user,
    })
});
app.get('/about',async (req, res)=> {
   
    return res.render("about",{
        current_page: 'about',
       user :req.user,
    })
});
app.get('/services',async (req, res)=> {
   
    return res.render("service",{
        current_page: 'service',
       user :req.user,
    })
});
app.use("/user" , userRoute);
app.use("/blog" ,blogRoute);


//server start
app.listen(port , ()=> console.log("server is started"));


