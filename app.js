const alert=require('alert-node');
const express=require("express");
const bodyParser=require("body-parser");
const scrapedin=require("scrapedin");
const ejs=require("ejs");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const app=express();
const saltRound=10;
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended:true
}));
mongoose.connect("mongodb://localhost:27017/linkedin",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const AdminSchema=new mongoose.Schema({
   userid:{
       type:String,
       required:true
      
   },
    password:{
        type:String,
        required:true
    }
});
const UserSchmea =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
    type:String,
    unique:true,
    required:true
},
    register:{
    type:Number,
    unique:true,
    required:true
      },
    batch:{
        type:Number,
        required:true,
        maxlength:4
    },
    dept:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    linkedin:{
        type:String,
        required:true
    },
    phno:{
        type:Number,
        required:true,
        unique:true,
        maxlength:10
    }
    
});
const Students=new mongoose.model("Students",UserSchmea);
const Admin=new mongoose.model("Admin",AdminSchema);
/*const options={
    email:"aleem3829@gmail.com",
    password:"nana@nani"
}
scrapedin(options)
.then((profileScraper) => profileScraper("https://www.linkedin.com/in/masood-ahmed-3202b3158/"))
.then((profile) => console.log(profile))*/
//password=$2b$10$jCBw2JUrWnAlykKXVZOSEu97xrEiw4o63MdaeDcoccVVfwp7SRKYi
app.get("/",(req,res)=>{
    res.render("login");
   /* const pass="admin";
    bcrypt.hash(pass,saltRound,(err,hash)=>{
       const newAdmin=new Admin({
           userid:"admin",
           password:hash
       }); 
        newAdmin.save((err)=>{
            if(err)
                {
                console.log(err);
                }
        });
    });*/
});
app.get("/register",(req,res)=>{
  res.render("registeruser");
});
app.post("/login",(req,res)=>{
   var userid=req.body.username;
   var password=req.body.password;
   Admin.findOne({userid:userid},(err,admin)=>{
       if(err)
           {
               console.log(err);
           }
       else{
            bcrypt.compare(password,admin.password,(err,result)=>{
             if(result==true){
                 res.redirect("/home");
               
             }
                else{
                    console.log("login failed");
                }
           });
       }
   })
  
});
app.get("/home",(req,res)=>{
   res.render("home");
});
app.post("/register",(req,res)=>{
    const student=new Students({
         name:req.body.userName,
         rollno:req.body.roll,
         register:req.body.register,
         batch:req.body.batch,
         dept:req.body.value,
         email:req.body.email,
         linkedin:req.body.linkedin,
         phno:req.body.phno
    });
    student.save((err,use)=>{
        if(err){
            console.log(err);
        }
        else{
           
            console.log("register success");
        }
    })
});
app.listen(3000,()=>{
    console.log("server has started");
});