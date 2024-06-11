const User = require("../models/user");


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs")
};


module.exports.createNewUser = (async (req,res,next)=>{
    try{
     let {username , email , password } = req.body;
     const newUser = new User({email , username});
     const registeredUser = await User.register(newUser , password);
     req.login(registeredUser,(err)=>{
         if(err){
             next(err);
         }else{
             req.flash("success","Welcome to WanderLust");
             res.redirect("/listings");
         }
     });
     }catch(err){
     req.flash("error",err.message);
     res.redirect("/signup");
    }
 });

 module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginUser = async (req,res)=>{
    req.flash("success","Welcome back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success","You are logged out !");
            res.redirect("/listings");
        };
    });
};