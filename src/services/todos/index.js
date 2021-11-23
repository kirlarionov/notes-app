import { API_URL } from './config'

export const getTodos = async () => {
   const response = await fetch(API_URL)
   const data = await response.json()
   return data
}

export const addTodo = async (data) => {
   const response = await fetch(API_URL, {
      headers: {
         "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
   })
   return await response.json()
}

export const removeTodo = async (id, setStateNotes) => {
   await fetch(`${API_URL}/${id}`, { method: "DELETE" })
   const updateData = await getTodos().then(data => setStateNotes(data))
   return updateData
}