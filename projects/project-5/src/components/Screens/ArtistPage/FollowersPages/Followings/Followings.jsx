import './followings.css'
import { useNavigate } from 'react-router-dom'

function Followings({userData}) {
    const followings = userData?.followings;
    const navigate = useNavigate()
    return <div className="followings">
        {followings.length === 0 ? <h3>No Followings :/</h3> :
        <ul>
            {followings.map((following, index)=>
            <li key={index} className="following" onClick={()=>navigate(`/artist-page/${following?._id}`)}>
                <img src={following?.avatarUrl} alt="avatar" className='avatar' />
                <div className="artistUsernameAndID">
                    <span className="username">{following?.username}</span>
                    <span className="id">{following?._id}</span>
                </div>
            </li>)}
        </ul>}
    </div>
}

export default Followings