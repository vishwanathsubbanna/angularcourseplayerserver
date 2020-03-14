const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 80;
const MongoClient = require("mongodb").MongoClient;
const dbURL = "mongodb://localhost:27017";
const dbName = "courseplayer";
const dbClient = new MongoClient(dbURL, { useUnifiedTopology: true });
var dbInstance;

// DB Connection 
dbClient.connect(err=>{
    if(!err)
        {
            console.log("DB connected successfully....");
            dbInstance=dbClient.db(dbName);            
        }
    else
    {
        console.log(err);
    }
})

// Start Express Server
app.listen(port, () => console.log(`Listening to port ${port}`));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Web method for user Authentication
app.post("/auth", (req, res, next) => {
    console.log("Request Received....");
    let uname = req.body["uname"];
    let pwd = req.body["pwd"];
    console.log(`${uname} - ${pwd}`);
    res.set("Access-Control-Allow-Origin", "*");

    dbInstance.collection('users').find({ uname: uname, pwd: pwd }).toArray((err, result) => {
        if (!err) {       
            console.log(result)     
            if (result.length > 0) 
            {               
                res.json({ result: "success",usertype: result[0].usertype});                
            }
            else {
                res.json({ result: "failure" });
            }
        }
        else
            res.json({ result: "failure" });
    });    
});

// Web method to get course list
app.get("/getcourses", (req, res) => {    
    res.set("Access-Control-Allow-Origin", "*");
    
    dbInstance.collection('course').find().toArray((err, result) => {
        if (!err) 
        {
            if (result.length > 0) {
                res.json({result:"success",data:result});
            }
            else {
                res.json({ result: "failure" });
            }
        }
        else
            res.json({ result: "failure" });
    });    

});

// Web method to get TOC for the given course code
app.get("/gettocforcourse", (req, res) => {    
    let ccode=req.query["ccode"]
    
    res.set("Access-Control-Allow-Origin", "*");    
    dbInstance.collection('course').find({coursecode:ccode}).toArray((err, result) => {
        if (!err) 
        {
            if (result.length > 0) {
                res.json({result:"success",data:result});
            }
            else {
                res.json({ result: "failure" });
            }
        }
        else
            res.json({ result: "failure" });
    });    

});

// Web method to get Content for the given topic code
app.get("/getcontentforcourse", (req, res) => {    
    let ccode=req.query["ccode"]
    
    res.set("Access-Control-Allow-Origin", "*");    
    dbInstance.collection('coursecontent').find({coursecode:ccode}).toArray((err, result) => {
        if (!err) 
        {
            if (result.length > 0) {
                res.json({result:"success",data:result});
            }
            else {
                res.json({ result: "failure" });
            }
        }
        else
            res.json({ result: "failure" });
    });    

});

// Web method to get QA for the given Course code
app.get("/getqaforcourse", (req, res) => {    
    let ccode=req.query["ccode"]
    
    res.set("Access-Control-Allow-Origin", "*");    
    dbInstance.collection('courseqa').find({coursecode:ccode}).toArray((err, result) => {
        if (!err) 
        {
            if (result.length > 0) {
                res.json({result:"success",data:result});
            }
            else {
                res.json({ result: "failure" });
            }
        }
        else
            res.json({ result: "failure" });
    });    

});

// Web method to get Notes for the given Course code 
app.get("/getnotesforcourse", (req, res) => {    
    let ccode=req.query["ccode"]
    
    res.set("Access-Control-Allow-Origin", "*");    
    dbInstance.collection('coursenotes').find({coursecode:ccode}).toArray((err, result) => {
        if (!err) 
        {
            if (result.length > 0) {
                res.json({result:"success",data:result});
            }
            else {
                res.json({ result: "failure" });
            }
        }
        else
            res.json({ result: "failure" });
    });    

});

// Web method to get Reference for the given Course code 
app.get("/getrefforcourse", (req, res) => {    
    let ccode=req.query["ccode"]
    
    res.set("Access-Control-Allow-Origin", "*");    
    dbInstance.collection('coursereference').find({coursecode:ccode}).toArray((err, result) => {
        if (!err) 
        {
            if (result.length > 0) {
                res.json({result:"success",data:result});
            }
            else {
                res.json({ result: "failure" });
            }
        }
        else
            res.json({ result: "failure" });
    });    

});

// Web method for course contnet creation
app.post("/createcourse", (req, res, next) => {
    console.log("Request Received....");
    let coursetopic = req.body["ctopic"];
    let coursecontent = req.body["ccontent"];



    //console.log(coursecontent)
    
    res.set("Access-Control-Allow-Origin", "*");

    res.json("Request Received...")

    dbInstance.collection('course').insertOne(JSON.parse(coursetopic),(err,res)=>
    {
        if(!err)
            console.log(res.insertedCount);
        else
            console.log(err);    
    })

    dbInstance.collection('coursecontent').insertOne(JSON.parse(coursecontent),(err,res)=>
    {
        if(!err)
            console.log(res.insertedCount);
        else
            console.log(err);    
    })
       
});