const mongoose = require("mongoose");
const {Schema} = mongoose;
const Review = require("./reviews");

const listenSchema = new Schema({
    title : {
        type:String,
        required : true
    },
    description : {
        type:String
    },
    image :{
        url:String,
        filename:String,
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:"Review",
    }],

    owner:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    }]
});

listenSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
            await Review.deleteMany({_id :{$in:listing.reviews}});
    };
});

const listing = mongoose.model("listing",listenSchema);
module.exports = listing;

