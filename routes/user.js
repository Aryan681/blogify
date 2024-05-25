const {Router} = require("express");
const router =Router();
const User = require("../model/user.js");

//routes to signin page
router.get('/signin',(req, res)=> {
    return res.render("signin",{
        current_page: 'signin',
        user: req.user ,
    })
});

//route to signup page
router.get('/signup',(req, res)=> {
    return res.render("signup",{
        current_page: 'signup',
        user: req.user ,
    })
});

router.get('/logout',(req, res)=> {
    res.clearCookie("token").redirect("/user/signup")
});



// fetch data from the database
router.post('/signin',async (req, res)=> {
    const {email,password} = req.body;
    try {
    const token = await User.matchPasswordAndGenerateToken(email,password);
    return res.cookie("token" ,token).redirect("/");
    } catch (error) {
        return res.render("signin",{
            error: "incorrect Password Or Email",
        });
        
    }
});
// fetch data from the form and update in the database
router.post('/signup',async (req, res)=> {
    const {fullname,email,password} = req.body;
    if(!fullname || !email || !password) return res.redirect("signup");
    try {
        await User.create({
            fullname,
            email,
            password,
        });
        return res.redirect("/");
    } catch (error) {
        
        return res.redirect("signup")
    }
});
module.exports=router ;


