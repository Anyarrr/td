import "./App.css";
import { v1 } from "uuid";
import { TodoList, TaskType } from "./GotoList";
import { useState } from "react";

export type filterValuesType = "all" | "active" | "completed";

function Gapp() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  const [filter, setFilter] = useState<filterValuesType>("all");

  function removeTask(id: string) {
    //фунция удаления таски
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    //добавление таски
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  const changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find((t) => t.id === taskId); // === это true или false
    if (task) {
      task.isDone = isDone; //псевдоистинна псевдолож, тоесть если такая таска с таким айди существует, то мы поменяем значение
    } //иначе она может быть не найдена
    setTasks([...tasks]);
  };

  function changeFilter(value: filterValuesType) {
    //фунцкия фильтрации all acrive т.д
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn2"
        removeTask={removeTask}
        tasks={tasksForTodoList}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default Gapp;
