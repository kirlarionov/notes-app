import React, { useState, useEffect, useCallback } from "react";
import { Form } from "../components/Form/Form";
import { Notes } from "../components/Notes/Notes";
import { getTodos } from "../services/todos"

export const Home = () => {
   const [stateNotes, setStateNotes] = useState({})

   const addNoteHandle = useCallback(note => {
      setStateNotes(prevState => ({ ...prevState, [note.id]: note }))
   }, [])

   useEffect(() => {
      getTodos().then(data => setStateNotes(data.reduce((prev, current) => ({
         ...prev,
         [current.id]: current
      }), {})))
   }, [])

   return (
      <>
         <Form addNoteHandle={addNoteHandle} />
         <Notes notes={stateNotes} setStateNotes={setStateNotes} />
      </>
   )
}
