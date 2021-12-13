import React, { useCallback, useState } from "react";
import classes from "./Notes.module.css"
import clsx from 'clsx'
import { removeTodo, updateTodo } from "../../services/todos"
import editImg from '../../assets/image/edit.svg'
import deleteImg from '../../assets/image/delete24.svg'


export const Notes = ({ notes, setStateNotes }) => {

   const [editNoteId, setEditNoteId] = useState(false)
   const [editInputValue, setEditInputValue] = useState('')


   const toggleHandle = useCallback((e) => {
      const el = e.currentTarget
      setStateNotes(prevState => {
         const { [el.dataset.id]: currentNote, ...newNotes } = prevState
         const updatedNote = { ...currentNote, done: !currentNote.done }
         updateTodo(updatedNote.id, { done: updatedNote.done })
         return {
            ...newNotes,
            [updatedNote.id]: updatedNote
         }
      })
      el.classList.toggle(`${classes.active}`)
   }, [setStateNotes])


   const editTodoHandle = useCallback((e) => {
      e.stopPropagation()
      const { id, title } = e.currentTarget.dataset
      setEditNoteId(id)
      setEditInputValue(title)
   }, [setEditNoteId])

   const updateTodoHandle = useCallback((e) => {
      e.stopPropagation()
      const el = e.currentTarget
      setStateNotes((prevState) => {
         const { [el.dataset.id]: currentNote, ...newNotes } = prevState
         const updatedNote = { ...currentNote, title: editInputValue }
         updateTodo(updatedNote.id, { title: updatedNote.title })
         return {
            ...newNotes,
            [updatedNote.id]: updatedNote
         }
      })
      setEditNoteId(null)
   }, [setStateNotes, editInputValue])

   const getInputValue = useCallback((e) => {
      setEditInputValue(e.currentTarget.value)
   }, [])


   const removeTodoHandle = useCallback((e) => {
      e.stopPropagation()
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
                  className={classes.editBtn}
                  onClick={editTodoHandle}
                  data-id={note.id}
                  data-title={note.title}>
                  <img src={editImg} alt="edit button" />
               </button>
               <button
                  className={classes.deleteBtn}
                  onClick={removeTodoHandle}
                  data-id={note.id}>
                  <img src={deleteImg} alt="delete button" />
               </button>

               {(note.id === editNoteId) && (
                  <div className={classes.editBlock} onClick={e => e.stopPropagation()}>
                     <input
                        className={classes.editInput}
                        placeholder="Edit your note..."
                        value={editInputValue}
                        onChange={getInputValue} />
                     <button
                        className={classes.updateBtn}
                        onClick={updateTodoHandle}
                        data-id={note.id}
                     >Update</button>
                     <button className={classes.updateBtn} onClick={() => setEditNoteId(null)}>Cancel</button>
                  </div>)}

            </li>
         ))}
         <div className={classes.numberRecords}>Number of notes: <strong>{Object.keys(notes).length}</strong></div>
      </ul>
   )
}
