import { ChangeEvent, KeyboardEvent, useState } from "react";
import "./App.css";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

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
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newValue: string,
    todoListId: string
  ) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (todoListId: string, newTitle: string) => void;
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

  const removeTodoList = () => {
    //удаление тудулиста
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    //удаление тудулиста
    props.changeTodoListTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    //добавление заголовка тудушки
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        <div>
          {props.tasks.map((t) => {
            const onClickHendler = () => {
              //функция добавления таски
              props.removeTask(t.id, props.id);
            };

            const onChangeStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              let newIsDoneValue = e.currentTarget.checked;
              props.changeTaskStatus(t.id, newIsDoneValue, props.id);
            };

            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(t.id, newValue, props.id);
            };

            return (
              <div key={t.id} className={t.isDone ? "is-done" : ""}>
                {/*затемнение выполненных тасок с помощью класса
                 */}
                <Checkbox
                  checked={t.isDone}
                  onChange={onChangeStatusHandler}
                />
                <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                <IconButton onClick={onClickHendler}>
                  <Delete />
                </IconButton>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Button
          color="inherit"
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHendler}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHendler}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onComplitedClickHendler}
        >
          Completed
        </Button>
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
//11.Добавление тудулистов!!!!!!!
//12.аучились изменять инпут
