const con=require('./connection');
const express=require('express');
const router=express.Router();

router.post('/write',(req,res)=>{
    if(req.session.email){
        const sql=`INSERT INTO board (m_no,name,title,content) VALUES ('${req.session.m_no}','${req.session.name}','${req.body.title}','${req.body.content}')`;
        con.query(sql,(err,result)=>{
            if(err){
                console.error(err);
                res.json({message:"글 등록 실패❌"});
            }else{
                console.log('Board insert success!');
                res.json({message:"글 등록 성공✅"});
            }
        });//end query
    }else{
        res.json({message:"로그인 먼저 하세요🐋"});
    }
});//end write


module.exports=router;