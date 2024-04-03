import { PostList, PostListEntry } from './PostList';
import '../style/post.css';

export default function PostsIndex() {
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