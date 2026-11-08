import { useState, type ChangeEvent, type SubmitEvent } from "react";
import FormComponent from "./FormComponents";
import TodosContainer from "./TodosContainer";

export interface TodoCardProps {
  id: string;
  title: string;
  checked: boolean;
}

export interface TodoContainerFunctions extends TodoCardProps {
  handleTodoCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string) => void;
}

export interface TodoContainerProps {
  todosList: TodoCardProps[];
  handleTodoCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string) => void;
}

export interface FormComponentProps extends TodoCardProps {
  handleFormOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function TodoApp() {
  //states
  //a state to store the input changes
  //once the submit button is clicked, we will add the input value to the todosList state

  const [todo, setTodo] = useState<TodoCardProps>({
    id: "",
    title: "",
    checked: false,
  });

  //Second state to store the list of todos
  const [todosList, setTodosList] = useState<TodoCardProps[]>([]);

  //handlers

  const handleFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo((prevTodo) => ({ ...prevTodo, [e.target.name]: e.target.value }));
  };

  //2. handle the onSubmit event for the form component

  const handleOnSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.id === "") {
      setTodosList((prevList) => [
        ...prevList,
        {
          id: crypto.randomUUID(),
          title: todo.title,
          checked: false,
        },
      ]);
    } else {
      setTodosList((prevList) =>
        prevList.map((entry) =>
          entry.id === todo.id ? { ...entry, title: todo.title } : { ...entry },
        ),
      );
    }

    setTodo({
      id: "",
      title: "",
      checked: false,
    });
  };

  //3.Handle the checkbox toggle in the the todo card
  const handleTodoCheck = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setTodosList((prevList) =>
      prevList.map((entry) =>
        entry.id === id
          ? { ...entry, checked: e.target.checked }
          : { ...entry },
      ),
    );
  };

  //4. Handle the delete button in the todo card
  const handleDeleteTodo = (id: string) => {
    setTodosList((prevList) => prevList.filter((entry) => entry.id !== id));
  };

  //5. Handle deleting an entry using the delete button
  const handleEditTodo = (id: string) => {
    const todoToEdit = todosList.find((entry) => entry.id === id) || {
      title: "",
      id: "",
      checked: false,
    };
    setTodo(todoToEdit);
  };

  //main return
  return (
    <div>
      <h1>Todo List App</h1>
      <FormComponent
        {...todo}
        handleFormOnChange={handleFormOnChange}
        handleOnSubmit={handleOnSubmit}
      />
      <TodosContainer
        todosList={todosList}
        handleTodoCheck={handleTodoCheck}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
    </div>
  );
}