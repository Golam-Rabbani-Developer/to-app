//external import 
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaCheck } from 'react-icons/fa'
import { useSignOut } from 'react-firebase-hooks/auth';

// internal import 
import './App.css';
import Addtodo from './components/addtodo/Addtodo';
import Registration from './components/Registration/Registration';
import db, { auth } from './firebaseinit';
import Login from './components/Login/Login';


function App() {
  const [newtitle, setTitle] = useState('');
  const [newdescription, setDescription] = useState('')
  const [todo, setTodo] = useState([])
  const [user, userloading] = useAuthState(auth);
  const [signOut, loading] = useSignOut(auth);
  const [login, setLogin] = useState(false);

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

  if (userloading | loading) {
    return <>..Loading</>
  }

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
    <div >
      <div className='logout'>
        {
          user && <button onClick={async () => {
            const success = await signOut(auth)
            if (success) {
              alert('You are sign Out from this application')
            }
          }} className='delete_btn logout'>Log Out</button>
        }
      </div>
      {
        user ?
          <div>
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
          :
          <>
            {
              login ?
                <Login setLogin={setLogin} />
                :
                <Registration setLogin={setLogin} />
            }


          </>
      }



    </div>
  );
}

export default App;
