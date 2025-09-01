import PropTypes from 'prop-types'


export function UserCard({user}) {
    return <div>
        Name: {user.name} - Age: {user.age} - Email: {user.email}
    </div>
}

UserCard.propTypes = 
{
    user: PropTypes.shape(
        {
            name: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
            email: PropTypes.string.isRequired
        }
    )
}