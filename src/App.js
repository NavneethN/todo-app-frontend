import ToDo from "./components/ToDo.js"
import './App.css';
import { useState, useEffect } from "react";
import { addTodo, getAllTodo,updateTodo,deleteTodo } from "./utils/handleApi.js";

function App() {

  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const[isUpdating,setIsUpdating] = useState(false);
  const[toDoId, setToDoId] = useState("")
  
  
  useEffect(() => {

    getAllTodo(setToDo);
  }, []);

  const updateMode=( _id,text) => {
    setIsUpdating(true)
    setText(text);
    setToDoId(_id)
  }

  return (
    <div className="App">
      <div className="conatiner">
        <h1>ToDO App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add"
            value={text}
            onChange={(e) => { setText(e.target.value) }} />
          <div className='add' 
          onClick={isUpdating?
            ()=>updateTodo(toDoId,text,setToDo,setText,setIsUpdating)
          :() => addTodo(text, setText, setToDo)}>
            {isUpdating ?"Update":"Add"}
          </div>
         

        </div>
        <div className='list'>

          {toDo.map((item) => 
          <ToDo key={item._id} text={item.text} 
          updateMode={()=> updateMode(item._id,item.text)}
          deleteTodo={()=> deleteTodo(item._id,setToDo)}
          />
          )}

        </div>

      </div>

    </div>
  );
}

export default App;
