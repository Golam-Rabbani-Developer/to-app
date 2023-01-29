// external import 
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";

// internal import 
import './Addtodo.css';
import db from '../../firebaseinit';


const Addtodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Please put a valid title");
        } else {
            try {
                const docRef = await addDoc(collection(db, "todo"), {
                    title, description
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

        e.target.reset()
    }

    return (
        <div>
            <h2 className='app_title'>Daily Note</h2>
            <form onSubmit={handleSubmit}>
                <input onBlur={(e) => setTitle(e.target.value)} type="text" name="title" id="title" placeholder='Your Title' />

                <input onBlur={(e) => setDescription(e.target.value)} type="text" name="description" id="description" placeholder='Your Description' />

                <input className='btn' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Addtodo;