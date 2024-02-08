// backend.js
import express from "express";
import cors from "cors";

import user_methods from "./user-services.js";


var IDs = new Map();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});



const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);



const generateID = () => {
  while (true){
    let id = String(Math.floor(Math.random() * 1000000));
    if(IDs.get(id) === undefined){
      IDs.set(id, true);
      return id;
    }
  }
}


app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  user_methods.findUserById(id).then((result) => {
    res.send(result)
  }).catch(
    res.status(404).send("Resource not found.")
  )
});
  


app.post("/users", (req, res) => {
  
  user_methods.addUser(req.body).then((result) => {
      res.status(201).json(result);
  });
});

app.delete("/users", (req, res) => {
  user_methods.findUserByIdAndDelete(req.query.id).then((result) => {
    res.status(204).send("User deleted successfully");
  }).catch();
  
});

app.get("/users", (req, res)=> {
  const name = req.query.name;
  const job = req.query.job;
  

  if(name != undefined && job == undefined){
    
    user_methods.getUsers(name, undefined).then((result) => {
      res.send({users_list: result})
    });
      
      
  }else if(name != undefined && job != undefined){
    
    user_methods.getUsers(name, job).then((result) => {
        res.send({ users_list: result });
    });

  }else if(name == undefined && job != undefined){
    user_methods.getUsers(undefined, job).then((result) => {
      res.send({ users_list: result })
    });
  
  }else{
    
    user_methods.getUsers(undefined, undefined).then((result) => { 
      res.send({ users_list: result });
    });
   
  
  }
});
