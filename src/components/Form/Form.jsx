import React, { useState } from "react";
import cl from "./Form.module.css"


export const Form = ({ addNote }) => {
   const [inputValue, setInputValue] = useState('')
   const [statusValue, setStatusValue] = useState('active')

   const submitHandler = event => {
      event.preventDefault()
   }

   const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.substring(1);
   }

   return (
      <form onSubmit={submitHandler}>
         <div className="form-group">
            <input
               type="text"
               className={cl.formControl}
               placeholder="Enter a title for your note..."
               value={inputValue}
               onChange={e => setInputValue(e.target.value)}
            />
            <select
               name="statusSelect"
               className={cl.statusSelect}
               onChange={e => setStatusValue(capitalizeFirstLetter(e.target.value))}>
               <option disabled>status:</option>
               <option value="active" className={cl.activeId}>Active</option>
               <option value="done">Done</option>
            </select>
            <button
               className={cl.button7}
               onClick={() => addNote(inputValue, setInputValue, statusValue)}
            >Add</button>
         </div>
      </form>
   )
}
