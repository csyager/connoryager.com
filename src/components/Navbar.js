import '../style/navbar.css';
import {
    Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {DarkModeToggle} from './DarkModeToggle';
import icon from '../images/icon.png';

import {
    faBars
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavLink(props) {
    const isActive = "/" + useLocation()["pathname"].split("/")[1] === props.to;
    const className = isActive ? 'nav-link active' : 'nav-link';
    var shouldIncludeDataToggle = window.innerWidth < 992;
    let collapseProps = {
        'data-toggle': 'collapse',
        'data-target': '#navbarSupportedContent',
    };
    if (!shouldIncludeDataToggle) {
        collapseProps['data-target'] = null;
        collapseProps['data-toggle'] = null;
    }

    return(
        <Link className={className} {...collapseProps} {...props} >
            {props.children}
        </Link>
    );
}

function Navbar(props) {
    return (
        <>
        <nav className="navbar navbar-expand-lg px-4 px-md-3">
            <Link to="/" className="navbar-brand" href="home.html">
                <img src={icon} className="navbar-icon" width="35" height="35" alt="" />
                connoryager.com
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <FontAwesomeIcon icon={faBars} aria-hidden={true} size="lg" className="navbar-toggler-icon"/>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/posts">Posts</NavLink>
                    </li> 
                    <li className="nav-item">
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/projects">Projects</NavLink>
                    </li>  
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mt-auto mb-auto">
                        <button className="btn btn-link subscribe-modal-btn" data-toggle="modal" data-target="#subscribeModal">Subscribe to email newsletter</button>
                    </li>
                    <li className="nav-item mt-auto mb-auto">
                        <DarkModeToggle darkMode={props.darkMode} setDarkMode={props.setDarkMode}/>
                    </li>
                </ul>

            </div>
        </nav>
        </>
    );
}

export default Navbar;