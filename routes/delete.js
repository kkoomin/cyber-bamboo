const con =require("./connection");
const express=require("express");
const router= express.Router();

router.post("",(req,res)=>{

   if(req.session.email){
       const sql=`DELETE FROM board WHERE author='${}'`;
   }



});


module.exports=router;