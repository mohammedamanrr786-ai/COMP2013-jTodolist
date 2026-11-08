//this component will contain
//1. a body for the title of the todo
//2. a button for deleting the todo
//3. a button to edit the todo
//4. a checkbox to mark the todo as completed

import type { TodoContainerFunctions } from "./TodoApp";

export default function TodoCard({
  id,
  title,
  checked,
  handleTodoCheck,
  handleDeleteTodo,
  handleEditTodo,
}: TodoContainerFunctions) {
  return (
    <div>
      <input
        type="checkbox"
        name="checked"
        id="checked"
        checked={checked}
        onChange={(e) => handleTodoCheck(e, id)}
      />

      <span>{title}</span>
      <button onClick={() => handleDeleteTodo(id)}>Delete</button>
      <button onClick={() => handleEditTodo(id)}>Edit</button>
    </div>
  );
}