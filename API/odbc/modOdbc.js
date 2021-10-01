var sql = require("mssql");

    // config for your database
    var config = require('./pool')

    // connect to your database
    module.exports = function(email, password){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
    
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                request.query('select * from Utilisateur u inner join Moderateur m on m.Id_Utilisateur = u.Id_Utilisateur left join Administrateur a on m.Id_Moderateur=a.Id_Moderateur ;', function (err, rec) {
                    resolve(rec.recordset)
                    if (err){console.log(err); reject('err')} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    