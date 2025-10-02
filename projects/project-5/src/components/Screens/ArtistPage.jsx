import BannerAndProfilePicture from "./ArtistPage/BannerAndProfilePicture/BannerAndProfilePicture";
import ArtistInfo from "./ArtistPage/ArtistInfo/ArtistInfo";
import TabBar from "./ArtistPage/TabBar/TabBar";
import NFTCardsSection from './ArtistPage/NFTCardsSection/NFTCardsSection'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchFullUser } from '../RTK/fetchFullUser'
import { fetchBalance } from "../RTK/fetchBalance";
import { setBalance } from "../RTK/userSlice";

function ArtistPage() {
    const dispatch = useDispatch()
    const {currentUser, fullUser, loading, error, balance} = useSelector(state => state.user)
    const location = useLocation();
    const { id } = useParams()
    // const [showLogout, setShowLogout] = useState(false);
    // const navigate = useNavigate()

    const mockUser = location.state?.user;

    console.log('CurrentUser',currentUser, '\nFullUser',fullUser, '\nMockUser', mockUser, '\n\nbalance', balance);

    useEffect(()=>
    {
        if (!mockUser && id) {
            // setShowLogout(true)
            dispatch(fetchFullUser(id));
        }
    },[dispatch, id, mockUser])
    useEffect(()=>
    {
        if (currentUser) {    
            dispatch(fetchBalance(currentUser._id))  
        }
    }, [dispatch])
    const userData = mockUser || fullUser


    return <div className="artistPage">
        <BannerAndProfilePicture userData={userData}/>
        <ArtistInfo userData={userData} loading={loading} error={error}/>
        <TabBar/>
        <NFTCardsSection userData={userData}/>
    </div>
}

export default ArtistPage;