// src/MyApp.js

import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";




function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

      function removeOneCharacter(index) {
        
        const updated = characters.filter((character, i) => {
          if (i === index) {
            console.log(character._id)
            fetch(`http://localhost:8000/users?id=${character._id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },

            })
          }
          return i !== index;
        });
        setCharacters(updated);
      }


      // src/MyApp.js (a new function inside the MyApp function)
        // function updateList(person) {
        //   setCharacters([...characters, person]);
        // }
      return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
          
        </div>
      );

      

      function fetchUsers() {
          const promise = fetch("http://localhost:8000/users");
          return promise;
      }

      function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
      }

      function updateList(person) { 
        postUser(person)
          .then((response) => {
            if(response.status === 201) {
              return response.json();
            }else{
              console.log("Error");
            
            }})
            .then((person) => {
              console.log(person)
              setCharacters([...characters, person]);
            })
          .catch((error) => {
            console.log(error);
          })
    }

      
      
}




  


export default MyApp;