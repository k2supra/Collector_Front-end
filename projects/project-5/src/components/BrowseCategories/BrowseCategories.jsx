import './browseCategories.css'

import categoryImage1 from '../../assets/images/category1.png'
import categoryImage2 from '../../assets/images/category2.png'
import categoryImage3 from '../../assets/images/category3.png'
import categoryImage4 from '../../assets/images/category4.png'
import categoryImage5 from '../../assets/images/category5.png'
import categoryImage6 from '../../assets/images/category6.png'
import categoryImage7 from '../../assets/images/category7.png'
import categoryImage8 from '../../assets/images/category8.png'

function BrowseCategories() {
    return <div className="browseCategories">
        <h4 className="headline">Browse Categories</h4>
        <div className="categoryCardsGrid">
            <div className="categoryCard">
                <img src={categoryImage1} alt="categoryImage1" />
                <span>Art</span>
            </div>
            <div className="categoryCard">
                <img src={categoryImage2} alt="categoryImage1" />
                <span>Collectibles</span>
            </div>
            <div className="categoryCard">
                <img src={categoryImage3} alt="categoryImage1" />
                <span>Music</span>
            </div>
            <div className="categoryCard">
                <img src={categoryImage4} alt="categoryImage1" />
                <span>Photographhy</span>
            </div>
            <div className="categoryCard">
                <img src={categoryImage5} alt="categoryImage1" />
                <span>Video</span>
            </div>
            <div className="categoryCard">
                <img src={categoryImage6} alt="categoryImage1" />
                <span>Utility</span>
            </div>
            <div className="categoryCard">
                <img src={categoryImage7} alt="categoryImage1" />
                <span>Sport</span>
            </div>
            <div className="categoryCard">
                <img src={categoryImage8} alt="categoryImage1" />
                <span>Virtual Worlds</span>
            </div>
        </div>
    </div>
}

export default BrowseCategories;