import k8sSpringbootImage from '../../images/posts/k8s+spring.png';
import CodeSnippet from '../CodeSnippet';

const monitoringController = `package com.doctransfer.userservice.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/monitoring")
public class MonitoringController {

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("OK");
    }
}
`;

const clusterTemplate = `apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
name: application-cluster
region: us-east-1

nodeGroups:
- name: ng-1-springboot
    labels: { role: workers }
    instanceType: t3.small
    desiredCapacity: 3
    privateNetworking: true
`;

const deploymentTemplate = `apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: service-name
  name: service-name
spec:
  replicas: 3
  selector:
    matchLabels:
      app: service-name
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: service-name
    spec:
      containers:
      - image: {AWS ACCOUNT ID}.dkr.ecr.us-east-1.amazonaws.com/{REPOSITORY NAME}:latest
        name: service-name
        resources:
          limits:
            cpu: 500m
            memory: 800Mi
          requests:
            cpu: 200m
            memory: 600Mi
status: {}
`;

const serviceTemplate =`apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: service-name
  name: service-name
spec:
  ports:
  - name: 80-8080
    port: 80
    protocol: TCP
    targetPort: 8080
  selector:
    app: service-name
  type: NodePort
status:
  loadBalancer: {}
`;

const loadBalancerControllerScript = `#!/bin/bash

# install oidc provider
eksctl utils associate-iam-oidc-provider \\
    --region { REGION } \\
    --cluster { CLUSTER NAME } \\
    --approve

# create iam policy for load balancer controller
curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.4.3/docs/install/iam_policy.json
aws iam create-policy \\
    --policy-name AWSLoadBalancerControllerIAMPolicy \\
    --policy-document file://iam_policy.json
rm iam_policy.json

# create service account for load balancer controller
eksctl create iamserviceaccount \\
    --cluster { CLUSTER NAME } \\
    --namespace kube-system \\
    --name aws-load-balancer-controller \\
    --attach-policy-arn arn:aws:iam::373669830907:policy/AWSLoadBalancerControllerIAMPolicy \\
    --override-existing-serviceaccounts \\
    --approve

# apply load balancer controller helm chart
kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller//crds?ref=master"

helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system --set clusterName={ CLUSTER NAME } --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller
`;

const ingressTemplate = `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    kubernetes.io/ingress.class: "alb"
    alb.ingress.kubernetes.io/scheme: internet-facing
  labels:
    app.kubernetes.io/name: alb-ingress-controller
spec:
  rules:
    - http:
        paths:
          - path: /prefix
            pathType: Prefix
            backend:
              service:
                name: { SERVICE NAME }
                port:
                  number: 80
`;

const curlResult = `$ curl http://{ ELB DOMAIN }.us-east-1.elb.amazonaws.com/{ PREFIX }/monitoring/health
OK
`;

function K8sSpringbootPost() {
    return (
        <div className="post-content">
            <h1 className="display-4">Containerizing a Java Spring Boot Service for EKS</h1>
            <h5 className="text-muted">Aug 23, 2022</h5><br />
            <div className="post-header-img">
                <img src={k8sSpringbootImage} alt="greekrho" className="img-fluid" />
            </div>

            <p>I'll preface this post by saying that I am definitely no Kubernetes expert.  In fact, it took me longer than I would care to admit to get this thing to serve a simple health check.  It seems to me that there is a very wide gap between the simplicity of containerizing an application with Docker and the difficulty of picking up container orchestration with Kubernetes.  That being said, Kubernetes offers the advantage of being highly customizable, adaptable, and extendible, and is clearly favored in the market.  For that reason, I thought it might be a useful exercise to jump in the deep end with Kubernetes and implement a pattern that I'm pretty familiar with from my current work:  a Java Springboot service containerized into a Docker image and running on a Kubernetes cluster.  Fair to say I was underprepared, so I'll try to list out the actions I took here to get this thing running.</p>
            <p>At the high level, here's what we're going to try to do in this post:</p>
            <ul>
                <li>Create a Java Spring Boot microservice, serving a health check endpoint</li>
                <li>Containerize the microservice with docker</li>
                <li>Upload our image to an AWS ECR repository</li>
                <li>Create an EKS cluster, with nodes running on private VPC subnets</li>
                <li>Deploy the microservice to the EKS cluster</li>
                <li>Set up the AWS Load Balancer Controller and an Ingress so we can access the microservice over the web</li>
            </ul>
            <h2>Prerequisites</h2>
            <p>To complete this guide, you'll want to make sure you have a few tools installed:</p>
            <ul>
                <li>awscli</li>
                <li>kubectl</li>
                <li>eksctl</li>
                <li>Docker</li>
                <li>An ECR repository to store your docker images</li>
            </ul>
            <h2>Step 1:  Build and containerize a Spring Boot microservice</h2>
            <p>This was probably the simplest part of the whole enterprise.  To start with, Spring offers a tool called <a href="https://start.spring.io/">the Spring Initializr</a>, which I would definitely recommend.  This will build out the boilerplate code for a Spring Boot service, in Maven or Gradle (I'm using Gradle, just because it's what I'm familiar with).  Just be sure to include the <b>Spring Web</b> dependencies and you should be good to go.</p>
            <p>For the purposes of verifying the service is up and running, I wrote a simple monitoring controller with a health check endpoint:</p>
            <CodeSnippet code={monitoringController} language="java" showLineNumbers={true} startingLineNumber={1} />
            <p>This is pretty much all that we'll do with the Spring Boot service for now.  The ultimate goal for this post will be to serve this health check over HTTP.  But before we do anything else, we'll want to containerize the entire Spring Boot application.  Gradle comes with a built-in command to do this (make sure your Docker daemon is running):</p>
            <CodeSnippet code="./gradlew bootBuildImage" language="sh" showLineNumbers={false} />
            <p>This will compile your Spring Boot application as a Docker image, and store it in your local Docker registry.  In order to store it in an ECR repository, we'll want to tag it with the standard ECR registry format.  Be sure to fill in the bracketed variables with your own values (you can list your docker images with <code className="inline">docker images</code>):</p>
            <CodeSnippet code="docker tag {IMAGE ID} {AWS ACCOUNT ID}.dkr.ecr.{REGION}.amazonaws.com/{REPOSITORY NAME}:latest" language="sh" showLineNumbers={false} />

            <h2>Step 2:  Create an EKS cluster</h2>
            <p>I spent an insane amount of time stubbornly trying to build this entire application in pure Cloudformation templates.  While I'm convinced there is a good way to do this (since ekctl builds Cloudformation templates under the hood), there are an insane number of resources that need to be manually configured if you want to go this route.  The complexity eventually got to a point where I gave in and tried out the eksctl tool, and found that it simplified the entire process dramatically.  For that reason, I'll stick with it for this post.</p>
            <p>eksctl has a tool that will create a cluster from a YAML template, much the same way that kubectl works at the sub-cluster level.  To get our service to run, we need to define a very simple cluster template:</p>
            <CodeSnippet code={clusterTemplate} language="yaml" showLineNumbers={true} startingLineNumber={1} />
            <p>This template instructs eksctl to prepare a cluster named <code className="inline">application-cluster</code>, with one NodeGroup made up of 3 EC2 t3.small instances.  We also have <code className="inline">privateNetworking</code> set to true, this instructs eksctl to configure the nodes to run only in private subnets.  This will isolate your nodes from the public internet, and is generally recommended, but adds complexity for serving HTTP traffic.  eksctl creates a VPC, 3 public, and 3 private subnets by default (unless you're in us-east-1, in which case it's 2 of each).  If we wanted, we could also configure autoscaling in this template, but we would need to install a few more dependencies and take on some added complexity.  For now let's try to get the service running without autoscaling.</p>
            <p>To apply the template, save this template as <code className="inline">cluster.yaml</code> and run:</p>
            <CodeSnippet code="eksctl create cluster -f cluster.yaml" language="sh" showLineNumbers={false}/>
            <p>This will generate a Cloudformation stack with a few resources.  First, the EKS cluster will provision.  This will likely take a few minutes.  Secondly, your node group will initialize 3 EC2 instances, and register them with the cluster's node group.  Once this is all finished, you should have a few nodes running the kube proxy and the aws-node job, but no real work being done.</p>

            <h2>Step 3:  Deploy the microservice</h2>
            <p>Since we containerized the Spring Boot application and uploaded the image to ECR earlier, this step should be pretty straightforward:  we just need to configure pods to run our microservice image, and deploy them to the nodes in our node group.  To get this working, we'll configure a Kubernetes deployment.</p>
            <p>The deployment essentially instructs Kubernetes to start a pod workload for a container image.  We can also set the number of replicas for that pod that we want running.  Here is a sample deployment template for our application (remember to swap out the bracketed values):</p>
            <CodeSnippet code={deploymentTemplate} language="yaml" showLineNumbers={true} startingLineNumber={1} />
            <p>This template instructs Kubernetes to create 3 replicated pods for the service that we containerized earlier.  The image property of the pod spec tells the pod to run the image that we published to ECR earlier.  Notice that we use the <code className="inline">latest</code> tag.  Whenever we publish a new image, we should use that tag, and ECR will automatically remove the tag from the older version and apply it to the new one.  That way we don't need to edit this template later, it will always pull the most up-to-date image.</p>
            <p>This is also where we configure resource requests and limits.  If we find later that our pods are being starved of resources, we can tweak these values to add more.</p>
            <p>Before we apply this template, we need to instruct kubectl to use our EKS cluster.  Fortunately the AWS CLI provides a method for this: </p>
            <CodeSnippet code="aws eks update-kubeconfig --region {REGION}--name {CLUSTER NAME}" showLineNumbers={false} />
            <p>Running this in your terminal will update your local kubeconfig file to use the remote EKS cluster.  Now we're ready to apply the deployment template:</p>
            <CodeSnippet code="kubectl apply -f deployment.yaml" showLineNumbers={false} />
            <p>This command will apply the deployment to the Kubernetes cluster running in AWS.  Kubernetes should automatically start scheduling the microservice on the nodes in the node group we configured earlier.  If you checkout the pods in the cluster with <code className="inline">kubectl get pods</code> you should now see three pods running our microservice.</p>

            <h2>Step 4:  Networking</h2>
            <p>Even though we now have our service running in the cluster, we still can't communicate with it because we haven't instructed Kubernetes to expose any ports for communication.  Kubernetes uses <code className="inline">Services</code> to expose applications to the network.  Services are access policies for a group of pods.  We just need to apply a template that builds a service for the pods running our Spring Boot application, exposing port 80 for HTTP traffic:</p>
            <CodeSnippet code={serviceTemplate} language="yaml" showLineNumbers={true} startingLineNumber={1} />
            <p>This template creates an access rule for all pods matching the <code className="inline">selector</code> criteria, in this case with an <code className="inline">app</code> attribute matching "service-name".  For all of these pods, this template instructs Kubernetes to expose port 80 on their node and route TCP traffic to port 8080, the standard port for Spring Boot services.  And that's it!  HTTP traffic can now reach the microservice!</p>
            <p>There's just one problem.  When we configured our cluster earlier, we told it to run the pods on private subnets.  This means they aren't open to the internet, so we still can't reach the service from outside the VPC.  This is probably a good thing, as it reduces attack vectors to our system, but it adds additional pain to get the network set up.  Kubernetes has the idea of an <code className="inline">Ingress</code>, which routes traffic coming into the cluster to services.  We can use an Ingress to handle SSL termination, load balancing, etc.  If you're a cloud person, you might think this sounds familiar - it sounds like a load balancer.  In AWS for example, Ingresses created via Kubernetes should really represent Application Load Balancers, configured separately from the EKS cluster and routing traffic to the EC2 instances running our application.  There's just one snag - the EKS cluster needs to be able to tell your AWS account to provision an ALB when an Ingress is created on the Kubernetes control plane.</p>
            <p>This is where I got stuck when trying to provision everything myself.  There's kind of a lot of resources that need to go into this two-way communication.  Fortunately, AWS has made a lot of resources available to us that greatly simplify this entire process, but it's kind of hard to find them.  The first thing we need to do is setup the <code className="inline">AWS Load Balancer Controller</code> to run in our cluster.  Functionally, this is a deployment that will run on our node group listening for creations, modifications, and deletions of Ingress resources, so it can provision elastic load balancer resources to match them.  However, to do this it needs some specific IAM permissions allowing it to spin up resources on your cloud.  This bash script should take care of all of this:</p>
            <CodeSnippet code={loadBalancerControllerScript} language="sh" showLineNumbers={false} />
            <p>Once this script is done running, you should see a pod running in your cluster for the aws-load-balancer-controller.  This will be configured with all the permissions necessary to handle ingress creation.  Therefore, the next thing we need to do is apply a template for the ingress, which will be created as an ALB:</p>
            <CodeSnippet code={ingressTemplate} language="yaml" showLineNumbers={true} />
            <p>This ingress tells AWS to configure an ALB routing any HTTP path with the prefix <code className="inline">/domain</code> to the service that we configured earlier.  Ingresses also support domain-based routing, if your services have domains associated with them.  If we were to add more services to our cluster (which is common in a microservices architecture) we could add more path rules to this Ingress to distribute traffic to the proper services.  Once this is done provisioning, grab the DNS name from the ALB console in AWS and we should finally be able to access our service from the public internet!</p>
            <CodeSnippet code={curlResult} language="sh" showLineNumbers={false} />
            <h2>Conclusion</h2>
            <p>That should do it for this post.  We've successfully dockerized our Spring Boot application, uploaded the image to an ECR repository, configured EKS to pull our image and run it on a node group, and set up the networking to expose it to HTTP traffic.  Next steps will be to configure our Ingress for SSL termination so we can serve HTTPS traffic, and configure a data store for our application so we can start building out some functionality in our service.  But I need to figure out how to do that first, so that will be a post for another day.</p><br />
        </div>
    );
}

export default K8sSpringbootPost;