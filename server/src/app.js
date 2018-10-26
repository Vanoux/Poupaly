const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const connection=require('./bdd.js')
const app = express()
app.use(bodyparser.json())
app.use(cors())
app.use(bodyparser.urlencoded({extended: false}));
app.get('/bookmarks', (req, res) => {
  var reqsql = "SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('idLink',idLink,'titleLink',titleLink,'url', url, 'description', description, 'idCat', idCat)),']') as list FROM Link;"
  connection.query(reqsql, function(error, results, fields){
		if(error){
			console.log(error);
		}
		else {
			res.send(results[0].list);
		}
	})
})

app.get('/cat', (req, res) =>{
  var reqcat = "SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('idCat',idCat,'nameCat',nameCat)),']') as listCat FROM Category;";
  connection.query(reqcat, function(error, results, fields){
    if(error){
      console.log(error);
    }else{
      res.send(results[0].listCat);
    }
  })
})

app.post('/remove/:id', (req,res) =>{
  let id=req.params.id;
  let reqrem = `DELETE FROM Link where idLink = ${id}`;
  connection.query(reqrem, (error, results, fields)=>{
    if (error){
      console.log(error);
    }
    else{
      res.send(true);
    }
  })
})

app.post('/add',(req,res) => {
  var titleLink = req.body.titleLink;
  var description = req.body.description;
  var url = req.body.url;
  var idCat = req.body.idCat;
  var reqadd = `INSERT INTO Link (titleLink, description, url, idCat) VALUES ("${titleLink}","${description}","${url}",${idCat})`;
  connection.query(reqadd, function(error, results, fields){
    if (error){
      console.log(error);
    }
    else{
      res.send(true);
    }
  })
})

app.post('/addcat',(req,res) =>{
  var nameCat = req.body.nameCat;
  var reqaddcat= `INSERT INTO category (nameCat) VALUES ("${nameCat}")`;
  connection.query(reqaddcat, function(error, results, fields){
    if (error){
      console.log(error);
    }
    else{
      res.send(true);
    }
  })
})

app.post('/removeCat/:id', (req,res) =>{
  let id=req.params.id;
  let reqremlink = `DELETE FROM Link where idCat = ${id}`;
  connection.query(reqremlink, (error, results, fields)=>{
    if (error){
      console.log(error);
    }
    else{
      let reqremcat = `DELETE FROM category where idCat = ${id}`;
      connection.query(reqremcat, (err, resu, fld)=>{
        if (err){
          console.log(err);
        }
        else {
          res.send(true);
        }
      })
    }
  })
})

app.listen(process.env.PORT || 8081)