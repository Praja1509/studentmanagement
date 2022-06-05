app.get('/',(req,res)=>{
    Register.find({},function(err,registers){

         res.status(201).render('datapre',{
            studentList:registers 
        })
    })
})