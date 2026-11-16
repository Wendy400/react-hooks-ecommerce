// import React, { useState } from "react";

// function ItemForm() {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("Produce");
 
//   function handleSubmit(event) {
//     event.preventDefault();
//     const itemData = {
//       name : name,
//       category : category,
//       isInCart : false,
//     }
  

//     fetch("http://localhost:4000/items", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(itemData),
//   })
//     .then(response => {
//       if (!response.ok) {
//         console.log("item failed to create")
        
//       } else {
//         return response.json()
//       }
//     })
//     .then(newItem => console.log(newItem))
//     .catch(error => console.log(error))
// }
//   }

//   return (
//     <form className="NewItem" onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>

//       <label>
//         Category:
//         <select
//           name="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="Produce">Produce</option>
//           <option value="Dairy">Dairy</option>
//           <option value="Dessert">Dessert</option>
//         </select>
//       </label>

//       <button type="submit">Add to List</button>
//     </form>
//   );


// export default ItemForm;


import React, { useState } from "react";

function ItemForm({onAddItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
 
 
  function handleSubmit(event) {
    event.preventDefault();
    
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };

    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then(r => {
        if (!r.ok) {
          // Throwing an error forces execution straight into the .catch() block
          throw new Error("Item failed to create");
        }
        return r.json();
      })
      .then(newItem => { onAddItem( newItem);
        
        // Optional: Clear out the form inputs on success
        setName("");
        setCategory("Produce");
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;