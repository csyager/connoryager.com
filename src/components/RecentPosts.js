import { PostList, PostListEntry } from "./PostList";

export default function RecentPosts() {
    return (
        <PostList title="Recent Posts" viewAll>
            <PostListEntry title="EKS Part III:  Adding an RDS Instance Using ACK" date="October 2022" link='posts/k8srds'/>
            <PostListEntry title="EKS Part II:  TLS on the ALB Ingress" date="August 2022" link='posts/k8stls' />
            <PostListEntry title="EKS Part I:  Containerizing a Java Spring Boot Service for EKS" date="August 2022" link='posts/k8sspringboot' />
            <PostListEntry title="Adding a Redis Cache to Your Spring Boot Service" date="May 2022" link='posts/springcaching' />
            <PostListEntry title={<>"Monty Hall and <i>Survivor</i>'s Do or Die Game"</>} date="December 2021" link='posts/survivormontyhall' />
        </PostList>
    )
}