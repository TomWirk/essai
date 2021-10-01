var sql = require("mssql");

    // config for your database
    var config = require('./pool')

    exports.list = function(){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
    
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                request.query('select u.Id_Utilisateur, nom , prenom, email, date_naissance, date_inscription, password, isBanned, DateFinBannissement, m.Id_Moderateur, Id_Categorie, Id_Administrateur, IsSuperAdmin from Utilisateur u left join Moderateur m on m.Id_Utilisateur = u.Id_Utilisateur left join Administrateur a on m.Id_Moderateur=a.Id_Moderateur;', function (err, rec) {
                    resolve(rec.recordset)
                    if (err){console.log(err); reject('err')} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    // connect to your database
    exports.check = function(email, password){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
    
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                request.query('select u.Id_Utilisateur, nom , prenom, email, date_naissance, date_inscription, password, isBanned, DateFinBannissement, m.Id_Moderateur, Id_Categorie, Id_Administrateur, IsSuperAdmin from Utilisateur u left join Moderateur m on m.Id_Utilisateur = u.Id_Utilisateur left join Administrateur a on m.Id_Moderateur=a.Id_Moderateur where email = '+"'"+email+"'"+' and password ='+"'"+password+"'", function (err, rec) {
                    (rec.recordset[0]!==undefined ? 

                        (rec.recordset[0].isBanned===false ? resolve(rec.recordset[0]):reject('Utilisateur Banni'))
                        
                        
                        :reject('id/pw incorrect'))
                    if (err){console.log(err); reject('erreur dans la db')} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    exports.sub = function(email, password, nom, prenom,dob){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
    
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records

                request.query('INSERT INTO Utilisateur(nom, prenom, email, date_naissance, date_inscription, email,password, isBanned)\
                VALUES ('+"'"+nom+"', '"+prenom+"', '"+dob+"', GETDATE(), '"+ email+"', '"+ password+"', '"+ "false')", function (err, rec) {
                    resolve()
                    if (err){console.log(err); reject('err')} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    exports.ban = function(user, date){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
            
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                request.query("Update Utilisateur SET isBanned =1, DateFinBannissement ='"+date+"' where Id_Utilisateur = '"+user+"'"
                , function (err) {
                    resolve()
                    if (err){console.log(err); reject()} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    exports.disban = function(user){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
            
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                request.query("Update Utilisateur SET isBanned =0, DateFinBannissement =null where Id_Utilisateur = '"+user+"'"
                , function (err) {
                    resolve()
                    if (err){reject(err)} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    