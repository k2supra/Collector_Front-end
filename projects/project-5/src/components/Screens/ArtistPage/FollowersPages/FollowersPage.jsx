/* eslint-disable react-hooks/exhaustive-deps */
import './followersPages.css'
import { useSelector } from "react-redux";
import Followers from "./Followers/Followers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFullUser } from "../../../RTK/fetchFullUser";
import { useNavigate } from "react-router-dom";

function FollowersPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {currentUser, fullUser} = useSelector(state=>state.user); 

    const isOwner = fullUser?._id === currentUser?._id;
    const userData = isOwner ? fullUser : null; 

    useEffect(() => {
        if (userData?._id) {
            dispatch(fetchFullUser(userData._id))
        }
    }, [dispatch, userData?._id])
    return <div className="followersPage">
        <button 
        onClick={()=>navigate(`/artist-page/${userData?._id}/followings`)} 
        className="shopFollowersOrFollowings"
        disabled={!userData}>Show Followings</button>
        {userData ? <Followers userData={userData}/> : <h1>It is private information :⟯</h1>}
    </div>
}

export default FollowersPage;