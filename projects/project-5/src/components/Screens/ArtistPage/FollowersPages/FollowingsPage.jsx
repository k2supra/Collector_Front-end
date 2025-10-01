import Followings from "./Followings/Followings";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFullUser } from "../../../RTK/fetchFullUser";

function FollowingsPage() {
    const dispatch = useDispatch();
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
        {showFollowings ? <Followings userData={fullUser}/> : <h1>It is private information :⟯</h1>}
    </div>
}

export default FollowingsPage;