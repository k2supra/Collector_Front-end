import './heading.css'

import searchIcon from '../../../../assets/images/searchIcon.png'

function Heading() {
    return <div className="heading">
        <div className="headingData">
            <h4>Browse Marketplace</h4>
            <span>Browse through more than 50k NFTs on the NFT Marketplace.</span>
        </div>
        <div className="inputWrapper">
            <input type="text" placeholder='Search your favourite NFTs'/>
            <img src={searchIcon} alt="" />
        </div>
    </div>
}

export default Heading