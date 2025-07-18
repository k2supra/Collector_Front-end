import React from "react";
import './User.css'

const userList = [
    {name:'Bob', age:18, email:'bobthecoder@gmail.com', hobby:'cycling'},
    {name:'Martin', age:25, email:'martinisMe@gmail.com', hobby:'drawing'},
    {name:'Lucie', age:26, email:'ddd_uil@gmail.com', hobby:'PC gaming'},
    {name:'Alexandra', age:18, email:'whoIsIt@gmail.com', hobby:'walking'},
    {name:'Marco', age:47, email:'MarcotheBest@gmail.com', hobby:'coding'},
]

export function User(props) {
    const {name, age, email, hobby} = props;
    return(
        <div className="userCard">
            <h2>{name}: {age}</h2>
            <span>{email}</span>
            <span>Hobby: {hobby}</span>
        </div>
    )
}

export function SetUsersIntoUl({array = userList}) {
    return(
        <>
            {array.map(user => (
                <User {...user}/>
            ))}
        </>
    )
}