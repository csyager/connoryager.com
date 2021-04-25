import Card from './Card';
import stopmotionImage from '../images/projects/stopmotion.png';
import powerofdifferenceImage from '../images/projects/powerofdifference.png';

function Projects() {
    return (
        <div className="container">
            <h1>Projects</h1>
            <div className="card-columns">
                <Card image={stopmotionImage} title="Arduino Stop Motion" filename='projects/stopmotion' date="Apr 23, 2021"
                    text='An Arduino Uno-powered stop motion camera that sends images over HTTP to AWS for storage in an S3 Bucket' />
                <Card image="" title="4th Year Thesis" filename='projects/stspaper' date="Jun 21, 2020"
                    text='My fourth year engineering thesis on open source and proprietary software models, with an emphasis on AI development' />
                <Card image={powerofdifferenceImage} title="Power of Difference Survey" filename='projects/powerofdifference' date="Jun 20, 2020"
                    text="My CS Capstone Project, a web-based survey built for a local nonprofit designed to detect and collect data on implicit biases" />
            </div>
        </div>
    )
}

export default Projects;