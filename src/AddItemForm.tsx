import { ControlPoint } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";

type AddItemFormType = {
  addItem: (title: string) => void; //добавление таски
};
export function AddItemForm(props: AddItemFormType) {
  const [title, setTitle] = useState(""); //состояние для инпута чтобы добавлять новую таску
  const [error, setError] = useState<string | null>(null); //состояние для инпута, если мы хоитм добавить пустую стоку

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //фунцкия для изменения секста в инпуте
    setTitle(e.currentTarget.value);
  };

  const onKeyUpHendler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //функция добавления по кнопке
    setError(null);
    if (e.key === "Enter") {
      props.addItem(title.trim());
      setTitle(""); //после добавления таски делаем инпут пустым для удобства
    }
  };

  const addTask = () => {
    if (title.trim() !== "") {
      //если таска не равна пустой строке то добасить
      props.addItem(title.trim());
      setTitle(""); //после добавления таски делаем инпут пустым для удобства
    } else {
      setError("Field is required"); //иначе подсветить красным и вывести текст что таска пустой не может быть
    }
  };

  return (
    <div>
      <TextField
        variant="outlined" //отвечает за центровку текста внутри инпута
        label="Type value"
        value={title} //поле ввода равно пустой строке
        onChange={onChangeHandler}
        onKeyUp={onKeyUpHendler}
        error={!!error} //если null то подсветит красным (!!null= null(false)=> подсвети меня красным) !!"Anna"=> ""=> не подсвечивай, убери стиль красного
        helperText={error}//это строка или React-элемент, который отображается под компонентом ввода.
      />  
      <IconButton  color="primary" onClick={addTask}>
        <ControlPoint/>
      </IconButton>
    </div>
  );
}
