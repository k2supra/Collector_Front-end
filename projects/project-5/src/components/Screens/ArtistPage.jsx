/* eslint-disable react-hooks/exhaustive-deps */
import BannerAndProfilePicture from "./ArtistPage/BannerAndProfilePicture/BannerAndProfilePicture";
import ArtistInfo from "./ArtistPage/ArtistInfo/ArtistInfo";
import TabBar from "./ArtistPage/TabBar/TabBar";
import NFTCardsSection from './ArtistPage/NFTCardsSection/NFTCardsSection'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { fetchFullUser } from '../RTK/fetchFullUser'
import { fetchBalance } from "../RTK/fetchBalance";

function ArtistPage() {
    const dispatch = useDispatch()
    const {currentUser, fullUser, loading, error} = useSelector(state => state.user)
    const location = useLocation();
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState('created');

    const mockUser = location.state?.user;
    useEffect(()=>
    {
        if (!mockUser && id) {
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
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab}/>
        <NFTCardsSection userData={userData} activeTab={activeTab}/>
    </div>
}

export default ArtistPage;