import React, { useCallback } from "react";
import classes from "./Notes.module.css"
import clsx from 'clsx'

export const Notes = ({ notes, removeNote, setStateNotes }) => {

   console.log('Notes length:', notes.length)

   const toggle = useCallback((e) => {
      const el = e.currentTarget
      const newNotes = notes.map(item => {
         return item.id === +el.dataset.id ? {
            ...item,
            status: item.status === 'active' ? 'done' : 'active'
         } : item
      })
      el.classList.toggle(`${classes.active}`)
      setStateNotes(newNotes)
   }, [notes, setStateNotes])


   return (
      <ul className={classes.notesUl}>
         {notes.map((note, index) => (
            <li
               // className={`${classes.listItem} ${note.status === 'done' ? classes.active : ''}`}
               className={clsx(classes.listItem, {
                  [classes.active]: note.status === 'done'
               })}
               key={note.id}
               data-id={note.id}
               onClick={toggle}
            >
               <div className={classes.noteItem}>
                  <p>{index + 1}.</p>
                  <strong>{note.title}</strong>
               </div>
               <span className={classes.date}>{new Date().toLocaleDateString()}</span>
               <button
                  className={classes.button7}
                  onClick={() => removeNote(index)}
               >
                  &times;
               </button>
            </li>
         ))}
         <div className={classes.numberRecords}>Number of notes: <strong>{notes.length}</strong></div>
      </ul>
   )
}
