import FavoriteLinks from './FavoriteLinks';
import RecentPosts from './RecentPosts';
import HighlightedProjects from './HighlightedProjects';
import profile from '../images/profile.jpeg';
import '../style/home.css';

function Home() {
    return (
        <>
            <div className="container">
                <div className="home-intro">
                    <div className="row">
                        <div className="col-xl-4">
                            <img className="img-thumbnail img-fluid img-profile" src={profile} alt="profile"/>
                        </div>
                        <div className="col-xl-8">
                            <h1 className="display-4">Hi, I'm Connor</h1>
                            <p className="tagline">I'm a software engineer living and working in New York.  Welcome to my blog.</p>
                        </div>
                    </div>
                    
                </div>
                
                <hr />
                <RecentPosts />
                <HighlightedProjects />
                <FavoriteLinks />
            </div>
            
        </>
    )
}

export default Home