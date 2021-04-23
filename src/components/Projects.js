import Card from './Card';
import stopmotionImage from '../images/projects/stopmotion.png';

function Projects() {
    return (
        <div className="container">
            <h1>Projects</h1>
            <div className="row">
                <Card image={stopmotionImage} title="Arduino Stop Motion" filename='projects/stopmotion'
                    text='An Arduino Uno-powered stop motion camera that sends images over HTTP to AWS for storage in an S3 Bucket' />
            </div>
        </div>
    )
}

export default Projects;