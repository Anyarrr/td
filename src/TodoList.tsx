import { ChangeEvent, KeyboardEvent, useState } from "react";
import "./App.css";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  id: string;
  tasks: Array<TaskType>; //TaskType[];
  title: string;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void; //all active
  addTask: (title: string, todoListId: string) => void; //добавление таски
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList:( todoListId: string) => void;
};

export function TodoList(props: PropsType) {
  const onAllClickHendler = () => {
    //функция для фильтровки всех, активных, неактивных
    props.changeFilter("all", props.id); //передаем id обратно в функцию для фильтрации тудушек
  };
  const onActiveClickHendler = () => {
    //функция для фильтровки всех, активных, неактивных
    props.changeFilter("active", props.id); //передаем id обратно в функцию для фильтрации тудушек
  };
  const onComplitedClickHendler = () => {
    //функция для фильтровки всех, активных, неактивных
    props.changeFilter("completed", props.id); //передаем id обратно в функцию для фильтрации тудушек
  };

  const removeTodoList = () => {//удаление тудулиста
    props.removeTodoList(props.id);
  };

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodoList}>x</button>
      </h3>
      <AddItemForm id={props.id} addItem={props.addTask} />
      <div>
        <ul>
          {props.tasks.map((t) => {
            const onClickHendler = () => {
              //функция добавления таски
              props.removeTask(t.id, props.id);
            };

            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
            };

            return (
              <li key={t.id} className={t.isDone ? "is-done" : ""}>
                {/*затемнение выполненных тасок с помощью класса
                 */}
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={onChangeHandler}
                />
                <span>{t.title}</span>
                <button onClick={onClickHendler}>x</button>
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

//1.Удаление задач
//2.Добавление задач
//3.Добавление задачи по Enter
//4.Фильтрация
//5.Можно изменять checked
//6.Добавление задачи без пробелов
//7.Подсветка пустой задачи
//8.Подвсветка кнопок фильтрации
//9.Затемнение выполненных тасок
//10.Удаление тудулистов