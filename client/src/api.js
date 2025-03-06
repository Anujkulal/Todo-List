import axios from 'axios';

const API_URL = 'http://localhost:3000/api/todos/';

export const getTodos = async () => {
    const response = await axios.get(API_URL);
    // console.log("response::: ",response);
    // console.log("response.data::: ",response.data);
    return response.data;
}

export const addTodo = async (todo) => {
    const response = await axios.post(API_URL, todo);
    return response.data;
}

export const updateTodo = async (id, updatedTodo) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    return response.data;
}

export const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
}