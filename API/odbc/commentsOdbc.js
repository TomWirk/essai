var sql = require("mssql");

    // config for your database
    var config = require('./pool')

    // connect to your database
    const read = function(){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
    
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                request.query('select * from Commentaire c inner join Utilisateur u on u.Id_Utilisateur = c.Id_Utilisateur', function (err, rec) {
                    resolve(rec.recordset)
                    if (err){console.log(err); reject(err)} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    const insert = function(id, pub, contenu){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
    
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                var query = "INSERT INTO Commentaire(Id_Utilisateur, Id_Publication, EnReponse) VALUES ('"+id+"','"+pub+"','"+contenu+"'); SELECT TOP 1 * from Commentaire c inner join Utilisateur u on u.Id_Utilisateur = c.Id_Utilisateur ORDER BY Id_Commentaire DESC"
                console.log(query)
                request.query(query, function (err, rec) {
                    resolve(rec.recordsets[0][0])
                    if (err){console.log(err); reject(err)} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    exports.read=read
    exports.insert=insert