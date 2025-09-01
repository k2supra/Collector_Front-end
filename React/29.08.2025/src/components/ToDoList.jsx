import PropTypes from "prop-types";

export function ToDoList({todos}) {
    return <div>
        {todos.map((i, index)=><span key={index}>{i}</span>)}
    </div>
}

ToDoList.propTypes = 
{
    todos: PropTypes.arrayOf(PropTypes.string).isRequired
}