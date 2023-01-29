//external import 
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa'

// internal import 
import './App.css';
import Addtodo from './components/addtodo/Addtodo';
import db from './firebaseinit';


function App() {
  const [newtitle, setTitle] = useState('');
  const [newdescription, setDescription] = useState('')
  const [todo, setTodo] = useState([])

  useEffect(() => {

    const allquries = query(collection(db, 'todo'));
    onSnapshot(allquries, (data) => {
      let alltodo = []
      data.forEach(doc => {
        alltodo.push({ ...doc.data(), id: doc.id })
      })
      setTodo(alltodo)
    })

  }, [])

  const updatetodo = async (item) => {
    await updateDoc(doc(db, 'todo', item.id), { title: newtitle, description: newdescription })
  }

  const finishTodo = async (item) => {
    await updateDoc(doc(db, 'todo', item.id), { title: newtitle, description: newdescription, finish: "Finished" })
  }

  const handleDelete = async (item) => {
    const result = window.confirm('Do want to delete this ?')
    if (result) {
      await deleteDoc(doc(db, 'todo', item.id));
    }
  }
  return (
    <div className="App">
      <Addtodo></Addtodo>

      <div className='todos'>

        {
          todo.map(item =>

            <div className='todo' key={item.id}>


              {
                item.finish ? <p><FaCheck className='check_icon' /></p> : ""
              }
              <input onBlur={(e) => setTitle(e.target.value)} type="text" name="title" id="title" placeholder='Your Title' defaultValue={item.title} />

              <input onBlur={(e) => setDescription(e.target.value)} type="text" name="description" id="description" placeholder='Your Description' defaultValue={item.description} />

              <button onClick={() => updatetodo(item)} className="edit_btn">Edit</button>

              <button onClick={(e) => finishTodo(item)} className="delete_btn">Finish</button>

              <button onClick={() => handleDelete(item)} className="delete_btn">Delete</button>

            </div>

          )
        }
      </div>

    </div>
  );
}

export default App;
