import profilePic from '../images/profile.jpeg';
import FavoriteLinks from './FavoriteLinks';

function Home() {
    return (
        <>
            <div className="container container-headshot">
                <img src={profilePic} alt="" className="img-thumbnail img-fluid headshot" />
            </div>
            <div className="container bio">
                <div className="row">
                    
                    <div className="col-md-8 col-lg-9 bio-col">
                        <p>
                            Hi, I'm Connor Yager.  I'm a software development engineer for Amazon Web Services, living in New York, NY.  I'm a 2020 graduate from the University of Virginia's School of Engineering and Applied Science, with a major in Computer Science and a minor in Physics.  Before attending UVA, I lived with my family in Virginia Beach, VA and graduated from Norfolk Academy.
                        </p>
                        <p>
                            I currently work for Amazon Web Services in New York City, where I work on services supporting our serverless containers offerings, better known by its marketing name Fargate.  I have a passion for problem-solving and building robust, value-generating applications.  Outside of work, I enjoy exercise and sports, particularly lacrosse, which I've played for most of my life.  I also spend time gaming and tinkering on personal projects.
                        </p>
                        <p>
                            This site is where I will post my thoughts and experiences, as well as information about personal projects that I'm working on.  Please feel free to contact me using any of the methods below, and enjoy exploring the site!
                        </p>
                    </div>
                    <div className="col-md-4 col-lg-3">
                        <FavoriteLinks />
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Home