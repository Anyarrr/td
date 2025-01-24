import "./App.css";
import { v1 } from "uuid";
import { TaskType, TodoList } from "./TodoList";
import { useState } from "react";
import { AddItemForm } from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TaskStateType = {//типизация для тудушки
 [key: string]: Array<TaskType>//т.е. это объект у которого есть ключь key со значением string , а значение этого массива является массив объектов!
}

function App() {
  //const [filter, setFilter] = useState<filterValuesType>("all");для фильтрации выполненных/невыполненных задач

  function removeTask(id: string, todoListId: string) {
    //фунция удаления таски
    let tasks = tasksObj[todoListId]; //достаем еудушку в зависимости какой придет, еще раз, доставать значение из ассоциативного массива можно обращаясь tasksObj[todoListId]
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todoListId] = filteredTasks; //тут мы перезаписываем обратно изменившиеся (отфильтрованные таски)
    setTasks({ ...tasksObj }); //отдаем копию изменившегося массива ,иначе реакт не отриогирует на просто вложение setTasks(tasksObj), реакт подумает что ничего не поменялось
  }

  function addTask(title: string, todoListId: string) {
    //добавление таски
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todoListId]; //получаю нужный массив с помощью такой конструкции
    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({ ...tasksObj });
  }

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    let tasks = tasksObj[todoListId]; //получаю нужный массив с помощью такой конструкции, так мы просто достаем значения(тоесть таски), которые вложенны в todoListOne/todoListTwo
    let task = tasks.find((t) => t.id === taskId); // === это true или falsе, в этом массиве тасок нашли нужную таску
    if (task) {
      task.isDone = isDone; //псевдоистинна псевдолож, тоесть если такая таска с таким айди существует, то мы поменяем значение
      setTasks({ ...tasksObj }); //  Создание копии массива обновление состояния с новой копией
    } //иначе она может быть не найдена
  };

  const changeTaskTitle = (
    taskId: string,
    newTitle: string,
    todoListId: string
  ) => {
    let tasks = tasksObj[todoListId]; //получаю нужный массив с помощью такой конструкции, так мы просто достаем значения(тоесть таски), которые вложенны в todoListOne/todoListTwo
    let task = tasks.find((t) => t.id === taskId); // === это true или falsе, в этом массиве тасок нашли нужную таску
    if (task) {
      task.title = newTitle; //псевдоистинна псевдолож, тоесть если такая таска с таким айди существует, то мы поменяем значение
      setTasks({ ...tasksObj }); //  Создание копии массива обновление состояния с новой копией
    } //иначе она может быть не найдена
  };

  function changeFilter(value: FilterValuesType, todoListId: string) {
    //фунцкия фильтрации all acrive т.д
    let todoLists = todoList.find((tl) => tl.id === todoListId);
    if (todoLists) {
      todoLists.filter = value;
      setTodoList([...todoList]); //если в тудушке произошли изменения то поменяй ее
    }
  }

  let todoListIdOne = v1(); //генерируем уникальный индетификатор
  let todoListIdTwo = v1(); //генерируем уникальный индетификатор

  let [todoList, setTodoList] = useState<Array<TodoListType>>([
    { id: todoListIdOne, title: "What to learn", filter: "all" },
    { id: todoListIdTwo, title: "What to buy", filter: "all" },
  ]);

  let removeTodoList = ( todoListId: string ) => {// удаление тудулиста
    let filteredTodoList = todoList.filter(tl => tl.id !== todoListId);
    setTodoList(filteredTodoList);
    delete tasksObj[todoListId];//удаляем удаленный тудулист, ведь зачем нам его хранить в коде, если мы от него избавились
    setTasks({...tasksObj})
  };

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todoListIdOne]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],

    [todoListIdTwo]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  });//еупурь для того чтобы прочитать значение которое лежит в [todoListIdOne]б а это id, мы можем к нему обращаться только tasks[tl.id]б tasks[todoListIdOne]

  const addTodoList = ( title: string) => {//создание нового тудулиста при добавлении
    let todoLists: TodoListType = {
      id: v1(),
      filter: "all",
      title: title,
    }
    setTodoList([todoLists, ...todoList]);//добавление новой тудушки первой а старые сдвинуть
    setTasks({...tasksObj, [todoLists.id]: []})
  }

  return (
    <div className="App">
     <AddItemForm addItem={addTodoList}/>
      {todoList.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id] || []; //эта функция сюда переехала потому что мы теперь мапит тудушки , и поэтому нам надо чтобы фильтрация взаимодействовала со всеми тудушками которые мы будем мапить
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
            removeTask={removeTask}
            tasks={tasksForTodoList}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
//49:00