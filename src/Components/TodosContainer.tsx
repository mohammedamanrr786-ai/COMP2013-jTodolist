//This component will have a Todo list as a prop
//The we will map into several TodoCard components

import type { TodoContainerProps } from "./TodoApp";
import TodoCard from "./TodoCard";

export default function TodosContainer({
  todosList,
  handleTodoCheck,
  handleDeleteTodo,
  handleEditTodo,
}: TodoContainerProps) {
  return (
    <div>
      {todosList.length > 0 || "Todos list is empty"}
      {todosList.map((todo) => (
        <TodoCard
          key={todo.id}
          {...todo}
          handleTodoCheck={handleTodoCheck}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
        />
      ))}
    </div>
  );
}