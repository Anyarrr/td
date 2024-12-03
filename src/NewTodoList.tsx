import { ChangeEvent, KeyboardEvent, useState } from "react";
import { StateType } from "./NewApp";
import "./App.css";

export type TypeTask = {
    id: string
    title: string
    isDone: boolean
};

type AllTask = {
    title:string
    result: Array<TypeTask>
    buttonValue: (value: StateType) => void;
    deleteButton:(id: string) => void;
    newButton:( title: string) => void;
    booleanTask:( taskId: string, isDone: boolean ) => void;
    filter: StateType;
}

export const NewTodolist = (props: AllTask) => {
    const [newInput, setNewInput] = useState("");
    const [error, setError] = useState< string | null >(null);

    const newTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewInput(e.currentTarget.value);
    }

    const onKeyUpHendler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter" && e.key !== newInput) {
          props.newButton(newInput);
          setNewInput("");
        }
      };

    const newButton = () => {
        if(newInput.trim() !== ""){
            props.newButton(newInput.trim());
            setNewInput("");
        }else{
            setError("Title is reguired");
        }
    }

    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                value={newInput}
                onChange={newTaskInput}
                onKeyUp={onKeyUpHendler}
                className={ error ? "error" : ""}

                />
                <button onClick={newButton}>+</button>
                { error && <div className="error-message">{error}</div>}

            </div>
            <div>
            <ul>
                {props.result.map(t => {
                    const booleanNew = ( e: ChangeEvent<HTMLInputElement>) => {
                        props.booleanTask(t.id, e.currentTarget.checked);
                    }

                    return <li 
                    className={ t.isDone ? "is-done" : ""}
                    key={t.id}><input
                    type="checkbox" 
                    checked={t.isDone}
                    onChange={booleanNew}
                    /><span>{t.title}</span>
                    <button onClick={() => props.deleteButton(t.id)} >x</button>
                    </li>

                })}
            </ul>
            </div>
            <div>
                <button className={ props.filter === "all" ? "active-filter" : ""} onClick={() => props.buttonValue("all")}>All</button>
                <button className={ props.filter === "active" ? "active-filter" : ""} onClick={() => props.buttonValue("active")}>Active</button>
                <button className={ props.filter === "completed" ? "active-filter" : ""} onClick={() => props.buttonValue("completed")}>Completed</button>
            </div>
        </div>
    )
}