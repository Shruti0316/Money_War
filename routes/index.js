const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database");
const e = require("express");

var name="",que="",ans="",title="";
router.get("/" || "/logout",(req,res) => {
    res.render("login.ejs");
});
router.get("/signup",(req,res) => {
    res.render("signup.ejs");
});
router.get("/home",(req,res) => {
    res.render("home.ejs",{username:this.name});
});
router.get("/products",(req,res) => {
    res.render("products.ejs",{username:this.name});
});
router.post("/signup",async (req,res) => {
    var uname = req.body.username;
    var email = req.body.email;
    var pwd = req.body.password;
    module.exports.user = name;
    //console.log(name,email,pwd);
        try {
            const salt = await bcrypt.genSalt();
            const hashedPwd = await bcrypt.hash(req.body.password,salt);
            //console.log(salt,hashedPwd);
            db.query("Select * from user",(err)=>{
                if(err){
                    db.query("create table user(username varchar(50) not null,email varchar(50) not null,password varchar(150) not null)");
                    //console.log("Table created");
                }
            });
            db.query("INSERT INTO user (username,email,password) values(?,?,?)",[uname,email,hashedPwd],(err)=>{
                if(!err){
                    console.log("data entered successfully");
                    res.redirect("/")
                }
                else if(err){
                    console.log(err);
                }
            })
            
        } catch (error) {
            console.log(error);
        }
})
router.post("/login",async (req,res) => {
    this.name = req.body.username;
    var pwd = req.body.password;
    console.log("body req: ",req.body);
    //console.log(name,pwd);
    if(this.name=="" || pwd==""){
        res.send("Enter Username/Password");
    }
    else{
    db.query("SELECT password FROM user WHERE username=?",[this.name],async (err,result)=>{
        try {
            var ismatch =await bcrypt.compare(pwd,result[0].password);
            console.log("ismatch: ",ismatch);
            if(ismatch){
                console.log("logged in");
                res.render("home.ejs",{username: this.name});
            }
            else{
                res.send("Login Failed, INVALID CREDENTIALS");
            }
        } catch (err) {
            //console.log("login failed");
            res.send("Login Failed");
        }
    })
    }
})

module.exports = router