import React, { useEffect, useRef, useState } from "react";

export function Timer(props) {
    const [seconds, setSeconds] = useState(props.startFrom || 10);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('');
    const intervalRef = useRef(null);

    useEffect(()=>
    {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
              setSeconds((prevSeconds) => {
                if (prevSeconds === 1) {
                  clearInterval(intervalRef.current);
                  setIsRunning(false);
                  setMessage("Time is up!");
                  return 0;
                }
                return prevSeconds - 1;
              });
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning])

    function startTimer()
    {
        if (!isRunning) {
            setMessage('');
            setIsRunning(true);
          }
    }
    function stopTimer()
    {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    }
    function toggleTimer()
    {
      if (isRunning) {
        stopTimer();
      } else {
        startTimer();
      }
    }

    return (
        <div>
            Seconds: {seconds}
            <button onClick={()=>toggleTimer()}>
            {isRunning ? "Stop" : "Start"}
            {message && <p>{message}</p>}
            </button>
        </div>
    );
}
