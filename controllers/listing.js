const listing = require("../models/listen");

module.exports.index =(async (req,res)=>{
    const allListings =await listing.find({});
    res.render("./listings/index.ejs",{allListings});
});

module.exports.renderNewForm = (req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.showListings = (async (req,res)=>{
    let {id} = req.params;
    const showlisting = await listing.findById(id)
    .populate({path :"reviews" ,
     populate:{path :"author",  
     }}).populate("owner");
    if(!showlisting){
        req.flash("error","Listing you requested does not exists");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{showlisting});
});

module.exports.createListing = (async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing= new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename};
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");    
});

module.exports.editListing = (async (req,res)=>{
    let {id} = req.params;
    const showlisting = await listing.findById(id);
    let originalImageUrl = showlisting.image.url;
    originalImageUrl = originalImageUrl.replace("upload","upload/h_300,w_250");
    res.render("./listings/edit.ejs",{showlisting , originalImageUrl});
});

module.exports.updateListing = (async (req,res)=>{
    let {id}=req.params;
    let Listing = await listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        Listing.image = {url , filename};
        await Listing.save()
    };
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
});

module.exports.deleteListing = (async (req,res)=>{
    let {id} = req.params;
     await listing.findByIdAndDelete(id);
     req.flash("success","Listing Deleted!");
     res.redirect("/listings");
});