const { response } = require("express");
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
app.use(express.json());
// app.use(bodyParser.json());
// app.use(cors());

let db;

const initializeDb = () => {
  try {
    db = mysql.createConnection({
      host: "localhost",
      user: "ravi",
      password: "Ravi@9666",
      database: "SURVEYSDB",
    });

    db.connect();
    app.listen(5000, () => {
      console.log("Server Running at htttp://localhost:5000");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

initializeDb();

const authenticateToken = (request, response, next) => {
  console.log(request.headers);
  const authorizationData = request.headers.authorization;
  console.log(authorizationData);
  const jwtToken = authorizationData.split(" ")[1];
  if (jwtToken === undefined) {
    response.send("Invalid Access Tocken");
  } else {
    jwt.verify(jwtToken, "ravisabbi", async (error, payload) => {
      if (error) {
        response.send(401);
        response.send("Invalid Access Tocken");
      } else {
        request.username = payload.username;
        next();
      }
    });
  }
};

//REGISTRATION OF USER API

app.post("/user", (request, response) => {
  //console.log(request.body);
  const { id, firstName, lastName,userName,email,password,action} = request.body;

  let user;
  db.query(
    "SELECT * FROM user WHERE username = ?",
    [userName],
    async (err, result) => {
      if (err) throw err;
      user = result;
      // response.send(user);
      console.log(result);
      if (user.length > 0) {
        response.status(401);
        response.send({msg:"Username already exists"});
      } else {
        const bcrypted_password = await bcrypt.hash(password, 10);
        db.query(
          `INSERT INTO user (id, first_name, last_name,username,email, password,action) VALUES (?, ?, ?, ?)`,
          [id, firstName,lastName,userName,email, bcrypted_password,action]
        );
        response.status(200);
        response.send({msg:"User created successfully"});
      }
      console.log(user); 
    }
  );
});

//Login API

app.post("/login", (request, response) => {
  const { username, password } = request.body;
  //console.log(request.body);
  let user;
  db.query(
    `SELECT * FROM user WHERE username = ?`,
    [username],
    async (err, result) => {
      if (err) throw err;
      user = result;
      console.log(user);
      if (user.length > 0) {
        const is_password_matched = await bcrypt.compare(
          password,
          user[0].password
        );
        //  console.log(is_password_matched)
        if (!is_password_matched) {
          response.status(401);
          response.send({msg:"Invalid Password"});
        } else {
          const payload = { username };
          const jwt_token = jwt.sign(payload, "ravisabbi");
          response.status(200);
          response.send({ jwt_token });
        }
      } else {
        response.status(404).send({msg:"User not found"});
      }
    }
  );

  //console.log(user.length);
});