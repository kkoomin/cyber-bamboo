const con=require('./connection');
const express=require('express');
const router=express.Router();

router.post('/',(req,res)=>{
   con.connect((err)=>{
       let sql=`SELECT * FROM users WHERE name='${req.body.name} AND password='${req.body.password}' AND email='${req.body.email}`;
       con.query(sql, (err,result)=>{
           if (err) throw err;
           
           let message;
           if(result.length>0){
               const name=result[0].name;
               req.session.email=result[0].email;
               req.sesssion.name=name;
               message=`${name}님 어서오세요👫`
           }else{
               message=`로그인 실패❗ 다시 시도하세요`;
           }
           res.json({message});
       });
   }); 
});


module.exports=router;