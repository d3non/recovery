//Node Connection to MySQL

var mysql = require ('mysql');

var pool;

if (process.env.JAWSDB_URL)
{
    pool = mysql.createConnection(process.env.JAWSDB_URL);
}
else
{
    pool = mysql.createPool(
	{
		host: 'us-cdbr-iron-east-02.cleardb.net',
		user: 'b3bd0155022c58',
		password: 'b9629858',
		database: 'heroku_e59a7d83b86a917'
	});
};

console.log("Pool created");
module.exports = pool;