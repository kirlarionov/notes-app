import React, { useCallback, useRef } from "react";
import cl from "./Form.module.css"
import { addTodo } from "../../services/todos"


export const Form = ({ addNoteHandle }) => {

   const inputRef = useRef()

   const submitHandler = useCallback(event => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const { status, ...data } = Object.fromEntries(formData)
      addTodo({ ...data, done: status === 'done' }).then(data => addNoteHandle(data))
      inputRef.current && (inputRef.current.value = '')
   }, [addNoteHandle])


   return (
      <form onSubmit={submitHandler}>
         <div className="form-group">
            <input
               ref={inputRef}
               name="title"
               type="text"
               className={cl.formControl}
               placeholder="Enter a title for your note..."
            />
            <select
               name="status"
               className={cl.statusSelect}>
               <option disabled>status:</option>
               <option value="active" className={cl.activeId}>Active</option>
               <option value="done">Done</option>
            </select>
            <button
               className={cl.button7}
            >Add</button>
         </div>
      </form>
   )
}
