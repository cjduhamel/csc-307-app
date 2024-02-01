// backend.js
import express from "express";
import cors from "cors";


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


const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUser = (id) => {
  const userToDelete = findUserById(id);
  if (userToDelete === undefined) {
    console.log("User not found");
    return;
  }
  users["users_list"] = users["users_list"].filter(
    (user) => user["id"] !== id
  );
  return userToDelete;
}

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
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});
  
// app.get("/users", (req, res) => {
//     const name = req.query.name;
//     if (name != undefined) {
//         let result = findUserByName(name);
//         result = { users_list: result };
//         res.send(result);
//     } else {
//         res.send(users);
//     }
// });

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateID();
  addUser(userToAdd);
  res.status(201).json(userToAdd);
});

app.delete("/users", (req, res) => {
  const userToDelete = req.query.id;
  if(userToDelete != undefined) {
    console.log(userToDelete);
    deleteUser(userToDelete);
    res.status(204).send("User deleted successfully");
  }else{
    res.status(404).send("Resourse not found.");
  }

});

app.get("/users", (req, res)=> {
  const name = req.query.name;
  const job = req.query.job;
  

  if(name != undefined && job == undefined){
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
  }
  if(name != undefined && job != undefined){
    let result = users["users_list"].filter((user) => user["name"] === name && user["job"] === job);
    result = {users_list: result};
    res.send(result);
  }else{
    res.send(users);
  
  }
});

const users = {
    users_list: [
      {
        id: generateID(),
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: generateID(),
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: generateID(),
        name: "Mac",
        job: "Professor"
      },
      {
        id: generateID(),
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: generateID(),
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };