const con=require('./connection');

const express=require('express');
const router=express.Router();


router.post('/',(req,res)=>{

    console.log("Bamboo_DB_connected!!!");

    const name=req.body.name;
    const password=req.body.password;
    const email=req.body.email;
    

    
    con.connect((err)=>{
        
        var sql=`INSERT INTO users (name,email,password) VALUES ('${name}','${password}','${email}')`;
        
        con.query(sql,function(err,result){
            if(err){
                console.log("Insert Fail⛔ please retry🌈");
                res.json({message:`뭔가 잘못됬어요 다시 시도해주세요❗`});
            }else{
                console.log("Insert Success!✅");
                res.json({message:`회원가입이 완료되었습니다. 환영합니다~💓`})
            }
        });
    });
    

});

module.exports=router;