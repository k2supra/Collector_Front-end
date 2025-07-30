/* eslint-disable no-unused-vars */
import { useRef, useState } from "react"

export function Form() {
    const input = useRef(null)
    const counter = useRef(0);
    const [showedCounter, setShowedCounter] = useState(0);
    return<form onSubmit={(e)=>{e.preventDefault()}} style={styles.form}>
        <input ref={input} placeholder="Name"/>
        <button onClick={()=>{input.current.focus(); input.current.value = ''; counter.current++}}>Clear</button>
        <button onClick={()=>setShowedCounter(counter.current)}>Update counter below</button>
        <span>Clicked 'Clear' button: {showedCounter} times</span>
    </form>
}

const styles = {
    form:
    {
        border: '1px solid grey',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap:'8px',
        width: 'fit-content',
        padding: '16px',
        margin: '0 auto'
    }
}