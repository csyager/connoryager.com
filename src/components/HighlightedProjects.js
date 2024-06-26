import { Link } from "react-router-dom";
// eslint-disable-next-line
import masonry from "masonry-layout";

function HighlightedProjectEntryButton(props) {
    if (props.external) {
        return (
            <a className="btn btn-secondary highlighted-project-button" href={props.to} target="_blank" rel="noreferrer">{props.children}</a>
        )
    } else {
        return (
            <Link className="btn btn-secondary highlighted-project-button" to={props.to}>{props.children}</Link>
        )
    }
    
}

function HighlightedProjectEntry(props) {
    return (
        <div className="card highlighted-projects-card">
            <div className="card-body">
                <h6 className="text-muted">{props.date}</h6>
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text highlighted-projects-card-text">{props.text}</p>
                <div className="highlighted-projects-buttons">
                    {props.children}
                </div>
                
            </div>
        </div>
    )
}

export default function HighlightedProjects() {
    return (
        <div className="mt-3">
            <div className="row justify-content-between mb-3">
                <div className="col-8">
                    <h2>Highlighted Projects</h2>
                </div>
                <div className="col-4">
                    <Link to="projects" className="btn btn-secondary float-right">View all</Link>
                </div>
            </div>
            <div className="row" data-masonry='{"percentPosition": true, "horizontalOrder": true}'>
                <div className="col-12 col-lg-6 mb-3">
                    <HighlightedProjectEntry
                        date="2024"
                        title="We're So Back - A Mood-Sharing Web Application"
                        text="React and AWS SAM web application for sharing your mood with friends"
                    >
                        <HighlightedProjectEntryButton to="projects/soback">Article</HighlightedProjectEntryButton>
                        <HighlightedProjectEntryButton to="https://github.com/csyager/we-are-so-back" external>Source code</HighlightedProjectEntryButton>
                        <HighlightedProjectEntryButton to="https://soback.connoryager.com" external>App Link</HighlightedProjectEntryButton>
                    </HighlightedProjectEntry>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                    <HighlightedProjectEntry
                        date="2024"
                        title="Socket-Based Chat Server on Raspberry Pi"
                        text="A lightweight chatroom application written in C and using Unix sockets and running on a Raspberry Pi Nano."
                    >
                        <HighlightedProjectEntryButton to="projects/chatserver">Article</HighlightedProjectEntryButton>
                        <HighlightedProjectEntryButton to="https://github.com/csyager/chat-server" external>Source code</HighlightedProjectEntryButton>
                    </HighlightedProjectEntry>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                <HighlightedProjectEntry 
                    date="2024" 
                    title="LoL Powerranking Application" 
                    text="A hackathon entry for ranking League of Legends teams, running on Fargate."    
                >
                    <HighlightedProjectEntryButton to="projects/powerranks">Article</HighlightedProjectEntryButton>
                    <HighlightedProjectEntryButton to="https://www.youtube.com/watch?v=fPVPXeFQOp8" external>Demo</HighlightedProjectEntryButton>
                    <HighlightedProjectEntryButton to="https://github.com/csyager/lolpowerranks-ranking-service" external>Source code</HighlightedProjectEntryButton>
                </HighlightedProjectEntry>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                <HighlightedProjectEntry
                    date="2020"
                    title="GreekRho"
                    text="A web application for student organizations, to manage recruitment, event planning, and document sharing."
                >
                    <HighlightedProjectEntryButton to="https://www.greek-rho.com" external>Product Home</HighlightedProjectEntryButton>
                    <HighlightedProjectEntryButton to="https://github.com/csyager/greeklink-core" external>Source code</HighlightedProjectEntryButton>
                </HighlightedProjectEntry>
                </div>
            </div>
        </div>
        
    )
}