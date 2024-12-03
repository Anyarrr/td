import { useState } from "react";
import "./App.css";
import { v1 } from "uuid";
import { NewTodolist, TypeTask } from "./NewTodoList";

export type StateType = "all" | "active" | "completed";

const NewApp = () => {
  const [result, setResult] = useState<Array<TypeTask>>([
    { id: v1(), title: "Занимайся 5 часов в день", isDone: false },
    { id: v1(), title: "Разбирать Todo List", isDone: true },
    { id: v1(), title: "Самой решать задачки", isDone: true },
    { id: v1(), title: "Зaниматься спортом", isDone: false },
    { id: v1(), title: "Готовить кушать", isDone: true },
  ]);

  const [filter, setFilter] = useState<StateType>("all");

  const buttonValue = (value: StateType) => {
    setFilter(value);
  }

  let resultAllTask = result;
  if (filter === "completed") {
    resultAllTask = result.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    resultAllTask = result.filter((t) => t.isDone === false);
  }

  const deleteButton = (id: string) => {
    let filterTask = result.filter(t => t.id !== id);
    setResult(filterTask);
  }

  const newButton = ( title: string ) => {
    let newTask = { id: v1(), title: title, isDone: false};
    let newsTask = [ newTask, ...result];
    setResult(newsTask);
  }

  const booleanTask = (taskId: string, isDone: boolean) => {
    const newBooleanTasks = result.map((t) => {
      return t.id === taskId ? {...t, isDone} : t;
    });
    setResult(newBooleanTasks);
  }

  return (
    <div className="App">
      <NewTodolist title="Скоро твой путь озарится самой большой звездой!"
                   result={resultAllTask} 
                   buttonValue={buttonValue} 
                   deleteButton={deleteButton}
                   newButton={newButton}
                   booleanTask={booleanTask}
                   filter={filter}
                   />
    </div>
  );
};

export default NewApp;