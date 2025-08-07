import {Link} from 'react-router-dom';
import {
    faFilePdf
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Resume from './Resume.pdf';

function About() {
    return (
        <>
            <div className="container">
                <h1 className="display-4">About me</h1>
                <div className="mb-4">
                    { /* eslint-disable-next-line */ }
                    <code className="bg-secondary mb-3">/* Last updated Aug 7, 2025 */</code>
                    <p>
                        Hi, I'm Connor Yager.  I'm a software engineer at Amazon Web Services, living in New York.  I've been working as a software engineer since 2020, and before that was a C.S. major and Physics minor at UVA's School of Engineering and Applied Sciences.
                    </p>
                    <p>
                        When I'm not working, I enjoy exercise and sports, particularly lacrosse, which I've played for most of my life.  I also spend time gaming and tinkering on personal projects.  I'm fascinated by engineering problems big and small, and am happiest when I'm writing code and building neat stuff.
                    </p>
                    <p>
                        This site is where I will post my thoughts and experiences, as well as information about personal projects that I'm working on.  Please feel free to contact me using any of the methods below, and enjoy exploring the site!
                    </p>
                    <a className="btn btn-primary" href={Resume} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFilePdf} />&nbsp;&nbsp; Click here to view my resume</a>
                </div>

                <hr />
                    
                <div className="mb-3">
                <h2>What I'm doing</h2>
                <ul>
					<li><Link to="https://github.com/csyager/ncaa-stats-parser">Utility for scraping statistics</Link> from the NCAA stats website - what to do with this is coming soon.</li>
					<li>Building compute platform for <Link to="https://aws.amazon.com/bedrock/agentcore/">Bedrock AgentCore</Link></li>
                    <li><Link to="/posts/fargate">AWS Fargate</Link></li>
                    <li>Exploring the city</li>
                </ul>
                </div>
                <div className="mb-3">
                    <h2>What I'm reading</h2>
                    <ul>
						<li><i>The Count of Monte Cristo</i>, by Alexandre Dumas</li>
                        <li>Frank Herbert's <i>Dune</i> series</li>
                        <li><i><a href="https://beej.us/guide/bgnet/" target="_blank" rel="noreferrer">Beej's Guide to Network Programming</a></i></li>
                    </ul>
                </div>
                <div className="mb-3">
                    <h2>What I'm listening to</h2>
                    <ul>
						<li>Still Woozy</li>
                        <li><i>Wish You Were Here</i> - Pink Floyd</li>
                    </ul>
                </div>
                <div className="mb-3">
                    <h2>Where I'm going</h2>
                    <ul>
						<li>Mont Tremblant, QC</li>
                        <li>Stowe, VT</li>
                        <li><Link to="/albums/2024-03-30-cambridge">Cambridge, MA</Link></li>
                    </ul>
                </div>
            </div>
            
        </>
    )
}

export default About;
