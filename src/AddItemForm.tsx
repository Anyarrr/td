import { useState } from "react";

type AddItemFormType = {
  addItem: (title: string, todoListId: string) => void; //добавление таски
  id: string;
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
      props.addItem(title, props.id);
      setTitle(""); //после добавления таски делаем инпут пустым для удобства
    }
  };

  const addTask = () => {
    if (title.trim() !== "") {
      //если таска не равна пустой строке то добасить
      props.addItem(title.trim(), props.id);
      setTitle(""); //после добавления таски делаем инпут пустым для удобства
    } else {
      setError("Field is required"); //иначе подсветить красным и вывести текст что таска пустой не может быть
    }
  };

  return (
    <div>
      <input
        value={title} //поле ввода равно пустой строке
        onChange={onChangeHandler}
        onKeyUp={onKeyUpHendler}
        className={error ? "error" : ""} //если таска при добавлении равна пустой строке то добавить класс чтобы инпут подсветился красным
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}{" "}
      {/*если равна пустой строке то и вывести текст */}
    </div>
  );
}
