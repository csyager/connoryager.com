import {Link} from 'react-router-dom';

function About() {
    return (
        <>
            <div className="container">
                <h1>About me</h1>
                <div className="mb-4">
                    { /* eslint-disable-next-line */ }
                    <code className="bg-secondary mb-3">/* Last updated Apr 1, 2024 */</code>
                    <p>
                        Hi, I'm Connor Yager.  I'm a software engineer at Amazon Web Services, living in New York.  I've been working as a software engineer since 2020, and before that was a C.S. major and Physics minor at UVA's School of Engineering and Applied Sciences.
                    </p>
                    <p>
                        When I'm not working, I enjoy exercise and sports, particularly lacrosse, which I've played for most of my life.  I also spend time gaming and tinkering on personal projects.  I'm fascinated by engineering problems big and small, and am happiest when I'm writing code and building neat stuff.
                    </p>
                    <p>
                        This site is where I will post my thoughts and experiences, as well as information about personal projects that I'm working on.  Please feel free to contact me using any of the methods below, and enjoy exploring the site!
                    </p>
                </div>

                <hr />
                    
                <div className="mb-3">
                <h2>What I'm doing</h2>
                <ul>
                    <li><Link to="/posts/fargate">AWS Fargate</Link></li>
                    <li>Exploring the city</li>
                </ul>
                </div>
                <div className="mb-3">
                    <h2>What I'm reading</h2>
                    <ul>
                        <li>Frank Herbert's <i>Dune</i> series</li>
                        <li><i><a href="https://beej.us/guide/bgnet/" target="_blank" rel="noreferrer">Beej's Guide to Network Programming</a></i></li>
                    </ul>
                </div>
                <div className="mb-3">
                    <h2>What I'm listening to</h2>
                    <ul>
                        <li><i>Wish You Were Here</i> - Pink Floyd</li>
                    </ul>
                </div>
                <div className="mb-3">
                    <h2>Where I'm going</h2>
                    <ul>
                        <li>Stowe, VT</li>
                        <li><Link to="/albums/2024-03-30-cambridge">Cambridge, MA</Link></li>
                    </ul>
                </div>
            </div>
            
        </>
    )
}

export default About;