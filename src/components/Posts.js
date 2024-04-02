import { PostList, PostListEntry } from './PostList';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import '../style/post.css';

function PostsIndex() {
    return (
        <div className="container">
            <h1>Posts</h1>

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

function Posts() {
    // reset scroll on page change
    const pathname = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    return (
        <Routes>
            <Route index element={<PostsIndex />} />
            <Route path="greekrho" element={<GreekRhoPost />} />
            <Route path="reactapps3" element={<ReactAppS3Post />} />
            <Route path="reactrouter" element={<ReactRouterPost />} />
            <Route path="cryptomining" element={<CryptoMiningPost />} />
            <Route path="chaosgame" element={<ChaosGamePost />} />
            <Route path="survivormontyhall" element={<SurvivorMontyHall />} />
            <Route path="springcaching" element={<SpringCaching />} />
            <Route path="k8sspringboot" element={<K8sSpringboot />} />
            <Route path="k8stls" element={<K8sTLS />} />
            <Route path="k8srds" element={<K8sPostgresPost />} />
            <Route path="fargate" element={<FargatePost />} />
        </Routes>
    )
}

export default Posts;