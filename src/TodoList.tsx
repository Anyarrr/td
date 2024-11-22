import { KeyboardEvent, ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import "./App.css";


export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  chengeTasksStatus: ( tasksId: string, isDone: boolean ) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTaskTitleHendler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyUpHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.key !== newTaskTitle) {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if(newTaskTitle.trim() !== ""){
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    }
  };

  const onAllClickHendler = () => props.changeFilter("all");
  const onActiveClickHendler = () => props.changeFilter("active");
  const onCompletedClickHendler = () => props.changeFilter("completed");

  return (
    <div>
      <div>
        <h3>{props.title}</h3>
      </div>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTaskTitleHendler}
          onKeyUp={onKeyUpHendler}
          className="error"

        />
        <button onClick={addTask}>+</button>
        <div className="error-message">Fieldis reguired</div>
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => props.removeTask(t.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.chengeTasksStatus( t.id, e.currentTarget.checked );
          }

          return (
            <li key={t.id}>
              <input type="checkbox"
              onChange={onChangeHandler} 
              checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHendler}>All</button>
        <button onClick={onActiveClickHendler}>Active</button>
        <button onClick={onCompletedClickHendler}>Completed</button>
      </div>
    </div>
  );
}
