module.exports = {
    user: 'sa',
    server: 'localhost',
    password:'samoht.maxtom,n0d3' ,
    database: 'project_CESI' ,
    options: {
        encrypt: true,
        enableArithAbort: true
        },
        dialect: "mssql",
        dialectOptions: {
            instanceName: "SQLEXPRESS"
        }
};

/*CREATE TABLE dbo.Messages
(
    id_Message INT NOT NULL IDENTITY(0, 1) PRIMARY KEY,
    id_Caller INT NOT NULL,
	id_Receiver INT NOT NULL,
	contenu varchar(255),
	date smalldatetime,
	isRead bit

);
insert into  Messages (id_Caller,id_Receiver, contenu,date, isRead) 
VALUES (4,3,'Hi Mark',GETDATE(),'false')

select * from Messages

select * from Utilisateur

select * from Messages where (id_Caller=3 and id_Receiver=4) or (id_Caller=4 and id_Receiver=3) */