import './bannerAndProfilePicture.css'

function BannerAndProfilePicture({userData}) {
    return <div className="bannerAndProfilePicture">
        <img src={userData?.bannerUrl} alt="banner" className="banner"/>
        <div className="profileImage">
            <img src={userData?.avatarUrl} alt="avatar" className="avatar circle"/>
        </div>
    </div>
}

export default BannerAndProfilePicture;