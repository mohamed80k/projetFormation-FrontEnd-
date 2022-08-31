var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
const mysql=require('mysql2')
const app=express();
const nodemailer = require("nodemailer");
app.use(cors());
app.use(bodyparser.json());

//database connection
// database connection
const db =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'myfirsdb',
    port:3306
});

// check database connection
db.connect(err=>{
if (err){
    console.log(err,"dberr");}
console.log('database connected ...');
})

// Affichage de tous employes 

app.get('/employee',(req,res)=>{
   let qr= 'select * from users';
   db.query(qr,(err,result)=>{
    if(err){
        console.log(err,'errs');
    }

    if(result.length>0)
    {
    res.send({
    message:'tous les employes',
    data:result
    });
}
});
});

// Affichage des employes selon id

app.get('/employee/:id' ,(req,res)=>{
    let gID = req.params.id;
    let qr = `select * from users where id = ${gID}`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'Employe existe',
        data:result
        });
    }
    else{
        res.send({
        message:'Employe n\'existe pass'
      });
    }
    });
})


//***********Selon mail */
app.get('/:mail' ,(req,res)=>{
    let gMail = req.params.mail;
    let qr = `select * from users where mail = '${gMail}'`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'Employe existe',
        data:result
        });
    }
    else{
        res.send({
        message:'Employe n\'existe passs'
      });
    }
    });
})

// create d'employe

app.post('/employee',(req,res)=>{
    
console.log(req.body, 'createdata');
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let cin = req.body.cin;
    let formations = req.body.formations;
    let metier = req.body.metier;
    let mail = req.body.mail;
    let date = req.body.date;
    let PassWord = req.body.PassWord;

let qr = `insert into users(firstname,lastname,cin,formations,metier,mail,date,PassWord)
values('${firstname}','${lastname}','${cin}','${formations}','${metier}','${mail}','${date}','${PassWord}')`;

    db.query(qr,(err,result)=>{
        console.log(result, 'result');
        res.send({
        message:'data inserted'
        });
});
});

//update employe
app.put('/employee/:id',(req,res)=>{

    console.log(req.body, 'Update data');

    let gID = req.params.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let cin = req.body.cin;
    let formations = req.body.formations;
    let metier = req.body.metier;
    let mail = req.body.mail;
    let date = req.body.date;
    let PassWord = req.body.PassWord;

    let qr = `update users set firstname= '${firstname}',lastname= '${lastname}',cin='${cin}',formations='${formations}',metier='${metier}',mail='${mail}',date='${date}',PassWord='${PassWord}'
              where id= ${gID}`;
    
   db.query(qr,(err,result)=>{

    if(err){console.log(err);}

    res.send({
    message:'mise à jour d\'employe effectue'
    });
   });
})

// update password
app.put('/employee/updatepassword/:id',(req,res)=>{

    console.log(req.body, 'Update data');

    let gID = req.params.id;
 
    let PassWord = req.body.PassWord;

    let qr = `update users set PassWord='${PassWord}'
              where id= ${gID}`;
    
   db.query(qr,(err,result)=>{

    if(err){console.log(err);}

    res.send({
    message:'mise à jour d\'employe effectue'
    });
   });
})


// delete single data

app.delete('/employee/:id',(req,res)=>{

    let qID =req.params.id;

    let qr = `delete from users where id = ${qID} `;
    db.query(qr,(err,result)=>{

        if(err){console.log(err);}
    
        res.send({
        message:'La suppression d\'employe effectue'
        });
       });
})

// Affichage de tous admin 

app.get('/admin/all',(req,res)=>{
   let qr= 'select * from admin';
   db.query(qr,(err,result)=>{
    if(err){
        console.log(err,'errs');
    }

    if(result.length>0)
    {
    res.send({
    message:'tous les admin',
    data:result
    });
}
});
});

app.get('/formation/:id' ,(req,res)=>{
    let gID = req.params.id;
    let qr = `select * from formation1 where id = ${gID}`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'Formation existe',
        data:result
        });
    }
    else{
        res.send({
        message:'Formation n\'existe pass'
      });
    }
    });
})
app.get('/formationpartie/:forma' ,(req,res)=>{
    let gForma = req.params.forma;
    let qr = `select DISTINCT  partie from formation1 where formation = '${gForma}'`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'formation existe',
        data:result
        });
    }
    else{
        res.send({
        message:'formation n\'existe passs'
      });
    }
    });
})


// *************************
app.get('/getallformation/all/formation' ,(req,res)=>{
    let gForma = req.params.forma;
    let qr = `select DISTINCT  formation from formation1 `;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'formation existe',
        data:result
        });
    }
    else{
        res.send({
        message:'formation n\'existe passs'
      });
    }
    });
})

// ******************************



app.get('/formationlesson/:party' ,(req,res)=>{
    let gParty = req.params.party;
    let qr = `select DISTINCT  lesson from formation1 where partie = '${gParty}'`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'formation existe',
        data:result
        });
    }
    else{
        res.send({
        message:'formation n\'existe passs'
      });
    }
    });
})

app.get('/formationchapitre/:lesson' ,(req,res)=>{
    let gLesson = req.params.lesson;
    let qr = `select DISTINCT  chapitre from formation1 where lesson = '${gLesson}'`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'formation existe',
        data:result
        });
    }
    else{
        res.send({
        message:'formation n\'existe passs'
      });
    }
    });
})
app.get('/formationhtml/:chapitr' ,(req,res)=>{
    let gChapitr = req.params.chapitr;
    let qr = `select DISTINCT  HTML from formation1 where chapitre = '${gChapitr}'`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'formation existe',
        data:result
        });
    }
    else{
        res.send({
        message:'formation n\'existe passs'
      });
    }
    });
})
// Send Mail
app.post("/sendmail/mail/all/send", (req, res) => {
    
    let user = req.body;
  
    sendMail(user, info => {
   
    res.send(info);
  });
  });
  
  async function sendMail(user) {
//    test :String;
//    test = user.mail
//    console.log(test)
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ennabouchmohamed@gmail.com',
          pass: 'pkqdnqazdainszny'
        }
      });
      
      var mailOptions = {
        
        from: 'ennabouchmohamed@gmail.com',
        to: user.mail,
        subject: 'Formation ('+ user.formations+")",
            html: `<div id=":12v" class="a3s aiL ">Bonjour  Mme/Mr ${user.firstname} ${user.lastname} ,<br><br>

            Merci de trouver ci-joint les données permettant l'accés à  la plateforme formation.<br><br><br>
            
            your email is: ${user.mail}<br>
            your password is : ${user.PassWord}<br>
            Lien: <a href="http://moodle-ensat.uae.ac.ma" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://moodle-ensat.uae.ac.ma&amp;source=gmail&amp;ust=1661262501471000&amp;usg=AOvVaw0ptYE0a5cDrZOnBLCit4or">http://formation-<span class="il">ensat</span>.uae.ac.ma</a> <br><br><br>
            
            NB:
            Merci de réinitialiser votre mot de passe
            <br><br> 
            bien cordialement,
            </div>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
   
  


  }

//****** */
app.listen(3000,()=>{
    console.log('server runnig...');
});