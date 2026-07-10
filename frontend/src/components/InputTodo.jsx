import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState(""); // State variable to hold the description of the todo item. Initially, an empty string.

  // The (e) stands for "event" (the form submission event). The async keyword is required because we are going to use await inside it to talk to the database over the internet.
  const onSubmitForm = async (e) => {
    e.preventDefault(); // For not refreshing on form submit (which is the default behaviour).
    try {
      const body = { description }; // ES6 shorthand for { description: description } - Object Property Shorthand. This creates an object with a key of 'description' and a value of the current state variable 'description'.
      // If backend code was like `const { desc } = req.body;`, then we would have to do `const body = { desc: description };` instead. The key name must match the backend code.
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // This is the "envelope label". It tells the Express backend: "Hey, the data I am sending you is formatted as JSON, so please use the app.use(express.json()) middleware to decode it."
        body: JSON.stringify(body), // This is the envelope contents. It is the actual data we are sending to the backend. We are converting the JavaScript object 'body' into a JSON string.
      });

      window.location = "/"; // If the fetch succeeds, this line forces the browser to instantly navigate to the root page (/). This acts as a hard refresh, forcing ListTodos.jsx to reload and fetch the newly updated list of todos from the database. (Note: While this works perfectly, forcing a hard refresh is considered a beginner "hack" in React. Advanced React apps usually update the state directly so the screen updates without a flashing refresh).
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form
        className="flex justify-center mt-5 max-w-lg mx-auto"
        onSubmit={onSubmitForm}
      >
        <input
          type="text"
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-l-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Enter todo item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md shrink-0">
          Add
        </button>
      </form>
    </>
  );
};

export default InputTodo;
