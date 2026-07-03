import React, { useState } from "react";

const EditTodo = ({ todo, onClose, onTodoUpdated }) => {
  // 1. State to hold the edited description, initialized to the current todo's text
  const [description, setDescription] = useState(todo.description);

  // 2. The function that runs when you click "Save Changes"
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      // Make a PUT request to update the specific todo
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      if (response.ok) {
        onTodoUpdated(); // Tell the parent (ListTodos) to fetch the updated list
        onClose(); // Close the modal
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50 overflow-y-auto
  overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-xl shadow-xl p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 md:pb-5">
            <h3 className="text-xl font-semibold text-gray-900">Edit Todo</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-
  8 h-8 ms-auto inline-flex justify-center items-center transition-colors"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18
  17.94 6M18 18 6.06 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Body: Input Field */}
          <div className="py-4 md:py-6">
            <label
              htmlFor="edit-description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              type="text"
              id="edit-description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
  focus:border-blue-500 block w-full p-2.5 outline-none transition-colors"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoFocus
            />
          </div>

          {/* Footer: Action Buttons */}
          <div className="flex items-center border-t border-gray-200 space-x-3 pt-4 md:pt-5">
            {/* Note the onClick={updateDescription} here! */}
            <button
              onClick={updateDescription}
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium
  rounded-lg text-sm px-5 py-2.5 focus:outline-none transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-
  gray-100 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
