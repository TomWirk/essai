var sql = require("mssql");

    // config for your database
    var config = require('./pool')

    // connect to your database
    const read = function(user, citoyen){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
    
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                request.query('select * from Messages m inner join Utilisateur u on u.Id_Utilisateur=m.id_Caller where (id_Caller='+user+' and id_Receiver='+citoyen+') or (id_Caller='+citoyen+' and id_Receiver='+user+') order by  id_Message desc', function (err, rec) {
                    resolve(rec.recordset)
                    if (err){console.log(err); reject('err')} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    const insert = function(user, citoyen, message){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
    
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                request.query('insert into  Messages (id_Caller,id_Receiver, contenu,date, isRead) VALUES ('+user+','+citoyen+",'"+message+"',GETDATE(),"+"'false'"+');select top 1 * from Messages m inner join Utilisateur u on u.Id_Utilisateur=m.id_Caller where (id_Caller='+user+' and id_Receiver='+citoyen+') or (id_Caller='+citoyen+' and id_Receiver='+user+') order by id_Message desc', function (err, rec) {
                    resolve(rec.recordset[0])
                    if (err){console.log(err); reject('err')} 
        
                    // send records as a response
                    
                    
                });
            });
        })
    }

    exports.read=read
    exports.insert=insert
