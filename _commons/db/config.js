const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'http://localhost:3036',
//   user: 'root',
// 	password: 'MySql2021!',
//   database: 'lighthouse'

// })

// connection.connect((err) => {
// 	if (err) {
// 			console.log('Erro connecting to database...', err)
// 			return
// 	}
// 	console.log('Connection established!')
// })

var configuration = {
  host: 'localhost',
	port: 3036,
  user: 'root',
  password: 'MySql2021!',
  database: 'lighthouse'
}

module.exports = () => {
	const connection = mysql.createConnection(configuration);

	connection.connect(function(err) {
    if (err) {
      console.log("error when connecting to db:", err);
      // setTimeout(handleDisconnect, 2000);
    } else {
        console.log("connection is successfull");
    }
	})
}
	// try {
	// 	console.log('---------------')
	// 	const conexao = await con.connect()
	// 	console.log('established!')
	// 	return conexao
	// } catch (error) {
	// 	console.log('Connection established!', error)
	// }

