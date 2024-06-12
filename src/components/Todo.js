import React, { useState, useEffect } from 'react'
import './style.css'

//Get the Local Storage Data Back
const getLocalData = () => {
  const list = localStorage.getItem("mytodolist");

  //If data is stored in the list
  if (list) {
    //Converts the JSON string into a JavaScript object.
    return JSON.parse(list);
  }
  else {
    return [];
  }
}

const TodoList = () => {

  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [iseditItem, setIsEditItem] = useState("")
  const [toggleButton, setToggleButton] = useState(false);

  //Add the item
  const addItem = () => {
    //If the input data is empty
    if (!inputdata) {
      alert('Please fill the data')
    }

    else if (inputdata && toggleButton === true) {
        // The setItems function updates the state with the new array where the item with the ID of "mango" now has the name "chiku".
      setItems(
        items.map((curElem) => {
          if (curElem.id === iseditItem) {
            // The spread operator takes all the properties of curElem and includes them in a new object like the id is kept the same and the name is changed to the current edited value
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      )
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }

    else {

      const myNewInputData = {
        // id: It generates a unique identifier for each item in the todo list.

        // Date().getTime().toString() generates a timestamp representing the current time in milliseconds since January 1, 1970 (Unix Epoch). This timestamp is converted to a string using .toString() to ensure uniqueness. 

        id: new Date().getTime().toString(),
        name: inputdata,
      };

      //Previous data ko rakho using spread operator and naya data phir add krdo
      setItems([...items, myNewInputData]);
      setInputData("");

    }
  };

  //How To Edit Items
  const editItem = (index) => {
    const item_edited = items.find((curElem) => {
      return curElem.id === index;
    })
    setInputData(item_edited.name);
    setIsEditItem(index);
    //Toggle Button value will be set True when we click on the edit Button which means on the label, the edit button should appear instead of add button
    setToggleButton(true);
  }

  // How To Delete Items 
  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      //Return all the elements whose id is not same as the deleted element, we will get an array of set of items
      return curElem.id !== index
    })

    setItems(updatedItem);
  }

  const removeAll = () => {
    setItems([]);
  }

  //Adding Local Storage
  useEffect(() => {
    //The local storage works in key value pair and it accepts string only.

    // This line of code stores the current state of the items array in the local storage of the browser. 

    // The first argument is the key under which the data will be stored, and the second argument is the value to be stored. Since localStorage can only store strings, JSON.stringify() is used to convert the items array to a string before storing it.

    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items])

  // Whenever the items array changes, the effect updates the corresponding data in the local storage, allowing the todo list to persist across page refreshes

  return (
    <>
      <div className="main-div">
        <div className="child-div">

          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>✍️ Add Your List Here</figcaption>
          </figure>

          <div className="addItems">
            {/* onChange: This is an event handler in JavaScript that triggers whenever the value of an input element changes. */}

            {/* ={(event)=> setInputData(event.target.value)}: This is an arrow function being passed as the handler for the onChange event. When the onChange event is triggered, this function will execute.

            (event) => ...: This part defines an arrow function that takes an event object as its argument. The event object contains information about the event that occurred, such as the target element that triggered the event. */}

            <input type="text" placeholder="Add Item" className='form-control' value={inputdata} onChange={(event) => setInputData(event.target.value)}
            />

            {/* If the toggle button is true, then edit button will appear instead of the add Button  */}
            {toggleButton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}

          </div>

          <div className='showItems'>

            {items.map((curElem, index) => {
              return (
                <div className="eachItem " key={index}>

                  {/* We are using myNewInputData which has name and id  */}
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>


                    {/*  This part assigns an event handler to the icon. When clicked, it will execute the deleteItem function with the id of the current element (curElem) as an argument. */}
                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              )
            })}

          </div>

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span> </button>
          </div>


        </div>
      </div>
    </>
  )
}

export default TodoList
