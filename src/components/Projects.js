import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import GiscusComments from './GiscusComments';
import CatchAll from './CatchAll';

import Card from './Card';
import stopmotionImage from '../images/projects/stopmotion.png';
import powerofdifferenceImage from '../images/projects/powerofdifference.png';
import rtx3070Image from '../images/projects/rtx3070.png';
import scikitLearnImage from '../images/projects/scikit-learn.png';
import powerranksImage from '../images/projects/powerranks.png';

import {
    ChatServer,
    StopMotionProject,
    STSPaperProject,
    PowerOfDifferenceProject,
    RtxStockBotProject,
    TennisMLProject,
    Powerranks
  } from "./projects/Projects";


function ProjectsIndex() {
    return (
        <div className="container">
            <h1 className="display-4">Projects</h1>
            <div className="card-columns">
                <Card title="Chat server" filename='chatserver' date="May 30, 2024"
                    text="A chat server." />
                <Card image={powerranksImage} title="LoL Powerranks Project" filename='powerranks' date="Oct 29, 2023"
                    text="A hackathon project that creates a ranking system for League of Legends teams." />
				<Card image={scikitLearnImage} title="ML Tennis Match Predictor" filename='tennisml' date="Sep 14, 2021"
					text='A python project that uses machine learning to analyze player statistics and past matches to predict the outcome of future ones.' />
                <Card image={rtx3070Image} title="Graphics Card Stock Bot" filename='stockbot' date="Apr 25, 2021"
                    text="A simple stock bot script that checks a few sites for graphics card stock and notifies me if it finds any" />
                <Card image={stopmotionImage} title="Arduino Stop Motion" filename='stopmotion' date="Apr 23, 2021"
                    text='An Arduino Uno-powered stop motion camera that sends images over HTTP to AWS for storage in an S3 Bucket' />
                <Card image={powerofdifferenceImage} title="Power of Difference Survey" filename='powerofdifference' date="Jun 20, 2020"
                    text="My CS Capstone Project, a web-based survey built for a local nonprofit designed to detect and collect data on implicit biases" />
                <Card image="" title="4th Year Thesis" filename='stspaper' date="Jun 21, 2020"
                    text='My fourth year engineering thesis on open source and proprietary software models, with an emphasis on AI development' />
            </div>
        </div>
    )
}

function ProjectLayout(props) {
    return (
        <div className="container">
            {props.children}
            <hr />
            <div id="comments">
            <GiscusComments darkMode={props.darkMode} />
            </div>
        </div>
    )
}

export default function Projects(props) {
    const pathname = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])
    return (
        <Routes>
            <Route index element={<ProjectsIndex />} />
            <Route path="stopmotion" element={<ProjectLayout darkMode={props.darkMode}><StopMotionProject /></ProjectLayout>} />
            <Route path="stspaper" element={<ProjectLayout darkMode={props.darkMode}><STSPaperProject /></ProjectLayout>} />
            <Route path="powerofdifference" element={<ProjectLayout darkMode={props.darkMode}><PowerOfDifferenceProject/></ProjectLayout>} />
            <Route path="stockbot" element={<ProjectLayout darkMode={props.darkMode}><RtxStockBotProject /></ProjectLayout>} />
            <Route path="tennisml" element={<ProjectLayout darkMode={props.darkMode}><TennisMLProject /></ProjectLayout>} />
            <Route path="powerranks" element={<ProjectLayout darkMode={props.darkMode}><Powerranks /></ProjectLayout>} />
            <Route path="chatserver" element={<ProjectLayout darkMode={props.darkMode}><ChatServer /></ProjectLayout>} />
            <Route path="*" element={<CatchAll />} />
        </Routes>
    )
}
