import Card from './Card';
import greekrhoImage from '../images/posts/greekrho.png';
import reactImage from '../images/posts/react.png';
import reactrouterlogoImage from '../images/posts/reactrouterlogo.png';
import sierpinskyTriangle from '../images/posts/sierpinsky-triangle.png';
import montyHall from '../images/posts/survivor_monty_hall.png';
import redisplusspring from '../images/posts/redis+spring.png';
import k8splusspring from '../images/posts/k8s+spring.png';

function Posts() {
    return (
        <div className="container">
            <h1>Posts</h1>
            <div className="card-columns">
                <Card image={k8splusspring} title={"EKS Part III:  Adding an RDS Instance Using ACK"} filename='posts/k8srds' date="Oct 7, 2022"
                    text='A tutorial adding an RDS instance to the Kubernetes applications built in previous posts, using AWS ACK' />
                <Card image={k8splusspring} title={"EKS Part II:  TLS on the ALB Ingress"} filename='posts/k8stls' date="Aug 29, 2022"
                    text='A tutorial adding TLS and HTTPS termination to the Kubernetes application built in the previous post' />
                <Card image={k8splusspring} title={"Containerizing a Java Spring Boot Service for EKS"} filename='posts/k8sspringboot' date="Aug 23, 2022"
                    text='A tutorial on how to containerize your Java Spring Boot application and run it on AWS EKS' />
                <Card image={redisplusspring} title={"Adding a Redis Cache to Your Spring Boot Service"} filename='posts/springcaching' date="May 1, 2022"
                    text='A short tutorial on how to add Redis caching to your Java Spring service' />
                <Card image={montyHall} title={["Monty Hall and ", <i key="italic">Survivor</i>, "'s Do or Die Game"]} filename='posts/survivormontyhall' date="Dec 2, 2021"
                    text='An explanation of Survivor 41&apos;s Monty Hall Do-or-Die game' />
                <Card image={sierpinskyTriangle} title="Chaos Game" filename='posts/chaosgame' date="Jun 26, 2021"
                    text='A post about the chaos game, and the simulation I wrote to demonstrate it' />
                <Card image="" title="How to Mine Ethereum Using Phoenix Miner and Ethermine" filename='posts/cryptomining' date="Apr 26, 2021"
                    text='A guide for configuring and running PhoenixMiner to easily mine cryptocurrencies' />
                <Card image={greekrhoImage} title="GreekRho Beta Launch" filename='posts/greekrho' date="Sep 19, 2020"
                    text='Announcing the beta launch of our Greek organization management tool, GreekRho' />
                <Card image={reactImage} title="Hosting a React App on S3" filename='posts/reactapps3' date="Apr 25, 2021"
                    text='A short tutorial on how to host a React App on AWS S3' />
                <Card image={reactrouterlogoImage} title="Configuring Routing in a React App with react-router" filename='posts/reactrouter' date="Apr 25, 2021"
                    text='A short tutorial on how to configure routing for a React app using react-router' />
            </div>
        </div>
    )
}

export default Posts;