import { useState } from "react";
import "./App.css";
import { v1 } from "uuid";
import { TodoList, TasksType } from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});
  }

  const chengeStatus = (tasksId: string, isDone: boolean, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === tasksId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj});

    }
  };

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolists = todolist.find((tl) => tl.id === todolistId);
    if (todolists) {
      todolists.filter = value;
      setTodolist([...todolist]);
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolist, setTodolist] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let removeTodoList = (todoListId: string) => {
    let filteredTodoList = todolist.filter(tl => tl.id !== todoListId);
    setTodolist(filteredTodoList);
    delete tasksObj[todoListId];
    setTasks({...tasksObj});
  }

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milck", isDone: true },
    ],
  });

  return (
    <div className="App">
      <input/><button>+</button>
      {todolist.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];
        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }

        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            chengeTasksStatus={chengeStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
