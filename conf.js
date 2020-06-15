const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'Stell@020688', // le mot de passe
database :  'travel', // le nom de la base de données
});
module.exports = connection;