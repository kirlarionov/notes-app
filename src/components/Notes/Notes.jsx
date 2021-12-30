import React, { useCallback, useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import classes from "./Notes.module.css"
import { getTodos, removeTodo, updateTodo, toggleStatusHandle } from "../../store/actions"
import { todosDataSelector, todosFetchingSelector } from "../../store/selectors"
import editImg from '../../assets/image/edit.svg'
import deleteImg from '../../assets/image/delete24.svg'
import loader from '../../assets/image/loader.gif'


export const Notes = () => {

   const todos = useSelector(todosDataSelector)
   const loading = useSelector(todosFetchingSelector)
   const dispatch = useDispatch()

   useEffect(() => dispatch(getTodos()), [dispatch])

   const [editNoteId, setEditNoteId] = useState(null)
   const [editInputValue, setEditInputValue] = useState('')


   const toggleHandle = useCallback(e => {
      const el = e.currentTarget
      const { [el.dataset.id]: currentNote } = todos
      dispatch(toggleStatusHandle(el.dataset.id, { done: !currentNote.done }))
      el.classList.toggle(`${classes.active}`)
   }, [dispatch, todos])

   const editTodoHandle = useCallback(e => {
      e.stopPropagation()
      const { id, title } = e.currentTarget.dataset
      setEditNoteId(id)
      setEditInputValue(title)
   }, [setEditNoteId])

   const updateTodoHandle = useCallback(e => {
      e.stopPropagation()
      dispatch(updateTodo(editNoteId, editInputValue))
      setEditNoteId(null)
   }, [editInputValue, editNoteId, dispatch])

   const removeTodoHandle = useCallback(e => {
      e.stopPropagation()
      const button = e.currentTarget
      const { id } = e.currentTarget.dataset
      const img = e.currentTarget.children[0]
      button.classList.toggle(classes.buttonLoading)
      img.classList.toggle(classes.imgHidden)
      dispatch(removeTodo(id))
   }, [dispatch])

   const getInputValue = useCallback(e => setEditInputValue(e.currentTarget.value), [])
   const onClickEditBlock = useCallback(e => e.stopPropagation(), [])
   const onCancellBtn = useCallback(() => setEditNoteId(null), [])

   if (loading === "GET") {
      return <img src={loader} alt="loader" style={{ paddingLeft: 450, paddingTop: 40 }} />
   }


   return (
      <ul className={classes.notesUl}>
         {Object.values(todos).map((note, index) => (
            <li
               className={clsx(classes.listItem, {
                  [classes.active]: note.done
               })}
               key={note.id + 'noteId'}
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

               <button className={classes.deleteBtn}
                  onClick={removeTodoHandle}
                  data-id={note.id}>
                  <img src={deleteImg} alt="delete button" />
               </button>

               {(note.id === editNoteId) && (
                  <div className={classes.editBlock} onClick={onClickEditBlock}>

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

                     <button className={classes.updateBtn} onClick={onCancellBtn}>Cancel</button>
                  </div>)}

            </li>
         ))}
         <div className={classes.numberRecords}>Number of notes: <strong>{Object.keys(todos).length}</strong></div>
      </ul>
   )
}
