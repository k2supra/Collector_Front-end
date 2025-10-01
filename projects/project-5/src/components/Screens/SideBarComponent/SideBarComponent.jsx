import { useSelector } from 'react-redux'
import './sideBarComponent.css'

import { Link } from 'react-router-dom'

function SideBarComponent({close}) {
    const currentUser = useSelector(state => state.user.currentUser)
    return <div className="sideBarComponent" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={close}>×</button>
        <Link to='/marketplace'>Marketplace</Link>
        <Link to='/rankings'>Rankings</Link>
        <Link to='/connect-wallet'>Connect a wallet</Link>
        {/* <Link to='/sign-up'>Sign Up</Link> */}
        {!currentUser ? <Link to='/sign-up'>Sign Up</Link>:<Link to={`/artist-page/${currentUser._id}`}>Profile</Link>}
        {currentUser ? <Link to={`/artist-page/${currentUser?._id}/followers`}>Followers</Link>:null}
        {currentUser ? <Link to={`/artist-page/${currentUser?._id}/followings`}>Followings</Link>:null}
    </div>
}

export default SideBarComponent