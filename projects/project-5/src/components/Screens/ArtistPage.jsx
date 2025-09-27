import BannerAndProfilePicture from "./ArtistPage/BannerAndProfilePicture/BannerAndProfilePicture";
import ArtistInfo from "./ArtistPage/ArtistInfo/ArtistInfo";
import TabBar from "./ArtistPage/TabBar/TabBar";
import NFTCardsSection from './ArtistPage/NFTCardsSection/NFTCardsSection'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchFullUser } from '../RTK/fetchFullUser'

function ArtistPage(params) {
    const dispatch = useDispatch()
    const {currentUser, fullUser, loading, error} = useSelector(state => state.user)
    const location = useLocation();
    const { id } = useParams()
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate()

    const mockUser = location.state?.user;

    console.log('CurrentUser',currentUser, '\nFullUser',fullUser, '\nMockUser', mockUser);

    useEffect(()=>
    {
        if (!mockUser && id) {
            setShowLogout(true)
            dispatch(fetchFullUser(id));
        }
    },[dispatch, id, mockUser])

    const userData = mockUser || fullUser


    return <div className="artistPage">
        <BannerAndProfilePicture/>
        <ArtistInfo userData={userData} loading={loading} error={error}/>
        <TabBar/>
        <NFTCardsSection userData={userData}/>
    </div>
}

export default ArtistPage;