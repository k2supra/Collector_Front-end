/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";

export function Form(params) {
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('male');
    const [usedReact, setUsedReact] = useState(false);
    const [counter, setCounter] = useState(-1);
    const [isSubmited, setIsSubmited] = useState(false);
    const message = 'Lol, you can\'t make a decision'
    const didMount = useRef(null);

    function updateCounter()
    {
        setCounter(c => c+1);
    }


    useEffect(()=>
    {
        if (isSubmited) {
            setIsSubmited(false)
        }
        if (age === 0) return;

        let debounceTimeout = setTimeout(updateCounter, 500);

        return () => clearTimeout(debounceTimeout)
    }, [age])

    useEffect(()=>
    {
        if (didMount.current) {
            updateCounter();
            if (isSubmited) {
                setIsSubmited(false)
            }
        }
        else didMount.current = true;
    }, [gender, usedReact])

    

    function handleInputChange(e) {
        setAge(+e.target.value);
    }

    function handleSelectChange(e) {
        setGender(e.target.value);
    }

    function handleRadioChange(e)
    {
        setUsedReact(e.target.value === 'Yes');
    }

    function DisplayFinalMessage()
    {
        return <p>You are {age} years old, {gender}. Have used React: {usedReact ? 'Yes' : 'No'}</p>
    }

    return(
        <div style={styles.container}>
            <form style={styles.form} onSubmit={(e)=>{e.preventDefault(); setIsSubmited(true); setCounter(0)}}>
                <p>Changed data <strong>{counter}</strong> times</p>
                <input
                type="number"
                onInput={handleInputChange}
                />
                <select onChange={handleSelectChange}>
                    <option>male</option>
                    <option>female</option>
                    <option>attack helicopter</option>
                </select>
                <label>Have you used React? 
                    <input 
                    type="radio" 
                    name="usedReact"
                    onChange={handleRadioChange}
                    checked = {usedReact === true}
                    value='Yes'
                    />Yes
                    <input 
                    type="radio" 
                    name="usedReact"
                    onChange={handleRadioChange}
                    checked = {usedReact === false}
                    value='No'
                    />No
                </label>
                <button>Send</button>
            </form>
            {counter >= 10 && <p>{message}</p>}
            {isSubmited && <DisplayFinalMessage/>}
        </div>
    )
}

const styles = 
{
    container:
    {
        width: 'fit-content',
        margin: '0 auto 15px'
    },
    form:
    {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        border: '1px solid lightgrey',
        borderRadius: '16px',
        width: 'fit-content',
        margin: '0 auto',
        padding: '16px'
    }
}