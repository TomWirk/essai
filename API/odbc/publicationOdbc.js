var sql = require("mssql");

    // config for your database
    var config = require('./pool')

    // connect to your database
    exports.read = function(){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
    
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                request.query('select * from Publication p inner join Utilisateur u on u.Id_Utilisateur=p.Id_Utilisateur ORDER BY Id_Publication DESC', function (err, rec) {
                    resolve(rec.recordset)
                    if (err){console.log(err); reject(err)} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    exports.insert = function(id, titre, contenu){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
    
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                var query = "INSERT INTO Publication(Id_Utilisateur, Titre, Contenu) VALUES ('"+id+"','"+titre+"','"+contenu+"'); SELECT TOP 1 * from Publication p inner join Utilisateur u on u.Id_Utilisateur=p.Id_Utilisateur ORDER BY Id_Publication DESC"
                console.log(query)
                request.query(query, function (err, rec) {
                    resolve(rec.recordsets[0][0])
                    if (err){console.log(err); reject(err)} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    //exports.read=read
    //exports.insert=insert