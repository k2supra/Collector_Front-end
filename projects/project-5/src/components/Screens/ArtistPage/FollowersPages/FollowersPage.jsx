/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import Followers from "./Followers/Followers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFullUser } from "../../../RTK/fetchFullUser";

function FollowersPage() {
    const dispatch = useDispatch();
    const {currentUser, fullUser} = useSelector(state=>state.user); 
    const [showFollowers, setShowFollowers] = useState(false); 
    const userData = fullUser?._id === currentUser?._id ? fullUser : null; 
    useEffect(()=> 
        { 
            if (userData) { setShowFollowers(true) } 
            else setShowFollowers(false) 
        }, [userData])
    useEffect(()=>
    {
        dispatch(fetchFullUser(currentUser?._id))
    }, [dispatch])
    return <div className="followersPage">
        {showFollowers ? <Followers userData={fullUser}/> : <h1>It is private information :⟯</h1>}
    </div>
}

export default FollowersPage;