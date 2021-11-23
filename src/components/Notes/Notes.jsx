import React, { useCallback } from "react";
import classes from "./Notes.module.css"
import clsx from 'clsx'
import { removeTodo } from "../../services/todos"

export const Notes = ({ notes, setStateNotes }) => {

   const toggleHandle = useCallback((e) => {
      const el = e.currentTarget
      console.log('toggleTodoHandle')
      setStateNotes((prevState) => {
         const { [el.dataset.id]: updatedNote, ...newNotes } = prevState
         console.log(prevState, el.dataset.id)
         const newState = {
            ...newNotes,
            [updatedNote.id]: {
               ...updatedNote,
               done: !updatedNote.done
            }
         }
         return newState
      })
      el.classList.toggle(`${classes.active}`)
   }, [setStateNotes])

   const removeTodoHandle = useCallback((e) => {
      e.stopPropagation()
      console.log('removeTodoHandle')
      const { id } = e.currentTarget.dataset

      removeTodo(id)
         .then(data => {
            data && setStateNotes(notes => {
               const { [id]: removedNote, ...newState } = notes
               return newState
            })
         })
   }, [setStateNotes])


   return (
      <ul className={classes.notesUl}>
         {Object.values(notes).map((note, index) => (
            <li
               // className={`${classes.listItem} ${note.status === 'done' ? classes.active : ''}`}
               className={clsx(classes.listItem, {
                  [classes.active]: note.done
               })}
               key={note.id}
               data-id={note.id}
               data-index={index}
               onClick={toggleHandle}
            >
               <div className={classes.noteItem}>
                  <p>{index + 1}.</p>
                  <strong>{note.title}</strong>
               </div>
               <span className={classes.date}>{new Date(note.updatedAt).toLocaleString()}</span>
               <button
                  className={classes.button7}
                  onClick={removeTodoHandle}
                  data-id={note.id}
               >
                  &times;
               </button>
            </li>
         ))}
         <div className={classes.numberRecords}>Number of notes: <strong>{notes.length}</strong></div>
      </ul>
   )
}
