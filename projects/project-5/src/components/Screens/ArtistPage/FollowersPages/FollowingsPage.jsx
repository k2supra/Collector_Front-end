/* eslint-disable react-hooks/exhaustive-deps */
import './followersPages.css'

import Followings from "./Followings/Followings";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFullUser } from "../../../RTK/fetchFullUser";
import { useNavigate } from "react-router-dom";

function FollowingsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {currentUser, fullUser} = useSelector(state=>state.user); 
    const [showFollowings, setShowFollowings] = useState(false); 
    const userData = fullUser?._id === currentUser?._id ? fullUser : null; 
    useEffect(()=> 
        { 
            if (userData) { setShowFollowings(true) } 
            else setShowFollowings(false) 
        }, [userData])
    useEffect(()=>
    {
        dispatch(fetchFullUser(currentUser?._id))
    }, [dispatch])
    return <div className="followingsPage">
        <button onClick={()=>navigate(`/artist-page/${userData?._id}/followers`)} className="shopFollowersOrFollowings">Show Followers</button>
        {showFollowings ? <Followings userData={fullUser}/> : <h1>It is private information :⟯</h1>}
    </div>
}

export default FollowingsPage;