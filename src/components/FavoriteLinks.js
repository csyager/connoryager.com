import {
    faExternalLinkAlt
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FavoriteLinks() {

    return(
        <div className="favorite-links-container">
            <h3>Connor's Favorite Links</h3>
            <hr />
            <ul className="favorite-links-ul">
                <li>
                    <a href="https://www.reddit.com/r/UVA/comments/wtmgwr/from_2000_feet_above_grounds/?utm_source=share&utm_medium=ios_app&utm_name=iossmf" target="_blank" rel="noreferrer">View from 2000 feet above UVA  <FontAwesomeIcon icon={faExternalLinkAlt} /></a>
                </li>
                <li>
                    <a href="https://www.craiyon.com/" target="_blank" rel="noreferrer">Craiyon - "AI model drawing images from any prompt" <FontAwesomeIcon icon={faExternalLinkAlt} /></a>
                </li>
                <li>
                    <a href="https://sperityventures.com/2012/06/the-seven-hills-of-richmond/" target="_blank" rel="noreferrer">Seven Hills of Richmond <FontAwesomeIcon icon={faExternalLinkAlt} /></a>
                </li>
            </ul>
        </div>
    )
}

export default FavoriteLinks;