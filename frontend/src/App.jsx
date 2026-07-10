import React from 'react'
import InputTodo from './components/InputTodo'
import ListTodos from './components/ListTodos'

const App = () => {
  return (
    <>
      <div className="container mx-auto px-4 md:px-0"> {/* container class creates a responsive container with a maximum width that changes based on the screen size. Without it, contents stretch along the entire screen width. mx-auto sets margin-left: 0; and margin-right: 0; */}
        <h1 className='text-center mt-5 text-2xl font-bold'>PERN Todo List</h1>
        <InputTodo />
        <ListTodos />
      </div>
    </>
  )
}

export default App