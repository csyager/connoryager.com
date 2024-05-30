import k8sSpringbootImage from '../../images/posts/k8s+spring.png';
import CodeSnippet from '../CodeSnippet';
import githubImage from '../../images/github.png';

const helmInstall = `#!/bin/bash

# login to public ecr repo
aws ecr-public get-login-password --region us-east-1 | helm registry login --username AWS --password-stdin public.ecr.aws

# install RDS controller
helm install --create-namespace -n ack-system oci://public.ecr.aws/aws-controllers-k8s/rds-chart --version=v0.0.27 --generate-name --set=aws.region=us-east-1
`;

const oidcInstall = `export EKS_CLUSTER_NAME=<eks cluster name>
export AWS_REGION=<aws region id>
eksctl utils associate-iam-oidc-provider --cluster $EKS_CLUSTER_NAME --region $AWS_REGION --approve`;

const iamRole = `### creates an IAM role allowing ACK controller to provision RDS resources
# Update the service name variables as needed
SERVICE="rds"
EKS_CLUSTER_NAME="{CLUSTER NAME}"
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
OIDC_PROVIDER=$(aws eks describe-cluster --name $EKS_CLUSTER_NAME --region $AWS_REGION --query "cluster.identity.oidc.issuer" --output text | sed -e "s/^https:\\/\\///")
ACK_K8S_NAMESPACE=ack-system

ACK_K8S_SERVICE_ACCOUNT_NAME=ack-$SERVICE-controller

read -r -d '' TRUST_RELATIONSHIP <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::\${AWS_ACCOUNT_ID}:oidc-provider/\${OIDC_PROVIDER}"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "\${OIDC_PROVIDER}:sub": "system:serviceaccount:\${ACK_K8S_NAMESPACE}:\${ACK_K8S_SERVICE_ACCOUNT_NAME}"
        }
      }
    }
  ]
}
EOF
echo "\${TRUST_RELATIONSHIP}" > trust.json

ACK_CONTROLLER_IAM_ROLE="ack-\${SERVICE}-controller"
ACK_CONTROLLER_IAM_ROLE_DESCRIPTION="IRSA role for ACK \${SERVICE} controller deployment on EKS cluster using Helm charts"
aws iam create-role --role-name "\${ACK_CONTROLLER_IAM_ROLE}" --assume-role-policy-document file://trust.json --description "\${ACK_CONTROLLER_IAM_ROLE_DESCRIPTION}"
ACK_CONTROLLER_IAM_ROLE_ARN=$(aws iam get-role --role-name=$ACK_CONTROLLER_IAM_ROLE --query Role.Arn --output text)
`;

const attachPolicy = `# Download the recommended managed and inline policies and apply them to the
# newly created IRSA role
BASE_URL=https://raw.githubusercontent.com/aws-controllers-k8s/\${SERVICE}-controller/main
POLICY_ARN_URL=\${BASE_URL}/config/iam/recommended-policy-arn
POLICY_ARN_STRINGS="$(wget -qO- \${POLICY_ARN_URL})"

INLINE_POLICY_URL=\${BASE_URL}/config/iam/recommended-inline-policy
INLINE_POLICY="$(wget -qO- \${INLINE_POLICY_URL})"

while IFS= read -r POLICY_ARN; do
    echo -n "Attaching $POLICY_ARN ... "
    aws iam attach-role-policy \\
        --role-name "\${ACK_CONTROLLER_IAM_ROLE}" \\
        --policy-arn "\${POLICY_ARN}"
    echo "ok."
done <<< "$POLICY_ARN_STRINGS"

if [ ! -z "$INLINE_POLICY" ]; then
    echo -n "Putting inline policy ... "
    aws iam put-role-policy \\
        --role-name "\${ACK_CONTROLLER_IAM_ROLE}" \\
        --policy-name "ack-recommended-policy" \\
        --policy-document "$INLINE_POLICY"
    echo "ok."
fi

# Annotate the service account with the ARN
IRSA_ROLE_ARN=eks.amazonaws.com/role-arn=$ACK_CONTROLLER_IAM_ROLE_ARN
kubectl annotate serviceaccount -n $ACK_K8S_NAMESPACE $ACK_K8S_SERVICE_ACCOUNT_NAME $IRSA_ROLE_ARN

echo "DONE"`;

const subnetGroup = `apiVersion: rds.services.k8s.aws/v1alpha1
kind: DBSubnetGroup
metadata:
  name: rds-postgresql-subnet-group
spec:
  name: rds-postgresql-subnet-group
  description: RDS subnet group for application in EKS
  subnetIDs:
    - {SUBNET ID 1}
    - {SUBNET ID 2}
`;

const secret = `RDS_INSTANCE_NAME="<your instance name>"

kubectl create secret generic "\${RDS_INSTANCE_NAME}-password" \\
--from-literal=password="<your password>"`;

const dbInstance = `apiVersion: rds.services.k8s.aws/v1alpha1
kind: DBInstance
metadata:
  name: "{RDS_INSTANCE_NAME}"
spec:
  allocatedStorage: 20
  dbInstanceClass: db.t4g.micro
  dbInstanceIdentifier: "{RDS_INSTANCE_NAME}"
  dbSubnetGroupName: "rds-postgresql-subnet-group"
  engine: postgres
  engineVersion: "14"
  masterUsername: "postgres"
  masterUserPassword:
    namespace: default
    name: "{RDS_INSTANCE_NAME}-password"
    key: password
  publiclyAccessible: true`

const applicationDatasource = `spring:
  datasource:
    driverClassName: org.postgresql.Driver
    url: "jdbc:postgresql://{INSTANCE ENDPOINT}:5432/{DB Name}"
    username: postgres
    password: {PASSWORD}
    platform: postgresql
    initialization-mode: always`;

const curl = `$ curl https://api.connoryager.com/user-service/user/1                                    
{"id":1,"firstName":"connor","lastName":"yager","middleName":"shaw"}% `;


function K8sPostgresPost() {
    return (
        <div className="post-content">
            <h1 className="display-4">EKS Part III:  Adding an RDS Instance Using ACK</h1>
            <h5 className="text-muted">Oct 7, 2022</h5><br />
            
            <div className="post-header-img">
                <img src={k8sSpringbootImage} alt="k8s + Spring Boot" className="img-fluid" />
            </div>

            <p>In the previous post, we setup an Ingress (which is an application load balancer under the hood) with SSL termination that routes traffic to our application, running on the kubernetes cluster.  My goal for this post was to setup a database for this application, but I didn't want to stray too far from the Kubernetes paradigm.  Ideally, I want to be able to configure as much of the service infrastructure using Kubernetes controllers, which are running on the cluster.  In other words, I want to be able to use <code className="inline">kubectl apply</code> to configure the database.</p>
            <h2>Installing the ACK RDS Controller</h2>
            <p>Fortunately, AWS has a project in the works called the <a href="https://aws-controllers-k8s.github.io/community/docs/community/overview/">AWS Controllers for Kubernetes</a>, or ACK.  Fundamentally, what this does is add an API controller to your Kubernetes control plane and custom resource definitions that represent and provision AWS resources.  I would think of it as somewhat analogous to Cloudformation; we can define our resources using a templating language, the only difference is instead of AWS building the cloud resources, it's a kubernetes controller plugin.</p>
            <p>To get this setup, the first thing we need to do is install an ACK controller.  Directions published by the project can be found <a href="https://aws-controllers-k8s.github.io/community/docs/user-docs/install/">here</a>.  Each API domain within AWS has it's own controller that would need to be installed, and not all APIs are supported.  For our purposes, we want to install an RDS controller.  ACK maintains helm resources to install easily:</p>
            <CodeSnippet code={helmInstall} language="sh" />
            <p>This will install the RDS controller and some custom resource definitions in a new namespace on our Kubernetes cluster, <code className="inline">ack-system</code>.  Now we need to give the controller the permissions necessary to provision resources under our account.  To do this, first we need to associate an OIDC provider with our cluster.  If you were following part 1 of this series, we actually already did this to install the AWS Load Balancer Controller, but if not, just run these commands:</p>
            <CodeSnippet code={oidcInstall} language="sh" showLineNumbers={false}/>
            <p>The controller also needs an IAM role, referencing the OIDC provider (make sure to change the variable for <code className="inline">ECS_CLUSTER_NAME</code>):</p>
            <CodeSnippet code={iamRole} language="sh" />
            <p>Finally, we need to attach a policy to the IAM role, downloaded from the ACK GitHub:</p>
            <CodeSnippet code={attachPolicy} language="sh" />
            <h2>Create a DBSubnetGroup</h2>
            <p>One of the custom resource definitions added in the previous step is called a <code className="inline">DBSubnetGroup</code>.  This is basically just a logical grouping that we'll use later to instruct the controller on what subnet we want the instance to exist in.  For the sake of testing, I've got mine setup in the public subnets of the VPC that we configured in Part I to run our cluster on.  In practice, it would be wiser to keep the database in the private subnets, but putting it on the public one for now will make connecting from the local machine easy.  Since the database instance will be in the same VPC, networking should be pretty simple, we'll just need to update the VPC security groups to allow communication to the database from the nodes.  If your database is going to be in a separate VPC however, you'll need to configure some kind of network bridge between the VPCs to allow for communication.  For this post though, I'm going to assume we're using the same VPC.</p>
            <p>So, all we have to do is grab the subnet IDs that we want the RDS instance to live on, and put it in a template.  Fill in your subnet IDs in a template file called <code className="inline">db-subnet-group.yaml</code>, like this:</p>
            <CodeSnippet code={subnetGroup} language="yaml" />
            <p>That's pretty much it.  When it's ready, run <code className="inline">kubectl apply -f db-subnet-group.yaml</code> to apply.</p>
            <h2>Create a DBInstance</h2>
            <p>First things first, we need to create a password for our database.  We can do this using a Kubernetes secret, and reference it in our instance definition later.  You can use kubectl to do this, like so:</p>
            <CodeSnippet code={secret} language="sh" />
            <p>Now all we need to do is create our RDS instance, using the <code className="inline">DBInstance</code> custom resource definition (documentation found <a href="https://aws-controllers-k8s.github.io/community/reference/rds/v1alpha1/dbinstance/">here</a>).  I've named mine <code className="inline">rds-postgresql.yaml</code>.</p>
            <CodeSnippet code={dbInstance} language="yaml" />
            <p>Notice that we're referencing the password that we've just created as a Kubernetes secret, and the subnet group that we created earlier as a resource.  You can also customize other features of the database here, such as the instance class, Postgres version, etc.  When you're ready, go ahead and <code className="inline">kubectl apply -f rds-postgresql.yaml</code>.  This will provision your RDS instance, which you will be able to see immediately in your AWS console.</p>
            <p>Once the database is finished creating, we need to add some rules to it's security group to allow the Kubernetes app to communicate with it.  By default, the RDS instance will use the default security group for the VPC that it was created in.  From the RDS console, open your instance and under "Connectivity & security" on the far right you'll see the security group it is a part of.  Click the security group to view it's details.  Open the "Inbound rules" tab and edit inbound rules.  We need to add rules allowing TCP traffic on port 5432 from the security group that our nodes are running under.  Click "Add rule", and select "PostgreSQL" as the type.  For the source, click the search bar and find the security group for your nodes (mine was called <code className="inline">eksctl-app-cluster-eksctl-nodegropu-ng-1-springboot/SG</code>, from the setup done in previous posts).  Select it and click "Save rules".</p>
            <p>Now, if we want to connect to this database from our local machine, we need to add another rule for our IP address.  There's actually a shortcut for this, under the source dropdown just select "My IP" and it will automatically populate it.  We also want TCP port 5432, so we can connect.  Save this rule and you should be good to go.</p>
            <p>To test your connection, navigate back to the RDS console, select your instance, and find the "Endpoint" field under "Connectivity and security".  Now that we're allowed by the security group, we can hit this endpoint from our local machine and query the database.  In the command line, try <code className="inline">psql -h &#123;ENDPOINT&#125; -U postgres</code>.  If you changed your master username from "postgres" to something else, use that after the <code className="inline">-U</code> instead.  You'll be prompted for a password, this will be the password you put in the kubernetes secret a few steps ago.  Enter the password and you should be good to go.  You can query your instance and setup your databases as you see fit.</p>
            <h2>Configuring Spring Boot to use the Database</h2>
            <p>Finally, we just need to setup our Spring Boot application to use the new database.  Open your <code className="inline">application.yaml</code> file, and add the following block, filling in the endpoint URL, the database within your instance that you want to connect to, and the password you configured earlier:</p>
            <CodeSnippet code={applicationDatasource} language="yaml" />
            <p>The jdbc URL tells Spring where to find the database that you're using with your application.  When published, your application will now have access to the database that we've configured!  In my project, I configured a JPA entity describing a user, and a repository abstraction to manage its lifecycle.  I also wrote some simple endpoints to POST and GET users via the JPA repository.  If you want to see how I configured this in more detail, you can <a href="https://github.com/csyager/user-service-demo" target="_blank" rel="noreferrer">check it out on <img src={githubImage} alt="github" className="github-intext" /> GitHub</a>.  Package the application using <code className="inline">./gradlew bootBuildImage</code>, tag it and push it using the push commands for your ECR repository (check the ECR console for your repository if you've forgotten), and restart the pods to pull the latest image using <code className="inline">kubectl rollout restart deployment &#123;DEPLOYMENT_NAME&#125;</code>.  When the new pods restart, you can interact with your service, which will in turn interact with the database:</p>
            <CodeSnippet code={curl} language="sh" showLineNumbers={false}/>
            <h2>Cleanup</h2>
            <p>If you're like me, your cluster has probably been running for a while, racking up compute costs on your AWS account.  To cleanup, we just need to delete a few resources that we've added, then delete the cluster.  Let's start with the nodegroup, since this is what's running up the largest cost.  We can delete this simply with <code className="inline">eksctl delete [nodegroup name]</code>.  This will deprovision the EC2 instances that our service has been running on.  Next, let's get the ingress that we created using an ALB: <code className="inline">kubectl delete ingress [ingress-name]</code>.  We need to delete the DBInstance representing our RDS instance:  <code className="inline">kubectl delete dbinstances.rds.services.k8s.aws [db instance name]</code>.  We can delete the rest of our cluster's resources in one fell swoop:  <code className="inline">eksctl delete cluster --name [cluster name]</code>.  If you have trouble deleting security groups, try to manually delete them from the console.  This should call out dependencies that would prevent it from being deleted (for example, one of my SGs was getting stuck, because it was used in an ingress rule for another security group, allowing the nodes on the private subnet to communicate with the DBInstance on the public subnet.  Deleting the inbound rule freed up the SG for deletion).  If you have trouble, check your CloudFormation console for lingering resources.  You definitely want to make sure everything gets deleted as this should stop us from racking up our AWS bills.</p>
            <h2>Conclusion</h2>
            <p>Over the past three posts, we've successfully setup a modern microservice with a web service and database, running on a Kubernetes cluster on AWS EKS.  Pretty cool!  This microservice should be enterprise-grade, and we can use Kubernetes to manage our resource usage and scaling.  Moreover, because we've setup our cluster with controllers for ingresses and RDS instances, we can add more microservices to the cluster easily, without needing to stray far from our Kubernetes control plane.  </p>
            <br />
        </div>
    );
}

export default K8sPostgresPost;