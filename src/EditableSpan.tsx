import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

export function EditableSpan(props: EditableSpanPropsType) {
  
  const [editMode, setEditMode] = useState(false); //false-означает режим прстого отображения,true-режим редактирования даблик что хотим редактировать
  const [ title, setTitle ] = useState("");

  const activateEditMode = () => {//если мы нажали на спан даблкликом, то он становится инпутом
    setEditMode(true);
    setTitle(props.title);
  }

  const activateViewMode = () => {//эта функция помогает прекратить изменения value инпута , так как теряется фокус
    setEditMode(false);
    props.onChange(title);

  }

  const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }

  return editMode ? <TextField value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTitleHandler}/> : <span onDoubleClick={activateEditMode} >{props.title}</span>;
}

//файл который будет позволять изменять таски
//autoFocus-если мы уже нажали на спан и он поменялся на инпут, то первоначально нет концентрации, а если написать этот метод, то при нажатии поле концентрируется а инпуте и так легче предотвратить изменения
//научились изменять инпут
