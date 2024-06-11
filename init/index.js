const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listen.js");
const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{console.log("connected successfully")})
.catch(err =>{console.log(err)});


async function main(){
    await mongoose.connect(Mongo_URL);
};


async function initDb(){

    await listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"6651af219ef6a74b2a9e5d9b"}));
    await listing.insertMany(initData.data);
    console.log("data was initilaized");
};

initDb();