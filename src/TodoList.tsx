import { KeyboardEvent, ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import "./App.css";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TasksType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  chengeTasksStatus: (tasksId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodoList:(todolistId: string) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTaskTitleHendler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyUpHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter" && e.key !== newTaskTitle) {
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle("");
    } else {
      setError("Title is reguired");
    }
  };

  const onAllClickHendler = () => props.changeFilter("all", props.id);
  const onActiveClickHendler = () => props.changeFilter("active", props.id);
  const onCompletedClickHendler = () => props.changeFilter("completed", props.id);
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  }

  return (
    <div>
      <div>
        <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
      </div>
      <AddItemForm id={props.id} addTask={props.addTask}/>
      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => props.removeTask(t.id, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.chengeTasksStatus(t.id, e.currentTarget.checked, props.id);
          };

          return (
            <li className={t.isDone ? "is-done" : ""} key={t.id}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHendler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHendler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHendler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
type AddItemFormType = {
  addTask: (title: string, todolistId: string) => void;
  id: string

};
function AddItemForm(props: AddItemFormType){
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);


  const onNewTaskTitleHendler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyUpHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter" && e.key !== newTaskTitle) {
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle("");
    } else {
      setError("Title is reguired");
    }
  };

  return <div>
  <input
    value={newTaskTitle}
    onChange={onNewTaskTitleHendler}
    onKeyUp={onKeyUpHendler}
    className={error ? "error" : ""}
  />
  <button onClick={addTask}>+</button>
  {error && <div className="error-message">{error}</div>}
</div>
}