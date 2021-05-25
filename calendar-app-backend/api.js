const express = require('express');
const app = express();
const port = 3001;
const bodyParser  = require('body-parser');
const cors = require('cors');
const { Pool, Client } = require('pg');
const dbCredentials = require('./dbCredentials');

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'valky666',
//   port: 5432,
// })

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'valky666',
//   port: 5432,
// })

const client = new Client(dbCredentials);
const pool = new Pool(dbCredentials);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


// app.post('/add/', (req, res) => {
// 	console.log(req.body);
// 	const result = parseInt(req.body.firstNum) + parseInt(req.body.secondNum);
// 	console.log(result);
// 	//res.send({message: "hello"});
//   	res.send(result.toString());
// });

app.post('/insert/', (req, res) =>{
	//db query
	// client.connect();
	// const text = 'INSERT INTO pair(key, value) VALUES($1, $2) RETURNING *'
	// const values = [req.body.key.toString(), req.body.val.toString()];
	console.log(req.body);
	pool.connect()
	.then(client => {
		const text = 'INSERT INTO tasks(year, month, day, tasks) VALUES($1, $2, $3, $4) RETURNING *'
		const values = [parseInt(req.body.year), parseInt(req.body.month), parseInt(req.body.day), req.body.task.toString() ];
		return client
	  	.query(text, values)
	  	.then(result => {
	   		console.log(result.rows[0])
	   		res.send(result.rows);
	   		client.release();
	    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
	  	}) 
	 	.catch(e => {
	  		client.release();
	   		console.error(e.stack)
	   	})
	})
	 

});
app.post('/search/', (req, res) =>{
	//db query
	console.log(req.body);
	pool.connect()
	.then(client => {
		const text = 'SELECT tasks FROM tasks WHERE year=$1 AND month=$2 AND day=$3';
		const values = [parseInt(req.body.year), parseInt(req.body.month), parseInt(req.body.day)];
		return client
	  	.query(text, values)
	  	.then(result => {
	   		console.log(result.rows[0])
	   		res.send(result.rows);
	   		client.release();
	    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
	  	})
	 	.catch(e => {
	  		client.release();
	   		console.error(e.stack)
	   	})
	})

});

// app.get('/', (req, res) => {
	
//   res.send({message: "hello"});
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});