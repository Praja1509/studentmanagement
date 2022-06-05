const express = require('express');
const path = require('path');
const ejs = require('ejs');


require('./db/conn')   

const static_path =path.join(__dirname,'/public')
const Register = require('./models/resgistrations');
const app =express();  
 
app.use(express.static(static_path)); 
app.use(express.urlencoded())
app.set('view engine','ejs');

app.get('/',(req,res)=>{
         res.status(201).render('pages/index')
}) 
// app.get('/account',(req,res)=>{
//         //  res.status(201).render('pages/account')
// }) 

app.post('/',async(req,res)=>{
    const iemail=req.body.email;
    const ipassword=req.body.password;

    if((iemail==''&&ipassword=='')||(iemail=='')||(ipassword=='')){
        return res.status(500).send('invalid details')
    }    
    if(iemail=='admin@gmail.com'){
        return res.status(500).send(`<script>alert('email already exists')</script>`)
    }
    try { 
        const data = await Register.findOne({email:iemail});
    
        if((data.email==iemail)&&(data.password===ipassword)){
            Register.find({email:iemail},function(err,registers){
                    
                res.status(201).render('pages/dashboard',{
                   studentList:registers 
               })
           }) 
            
            // return res.status(201).render('pages/dashboard')
        }else{
             return res.status(500).send('invalid details') 
        }  
    } catch (error) { 
        // console.log(error)
        res.send(`<script>alert('user not found')</script>`)
    }
  
     
})  
app.get('/forget',(req,res)=>{
    res.status(201).render('pages/forget') 
})
app.get('/admin-login',(req,res)=>{
    res.status(201).render('pages/admin-login')
})     
app.post('/admin-login',async(req,res)=>{
    const email=req.body.email
    const password=req.body.password
     const details = await Register.findOne({email:'admin@gmail.com'})
     if(details.password===password&&details.email===email){
        Register.find({},function(err,registers){

            res.status(201).render('pages/admin-index',{
               studentList:registers 
           })
       }) 
        //  res.status(201).render('admin-index')
     }else{
         res.send(`<script>alert('invalid login details')</script>`)
     } 
}) 
app.post('/adminindex',(req,res)=>{
    const regist =new Register({
        name:req.body.name,
        fname:req.body.fname,
        mname:req.body.mname,
        course:req.body.course,
        branch:req.body.branch,
        semester:req.body.semester,
        gender:req.body.gender,
        state:req.body.state,
        city:req.body.city,
        pin:req.body.pin,
        address:req.body.address,
        addmissionyear:req.body.addmissionyear,
        dob:req.body.dob,
        age:req.body.age,
        phone:req.body.phone,
        email:req.body.email,
        enrollment:req.body.enrollment,
        password:req.body.password,
        cpassword:req.body.cpassword
    })
    const registered = regist.save();
    res.send(`<script>alert('Student data Added')</script>`)
}) 

app.listen(4848,()=>{
    console.log('http://localhost:4848');
}) 