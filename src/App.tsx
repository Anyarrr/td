import { useState } from "react";
import "./App.css";
import {v1} from "uuid";
import { TodoList, TasksType } from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  const [tasks, setTasks] = useState<Array<TasksType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
]);

const [filter, setfilter] = useState<FilterValuesType>("all");

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { 
       id: v1(),
       title: title, 
       isDone: false};
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setfilter(value);
  }

  let tasksForTodoList = tasks;
  if(filter === "completed"){
    tasksForTodoList = tasks.filter(t => t.isDone === true);
  }
  if(filter === "active"){
    tasksForTodoList = tasks.filter(t => t.isDone === false);
  }
  
  const chengeStatus = ( tasksId: string, isDone: boolean) => {
    let task = tasks.find( t => t.id === tasksId);
    if(task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  return (
    <div className="App">
      <TodoList title="What to learn" 
                tasks={tasksForTodoList} 
                removeTask={removeTask} 
                changeFilter={changeFilter} 
                addTask={addTask} 
                chengeTasksStatus={chengeStatus}/>
    </div>
  );
}

export default App;
