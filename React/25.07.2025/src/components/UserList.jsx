/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { memo, useCallback, useEffect, useState } from "react";

const UserItem = memo(function UserItem({user}) {
    console.log(`Rendered UserItem: ${user.name}`);
    const handleUserClick = useCallback((id)=>
    {
        console.log(`User:\n name->${id.name}\n age->${id.age}`);
    }, [])
    return <li key={user.name} className="userItem" style={styles.li} onClick={()=>{handleUserClick(user)}}>
        <h3>Name: {user.name}</h3>
        <span>Age: {user.age}</span>
    </li>
})

export function UserList({userList}) {
    const [likesCounter, setLikesCounter] = useState(0);


    return(<div style={{margin: '20px auto 20px'}}>
        <ul style={styles.ul}>
        {userList.map((u)=>(<UserItem user={u} key={u.name}/>))}
        </ul>
        <span>Likes: {likesCounter}</span>
        <button onClick={()=>setLikesCounter(p=>p+1)}>Likes + 1</button>
    </div>)
}

const styles = 
{
    ul:
    {
        listStyleType: 'none',
        margin: '15px auto 0 auto',
        width: 'fit-content',
    },
    li:
    {
        border: '1px solid grey',
        borderRadius: '16px',
        width: 'fit-content',
        padding: '16px',
        marginBottom: '8px'
    }
}