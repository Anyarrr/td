import { useState } from "react"

type EditableSpanPropsType = {
    title: string
  }
  
  export function EditableSpan(props: EditableSpanPropsType) {
    const [ editMode, setEditMode ] = useState(false);
    return editMode ? <input value={props.title}/> : <span>{props.title}</span>
  }