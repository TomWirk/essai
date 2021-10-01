var express = require('express');
var app = express();
var http = require('http').createServer(app);
const port = 8000;
var crypto = require('crypto');
var io = require('socket.io')(http, {cors: {origin:'http://localhost:3000'}});

var cors = require("cors");
app.use(cors());
app.use(express.json());

 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();

})
/*app.get('/',(req, res)=>{
res.send('bonjour')
})*/

app.post('/', (req, res) => {

  require ('./odbc/UtilisateurOdbc').check(req.body.username,req.body.password).then((value) => {

      res.send({user:value, success:true});
    
  })
  .catch(function(e) {res.send({success:false,user:'',message:e})})

    //console.log(req.body)
    /*require ('./odbc/publicationOdbc').read().then((value) => {
    
      res.send({user:user, apiResponse:'succes'});
      
      //console.log(value)
    })*/

    /*const found = users.find(element => element.username===req.body.username && element.password===req.body.password);
    (found!==undefined?res.send({apiResponse:'succes',user:found}):res.send({apiResponse:'fail',user:''}))
    */
  })

  app.post('/newuser', (req, res)=>{
  
    require ('./odbc/UtilisateurOdbc').sub(req.body.username,req.body.password,req.body.nom,req.body.prenom,req.body.dob).then(() => {
      return require ('./odbc/UtilisateurOdbc').check(req.body.username,req.body.password);
    })
      .then((value) => {
          res.send({user:value, success:true});
          
  
     
    })
    .catch(function(e) {res.send({success: false, apiResponse:'Erreur dans la db'})})
  
  })

app.get('/publication', (req, res)=>{
  var pub =[]
  require ('./odbc/publicationOdbc').read().then((value) => {
    //res.send(value);
    pub=value
    //console.log(value)
  return require('./odbc/commentsOdbc').read()
  }).then((value) => {
    res.send({pub:pub, com:value});
    
    //console.log(value)
  })
})

app.get('/utilisateurs', (req, res)=>{
  require ('./odbc/UtilisateurOdbc').list().then((value) => {
   
    res.send(value);
    
  })
})

app.post('/chat', (req, res)=>{
  require ('./odbc/chatOdbc').read(req.body.user.Id_Utilisateur, req.body.citoyen.Id_Utilisateur).then((value) => {
    res.send(value);
  })
})

app.post('/utilisateurs/Ban', (req, res)=>{
  require ('./odbc/UtilisateurOdbc').ban(req.body.citoyen.Id_Utilisateur,req.body.date).then(() => {
   //console.log('test')
    res.send({success:true,message:'Utilisateur banni'});
    
  })


.catch(function(e) {res.send({success:false,message:'Erreur dans la db'})})

})

app.post('/utilisateurs/disBan', (req, res)=>{
  require ('./odbc/UtilisateurOdbc').disban(req.body.citoyen.Id_Utilisateur).then(() => {
   
    res.send({success:true,message:'Utilisateur réhabilité'});
    
  })
  .catch(function(e) {res.send({success:false,message:'Erreur dans la db'})})

})

app.get('/command', (req, res)=>{
  require ('./odbc/modOdbc')().then((value) => {
    //res.send(value);
    res.send(value);
    
    //console.log(value)
  })
})

app.post('/publication', (req, res)=>{
  //console.log(req.body)

  require ('./odbc/publicationOdbc').insert(req.body.user, req.body.Titre, req.body.Contenu).then((value) => {
    value.Id_Utilisateur=value.Id_Utilisateur[0]
    res.send({pub:value, success:true});
  })

})

app.post('/publicationCom', (req, res)=>{
  //console.log(req.body)

  require ('./odbc/commentsOdbc').insert(req.body.user, req.body.Id_Publication, req.body.Contenu).then((value) => {
    value.Id_Utilisateur=value.Id_Utilisateur[0]
    res.send({pub:value, success:true});
  })

})

io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client

  console.log('new client connected');

  socket.on('message', (user,citoyen, message) => {

    require ('./odbc/chatOdbc').insert(user.Id_Utilisateur,citoyen.Id_Utilisateur, message).then((value) => {
      io.emit('channel', value);
    })

    

  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

http.listen(port);

