import  express  from "express";
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
const salt = 10;

// Creating an app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST","GET"],
  credentials: true
}));

// Create connection with Mysql Db
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Masteryii2#',
    database: 'react_node'
});

// Sign Up Api
app.post('/signup', (req, res) => {
  const sql = 'INSERT INTO users (`firstname`,`lastname`,`email`,`password`) VALUES(?)';
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({error: "Error hashing the password"});
    const values = [ req.body.firstName, req.body.lastName, req.body.email, hash ];

    conn.query(sql, [values], (err, results) => {
      if (err) return res.json({error: "Error inserting user details to the database"});
      return res.json({Status: "Success"});
    });

  });
 
});

// function to verify cookies
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({error: "You are not authenticated"});
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({error: "Invalid token"});
      } else {
        req.name = decoded.name;
        next();
      }
    })
  }
}

app.get('/', verifyUser, (req, res) => {
  return res.json({Status: "Success",  name: req.name});
});

// Sign In Api
app.post('/signin', (req, res) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  conn.query(query, [req.body.email], (err, results) =>{
    if (err) return res.json({error: "Error handling login"});
    if (results.length > 0) {
      bcrypt.compare(req.body.password.toString(), results[0].password, (err, response) => {
        if (response) {
          const name = results[0].firstname + " "+ results[0].lastname;
          const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: "1d"});
          res.cookie('token', token);
          return res.json({Status: "Success"});
        }else{
          return res.json({error: "Invalid Username or Password"});
        }
      })
    } else{
      res.json({error: "Invalid Username"});
    }
  });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});