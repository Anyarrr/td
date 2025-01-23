import { useState } from "react";
import "./App.css";
import { filterValuesType } from "./Gapp";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  tasks: Array<TaskType>; //TaskType[];
  title: string;
  removeTask: (id: string) => void;
  changeFilter: (value: filterValuesType) => void; //all active
  addTask: (title: string) => void; //добавление таски
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: filterValuesType;
};

export function TodoList(props: PropsType) {
  const [newTasksTitle, setNewTasksTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTasksTitle(e.currentTarget.value);
  };

  const onKeyUpHendler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.code === "Enter") {
      props.addTask(newTasksTitle);
      setNewTasksTitle("");
    }
  };

  const addTask = () => {
    if (newTasksTitle.trim() !== "") {
      props.addTask(newTasksTitle.trim());
      setNewTasksTitle("");
    } else {
      setError("Field is required");
    }
  };

  const onAllClickHendler = () => {
    //функция для фильтровки всех, активных, неактивных
    props.changeFilter("all");
  };
  const onActiveClickHendler = () => {
    //функция для фильтровки всех, активных, неактивных
    props.changeFilter("active");
  };
  const onComplitedClickHendler = () => {
    //функция для фильтровки всех, активных, неактивных
    props.changeFilter("completed");
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTasksTitle}
          onChange={onChangeHandler}
          onKeyUp={onKeyUpHendler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <div>
        <ul>
          {props.tasks.map((t) => {

            const onRemoveHandler = () => {//функция добавления таски
            props.removeTask(t.id);
            };

            const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked);
            }

            return (
              <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox" checked={t.isDone} 
                  onChange={onChangeHandler}
                  />
                <span>{t.title}</span>
                <button
                  onClick={onRemoveHandler}
                >
                  
                  x
                </button>
              </li>
            );
          })}
        </ul>
      </div>
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
          onClick={onComplitedClickHendler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

//добавление по клавише 32:07 3 урок
