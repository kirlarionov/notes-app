import React, { useState, useEffect } from "react";
import { Form } from "../components/Form/Form";
import { Notes } from "../components/Notes/Notes";

export const Home = () => {

   const [stateNotes, setStateNotes] = useState(() => {
      const saved = localStorage.getItem("localStateNotes")
      const initialValue = JSON.parse(saved)
      return initialValue || []
   })

   const addNote = (inputValue, setInputValue, statusValue) => {
      if (inputValue.trim() !== "") {
         setStateNotes([...stateNotes, { id: Math.floor(Math.random() * 100000), title: inputValue, status: statusValue }])
         setInputValue('')
      } else {
         alert('--- ADD TASK NAME ---')
      }
   }

   const removeNote = (id) => {
      stateNotes.splice(id, 1)
      setStateNotes([...stateNotes])
   }

   useEffect(() => {
      localStorage.setItem('localStateNotes', JSON.stringify(stateNotes))
   }, [stateNotes])

   return (
      <>
         <Form addNote={addNote} />
         <Notes notes={stateNotes} removeNote={removeNote} setStateNotes={setStateNotes} />
      </>
   )
}
