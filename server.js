const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Import cors package

const app = express();
const port = 3000; // port kan je aanpassen maar zorg ervoor dat die wel open staat.
app.use(cors());  // Enable CORS for all routes


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ww laten we leeg ivm localhost root user
  database: 'scamino' // de naam van je db
});

connection.connect((err) => {
  if (err) throw err; // gaat er iets mis? dan tonen we de hele exception
  console.log('Connected to MySQL'); // succesvol verbonden 
});

// ---------------------API------------------------------------- //

// voorbeeld readall
app.get('/api/readall', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// voorbeeld readone (zonder SQL injection mogelijkheid) 
// er zijn 2 manieren hoe je dit kan doen, dit is zonder parameterized query
app.get('/api/readone/:id', (req, res) => {
    const userId = req.params.id;
  
    connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {// kijken of er uberhaupt iets is gevonden 
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Gebruiker niet gevonden' }); // error message als er niets is gevonden
      }
    });
  });

  // dit is de manier met parameterized query, hoe dit werkt is dus <url>:<port>/api/readuser?id=1 
  app.get('/api/readuser', (req, res) => {
    const { id } = req.query;  // Assuming the parameters are passed as query strings
  
    // Parameterized query with multiple placeholders
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      if (results.length > 0) { // kijken of er uberhaupt iets is gevonden 
        res.json(results[0]); 
      } else {
        res.status(404).json({ message: 'Gebruiker niet gevonden' }); // error message als er niets is gevonden
      }
    });
  });
  
  

// ---------------------API------------------------------------- //


// dit is onze webserver die dus op de port luistert
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
