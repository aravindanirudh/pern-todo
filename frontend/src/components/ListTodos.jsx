import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(
        `${import.meta.env.VITE_BASE_URL}/todos/${id}`,
        {
          method: "DELETE",
        },
      );
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/todos`);
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex justify-center mt-10 p-2 sm:p-4">
    <div className="w-full max-w-4xl overflow-x-auto shadow-lg rounded-xl">
      <table className="table-auto w-full border-collapse bg-white min-w-125">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Description</th>
            <th className="px-6 py-4 text-left font-semibold">Edit</th>
            <th className="px-6 py-4 text-left font-semibold">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {/* <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td className="px-6 py-4">Malcolm Lockyer</td>
            <td className="px-6 py-4">1961</td>
          </tr> */}
          {todos.map((todo) => (
            <tr
              key={todo.todo_id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">{todo.description}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setEditingTodo(todo)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-md"
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => deleteTodo(todo.todo_id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          {/* If editingTodo has data, show the modal and pass the data to it */}
          {editingTodo && (
            <EditTodo
              todo={editingTodo}
              onClose={() => setEditingTodo(null)}
              onTodoUpdated={getTodos}
            />
          )}
    </div>
    </div>
  );
};

export default ListTodos;
