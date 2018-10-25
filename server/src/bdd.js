const mysql = require('mysql');
let connection = mysql.createConnection({
	host: 'den1.mysql4.gear.host',
	user: 'papalymaster',
	password: 'Sx6xK_5-l3Cw',
	database: 'papalymaster'
});
module.exports= connection;
