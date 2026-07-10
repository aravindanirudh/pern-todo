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
      setTodos(todos.filter((todo) => todo.todo_id !== id)); // This is a crucial React pattern. Instead of refreshing the entire web page to see the item disappear, this line instantly updates the UI. It looks at the current list of todos, filters out the one you just deleted, and saves the new, shorter list back into state. Alternatively, you could call getTodos() here to fetch the updated list from the backend, but that would be slower and less efficient. Alternatively, you could also use window.location = "/" to force a hard refresh, but that is considered a beginner "hack" in React. Advanced React apps usually update the state directly so the screen updates without a flashing refresh.
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/todos`);
      const jsonData = await response.json();
      setTodos(jsonData);
      // console.log(jsonData); // This is a debugging line. It prints the fetched data to the browser console so you can see what the backend sent back.
      // This will print the entire array of todos to the console twice during development because React's Strict Mode intentionally runs certain functions twice to help you catch bugs. This is normal and expected behavior in development mode. However, in production mode, this will only run once and you will see the data printed to the console only once.
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  // The empty array [] at the end is very important. It tells React: "Only run this inner function exactly ONE time, right when this component first appears on the screen." Without that [], React would fetch data in an infinite, uncontrollable loop!

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
          {/* If editingTodo has data, show the modal and pass the data to it (conditional rendering). */}
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
