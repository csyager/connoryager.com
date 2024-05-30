import { PostList, PostListEntry } from './PostList';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import GiscusComments from "./GiscusComments";
import CatchAll from './CatchAll';
import '../style/post.css';

import {
    GreekRhoPost,
    ReactAppS3Post,
    ReactRouterPost,
    CryptoMiningPost,
    ChaosGamePost,
    SurvivorMontyHall,
    SpringCaching,
    K8sSpringboot,
    K8sTLS,
    K8sPostgresPost,
    FargatePost
  } from './posts/Posts';

function PostsIndex() {
    return (
        <div className="container">
            <h1 className="display-4">Posts</h1>

            <div>
                <PostList title="2024">
                    <PostListEntry title="Serverless Containers on Fargate" link="fargate" date="Apr 2, 2024" />
                </PostList>
                <PostList title="2022">
                    <PostListEntry title="EKS Part III:  Adding an RDS Instance Using ACK" link="k8srds" date="Oct 7, 2022" />
                    <PostListEntry title={"EKS Part II:  TLS on the ALB Ingress"} link='k8stls' date="Aug 29, 2022" />
                    <PostListEntry title={"Containerizing a Java Spring Boot Service for EKS"} link='k8sspringboot' date="Aug 23, 2022" />
                    <PostListEntry title={"Adding a Redis Cache to Your Spring Boot Service"} link='springcaching' date="May 1, 2022" />
                </PostList>
                <PostList title="2021">
                    <PostListEntry title={["Monty Hall and ", <i key="italic">Survivor</i>, "'s Do or Die Game"]} link='survivormontyhall' date="Dec 2, 2021" />
                    <PostListEntry title="Chaos Game" link='chaosgame' date="Jun 26, 2021" />
                    <PostListEntry title="How to Mine Ethereum Using Phoenix Miner and Ethermine" link='cryptomining' date="Apr 26, 2021" />
                    <PostListEntry title="Hosting a React App on S3" link='reactapps3' date="Apr 25, 2021" />
                    <PostListEntry title="Configuring Routing in a React App with react-router" link='reactrouter' date="Apr 25, 2021" />
                </PostList>
                <PostList title="2020">   
                    <PostListEntry title="GreekRho Beta Launch" link='greekrho' date="Sep 19, 2020"  />
                </PostList>
            </div>
        </div>
    )
}

function PostLayout(props) {
    
    
    return(
        <div className="container">
            {props.children}
            <hr />
            <GiscusComments darkMode={props.darkMode} />
        </div>
    )
}

export default function Posts(props) {
    // reset scroll on page change
    const pathname = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])
    return (
        <Routes>
            <Route index element={<PostsIndex />} />
            <Route path="greekrho" element={<PostLayout darkMode={props.darkMode}><GreekRhoPost /></PostLayout>} />
            <Route path="reactapps3" element={<PostLayout darkMode={props.darkMode}><ReactAppS3Post /></PostLayout>} />
            <Route path="reactrouter" element={<PostLayout darkMode={props.darkMode}><ReactRouterPost /></PostLayout>} />
            <Route path="cryptomining" element={<PostLayout darkMode={props.darkMode}><CryptoMiningPost /></PostLayout>} />
            <Route path="chaosgame" element={<PostLayout darkMode={props.darkMode}><ChaosGamePost /></PostLayout>} />
            <Route path="survivormontyhall" element={<PostLayout darkMode={props.darkMode}><SurvivorMontyHall /></PostLayout>} />
            <Route path="springcaching" element={<PostLayout darkMode={props.darkMode}><SpringCaching /></PostLayout>} />
            <Route path="k8sspringboot" element={<PostLayout darkMode={props.darkMode}><K8sSpringboot /></PostLayout>} />
            <Route path="k8stls" element={<PostLayout darkMode={props.darkMode}><K8sTLS /></PostLayout>} />
            <Route path="k8srds" element={<PostLayout darkMode={props.darkMode}><K8sPostgresPost /></PostLayout>} />
            <Route path="fargate" element={<PostLayout darkMode={props.darkMode}><FargatePost /></PostLayout>} />
            <Route path="*" element={<CatchAll />} />
        </Routes>
    )
}