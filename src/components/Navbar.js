import {
    Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom';

function NavLink(props) {
    var isActive = useLocation()["pathname"] === props.to;
    var className = isActive ? 'nav-link active' : 'nav-link';
    return(
        <Link className={className} {...props}>
            {props.children}
        </Link>
    );
}

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 px-md-3">
            <Link to="/" className="navbar-brand" href="home.html">Connor Yager</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
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
                        <NavLink to="/projects">Projects</NavLink>
                    </li>  
                </ul>
                <form className="form-inline my-2 my-lg-0" method="get" action="search.html">
                    <input name="query" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;