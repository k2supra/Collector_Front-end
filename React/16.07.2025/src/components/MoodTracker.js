import React, { useState } from "react"
import './MoodTracker.css'

export function MoodTracker() {
    const [mood, setMood] = useState('😀')
    const [comment, setComment] = useState("");
    const [block, setBlock] = useState([]);

    const addNewBlock = () =>
    {
      if (!mood || !comment) {
        return;
      }
        setBlock(prev => [...prev, {mood, comment}])
        setComment('')
        setMood();
    }
    function ShowResult({entry})
    {
      const {mood, comment, key} = entry;
        return (
          <div key={key} data-mood={mood} className="block">
            <p>
              Your mood today is: {mood} - {comment}
            </p>
          </div>
        );
    }
    return (
      <div id="moodTracker">
        <div className="controls">
          <button onClick={(e) => setMood(e.target.textContent)}>😀</button>
          <button onClick={(e) => setMood(e.target.textContent)}>😐</button>
          <button onClick={(e) => setMood(e.target.textContent)}>☹️</button>
        </div>
        <input
          value={comment}
          onInput={(e) => setComment(e.target.value)}
          type="text"
          placeholder="What affected your mood?"
        />
        <button onClick={addNewBlock}>Submit</button>
        <div className="results">
          {block.map((entry, index) => (
            <ShowResult entry={entry} key={index} />
          ))}
        </div>
      </div>
    );
}