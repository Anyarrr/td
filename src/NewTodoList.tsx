import { ChangeEvent, useState } from "react";
import { StateType } from "./NewApp";


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
}

export const NewTodolist = (props: AllTask) => {
    const [newInput, setNewInput] = useState("");

    const newTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewInput(e.currentTarget.value);
    }

    const newButton = () => {
        props.newButton(newInput);
        setNewInput("");
    }

    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                value={newInput}
                onChange={newTaskInput}
                />
                <button onClick={newButton}>+</button>
            </div>
            <div>
            <ul>
                {props.result.map(t => {
                    const booleanNew = ( e: ChangeEvent<HTMLInputElement>) => {
                        props.booleanTask(t.id, e.currentTarget.checked);
                    }

                    return <li><input type="checkbox" 
                    checked={t.isDone}
                    onChange={booleanNew}
                    /><span>{t.title}</span>
                    <button onClick={() => props.deleteButton(t.id)} >x</button>
                    </li>

                })}
            </ul>
            </div>
            <div>
                <button onClick={() => props.buttonValue("all")}>All</button>
                <button onClick={() => props.buttonValue("active")}>Active</button>
                <button onClick={() => props.buttonValue("completed")}>Completed</button>
            </div>
        </div>
    )
}