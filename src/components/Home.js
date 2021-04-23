import profilePic from '../images/profile.jpeg';

function Home() {
    return (
        <>
            <div className="container container-headshot">
                <img src={profilePic} alt="" className="img-thumbnail img-fluid headshot" />
            </div>
            <div className="container bio">
                <p>
                    Hi, I'm Connor Yager.  I'm a software engineer living in Richmond, VA.  
                    I'm a 2016 graduate from the University of Virginia's School of Engineering and Applied Science, with a major in Computer Science and a minor in Physics.
                    Before attending UVA, I lived with my family in Virginia Beach, VA and graduated from Norfolk Academy.
                </p>
                <p>
                    I currently work for a tech consulting firm out of Richmond, where I specialize in developing web solutions that meet the varied needs of our enterprise clients.
                    I have a passion for problem-solving and building robust, value-generating applications that not only look and feel like a professional, polished product to the user, but are also supported by a powerful and scalable backend architecture.
                </p>
                <p>
                    This site is where I will post my thoughts and experiences, as well as information about personal projects that I'm working on.  Please feel free to contact me using any of
                    the methods below, and enjoy exploring the site!
                </p>
            </div>
        </>
    )
}

export default Home