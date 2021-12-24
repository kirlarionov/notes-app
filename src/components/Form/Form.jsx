import React, { useCallback, useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import classes from "./Form.module.css"
// import { addTodo } from "../../services/todos"
import { todosFetchingSelector } from "../../store/selectors"
import { getTodos, addTodo } from "../../store/actions/todos"


export const Form = () => {

   const inputRef = useRef()
   const dispatch = useDispatch()
   const loading = useSelector(todosFetchingSelector)

   useEffect(() => dispatch(getTodos()), [dispatch])

   const [emptyInput, setEmptyInput] = useState(false)


   // const addNoteHandle = useCallback(note => {
   //    dispatch(prevState => ({ ...prevState, [note.id]: note }))
   // }, [dispatch])

   //                                      БЕЗ Redux 
   // const submitHandler = useCallback(event => {
   //    event.preventDefault()
   //    const formData = new FormData(event.currentTarget)
   //    const { status, ...data } = Object.fromEntries(formData)
   //    addTodo({ ...data, done: status === 'done' }).then(data => addNoteHandle(data))
   //    inputRef.current && (inputRef.current.value = '')
   // }, [addNoteHandle])

   const submitHandler = useCallback(event => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const { status, ...data } = Object.fromEntries(formData)
      if (!inputRef.current.value) {
         setEmptyInput(true)
         inputRef.current.classList.toggle(classes.emptyInput)
         setTimeout(() => {
            inputRef.current.classList.toggle(classes.emptyInput)
            setEmptyInput(false)
         }, 3000)
      } else {
         dispatch(addTodo({ ...data, done: status === 'done' }))
         inputRef.current && (inputRef.current.value = '')
      }
   }, [dispatch])


   return (
      <form onSubmit={submitHandler}>
         {emptyInput && <div className={classes.emptyInputAlert}>Please enter a title for your note <span>&#129047;</span></div>}

         <input
            ref={inputRef}
            name="title"
            type="text"
            className={classes.formInput}
            placeholder="Enter a title for your note..."
         />

         <select
            name="status"
            className={classes.statusSelect}>
            <option disabled>status:</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
         </select>

         <button className={`${classes.button} ${(loading === "ADD") ? classes.buttonLoading : null}`}>
            <span className={classes.buttonText}>Add</span>
         </button>

      </form>
   )
}
