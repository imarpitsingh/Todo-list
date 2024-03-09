import React, { useEffect, useState } from 'react';
import "./style.css";

// get localstorage data
const getLocalData=()=>{
  const lists=localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists)
  }else{
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData]=useState("");
  const [items,setItems]=useState(getLocalData());
  const [isEditItem,setIsEditItem] = useState("")
  const [togglebutton, setToggleButton] = useState(false);


  // add the items function
  const addItem =()=>{
    if(!inputdata){
      alert("Please fill the data")
    }else if(inputdata && togglebutton){
      setItems(
        items.map((currElem)=>{
          if(currElem.id === isEditItem){
            return {...currElem,name:inputdata}
          }
          return currElem;
        })
      );
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    }
    else{
        const myNetInputData={
          id:new Date().getTime().toString(),
          name:inputdata,
        }
      setItems([...items, myNetInputData]);
      setInputData("");
    }
  };

  // edit data
  const editItems=(index)=>{
    const item_todo_edited =items.find((currElem)=>{
      return currElem.id === index;
    })
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);

  };

  // how to delete item
  const deleteItem=(index)=>{
    const updatedItems = items.filter((currElem)=>{
      return (currElem.id !== index);
    });
    setItems(updatedItems);
  };

  // remove all data
  const removeAll=()=>{
    setItems([]);
  }

  // adding localStorage
  useEffect(()=>{
    localStorage.setItem("mytodolist", JSON.stringify(items))
  },[items]);

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src='./images/todo.svg' alt='todologo'/>
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className='additems'>
            <input type='text' placeholder='✍ Add item'
            className='"form-control'
            value={inputdata }
            onChange={(event)=>setInputData(event.target.value)}
            />
            {togglebutton ?(
            <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ):(
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
              {/* show our items */}
              <div className='showItems'>
                {items.map((currElem)=>{
                  return(
                    <div className='eachItem' key={currElem.id}>
                    <h3>{currElem.name}</h3>
                    <div className='todo-btn'>
                      <i className="far fa-edit add-btn" onClick={()=> editItems(currElem.id)}></i>
                      <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(currElem.id)}></i>
                    </div>
                  </div>
                  )
                })}
              </div>

          {/* remove all button */}
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Todo