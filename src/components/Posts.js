import { PostList, PostListEntry } from './PostList';

function Posts() {
    return (
        <div className="container">
            <h1>Posts</h1>

            <div>
                <PostList title="2022">
                    <PostListEntry title="EKS Part III:  Adding an RDS Instance Using ACK" link="posts/k8srds" date="Oct 7, 2022" 
                        desc="Test" />
                    <PostListEntry title={"EKS Part II:  TLS on the ALB Ingress"} link='posts/k8stls' date="Aug 29, 2022"
                        desc='A tutorial adding TLS and HTTPS termination to the Kubernetes application built in the previous post' />
                    <PostListEntry title={"Containerizing a Java Spring Boot Service for EKS"} link='posts/k8sspringboot' date="Aug 23, 2022"
                        desc='A tutorial on how to containerize your Java Spring Boot application and run it on AWS EKS' />
                    <PostListEntry title={"Adding a Redis Cache to Your Spring Boot Service"} link='posts/springcaching' date="May 1, 2022"
                        desc='A short tutorial on how to add Redis caching to your Java Spring service' />
                </PostList>
                <PostList title="2021">
                    <PostListEntry title={["Monty Hall and ", <i key="italic">Survivor</i>, "'s Do or Die Game"]} link='posts/survivormontyhall' date="Dec 2, 2021"
                        desc='An explanation of Survivor 41&apos;s Monty Hall Do-or-Die game' />
                    <PostListEntry title="Chaos Game" link='posts/chaosgame' date="Jun 26, 2021"
                        desc='A post about the chaos game, and the simulation I wrote to demonstrate it' />
                    <PostListEntry title="How to Mine Ethereum Using Phoenix Miner and Ethermine" link='posts/cryptomining' date="Apr 26, 2021"
                    desc='A guide for configuring and running PhoenixMiner to easily mine cryptocurrencies' />
                    <PostListEntry title="Hosting a React App on S3" link='posts/reactapps3' date="Apr 25, 2021"
                        desc='A short tutorial on how to host a React App on AWS S3' />
                    <PostListEntry title="Configuring Routing in a React App with react-router" link='posts/reactrouter' date="Apr 25, 2021"
                        desc='A short tutorial on how to configure routing for a React app using react-router' />
                </PostList>
                <PostList title="2020">   
                    <PostListEntry title="GreekRho Beta Launch" link='posts/greekrho' date="Sep 19, 2020"
                        desc='Announcing the beta launch of our Greek organization management tool, GreekRho' />
                </PostList>
            </div>
        </div>
    )
}

export default Posts;