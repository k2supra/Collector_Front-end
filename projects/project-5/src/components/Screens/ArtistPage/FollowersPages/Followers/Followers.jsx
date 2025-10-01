import './followers.css'
import { useNavigate } from 'react-router-dom'

function Followers({userData}) {
    const followers = userData?.followers;
    const navigate = useNavigate()
    return <div className="followers">
        {followers.length === 0 ? <h3>No Followers :/</h3> :
        <ul>
            {followers.map((follower, index)=>
            <li key={index} className="follower" onClick={()=>navigate(`/artist-page/${follower?._id}`)}>
                <img src={follower?.avatarUrl} alt="avatar" className='avatar' />
                <div className="artistUsernameAndID">
                    <span className="username">{follower?.username}</span>
                    <span className="id">{follower?._id}</span>
                </div>
            </li>)}
        </ul>}
    </div>
}

export default Followers