import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          console.log("fetch request failed")
        }
      })
      .then(items => setItems(items))
      .catch(error => console.log(error))


  }, []);

  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  // function handleUpdate(item, id) {
  //   //console.log ("item", item)
  //   fetch(`http://localhost:4000/items${id}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type ": "application/json" },
  //     body: JSON.stringify(item)
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error("Oops failed to update cart")
  //       }

  //       return response.json()

  //     })

  //     .then((item) => {

  //     })
  //     .catch((error) => console.log(`A problem occured:`, error))

  // }


  function handleUpdate(updateItem) {
  const updatedItems = items.map(item => {
    if (item.id === updateItem.id) {
      return updateItem;
    } else {
      return item;
    }
  });
  setItems(updatedItems);
}

function handleDeleteItem(deletedItem){
   const newItems = items.filter(item => item.id !== deletedItem.id);
  setItems(newItems);

}



  

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id}
            item={item}
            onUpdateItem = {handleUpdate}
            onDelete={handleDeleteItem}            
             />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
