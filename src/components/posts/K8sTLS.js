import k8sSpringbootImage from '../../images/posts/k8s+spring.png';
import CodeSnippet from '../CodeSnippet';
import route53DomainRegistration from '../../images/posts/route53_domain_registration.png';
import route53HostedZone from '../../images/posts/route53_hosted_zone.png'

const ingress=`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    kubernetes.io/ingress.class: "alb"
    alb.ingress.kubernetes.io/scheme: internet-facing
    # add this line to set the listener ports to only use 443 (HTTPS)
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS": 443}]'
  labels:
    app.kubernetes.io/name: alb-ingress-controller
spec:
  # this section needs to be set to instruct the ingress on which
  # certificate we're going to assign to the load balancer
  tls:
  - hosts:
    - {subdomain}.{domain}.{top-level-domain}
  rules:
    # we also want to set the host here (ex. www.google.com)
    - host: {subdomain}.{domain}.{top-level-domain}
    - http:
        paths:
          - path: /users
            pathType: Prefix
            backend:
              service:
                name: user-service
                port:
                  number: 80`;

function K8sTLSPost() {
    return (
        <div className="post-content">
            <h1 className="display-4">EKS Part II:  TLS on the ALB Ingress</h1>
            <h5 className="text-muted">Aug 29, 2022</h5><br />
            
            <div className="post-header-img">
                <img src={k8sSpringbootImage} alt="k8s + Spring Boot" className="img-fluid" />
            </div>

            <p>In the previous post, we set up an EKS cluster running in AWS, and configured the Amazon Load Balancer Controller to manage our Kubernetes Ingress resources, providing public access to our application running on our private subnet.  When we left off, we had a functioning service, reachable over HTTP via the DNS name of the application load balancer.  The ALB routed requests to our node group, and specifically to the service as addressed in the route prefix.</p>
            <p>Today, I'd like to build on what we had working last week.  In order to serve secure traffic, HTTP access isn't going to cut it.  We want our internet traffic to be encrypted in transit, protecting us from snoopers listening to our requests or the servers' responses when it's between our client and the server.  In modern web development this is a necessity, and any application worth its salt will have it enabled.  The protocol that we're going to implement is called TLS, or transport layer security.  TLS itself is a replacement of SSL, but sometimes the two names are used interchangeably.  This protocol is the technology that enables secure HTTP communication, or HTTPS.</p>
            <h2>TLS Explained</h2>
            <p>Functionally, TLS is conducted via a "handshake" that occurs before request data is sent from the client to the server.  The general steps are as follows:</p>
            <ol>
                <li>The client sends a request to the server for a secure connection.  This message includes which version of the TLS protocol the client is using and a list of supported ciphers and hash functions for encryption.</li>
                <li>From this list, the server selects a cipher suite that it also supports, and sends a response with this selection, as well as the server's SSL certificate.  This certificate includes information about the issuing certificate authority, which is a trusted issuer of certificates that essentially vouches for its authenticity.  The certificate also includes the public encryption key for the server.</li>
                <li>The client verifies the certificate with the issuing certificate authority.  This confirms the identity of the server.</li>
                <li>The client then uses the public key (from the server's SSL certificate) to generate a random encrypted string, and sends it to the server.  The server is able to decrypt the string using it's own private key.</li>
                <li>Now that both the client and the server have the same random string, they both use them to generate session keys that are used to encrypt and decrypt all further interactions.  The handshake is complete, and the standard request-response pattern can commence.</li>
            </ol>
            <p>Based on where we left off in Part I, we have just a few things that we need to configure.  First, we need to create a DNS record for our application Ingress (which is an AWS Application Load Balancer).  We'll do this using AWS Route 53.  Second, we need to create an SSL certificate for our DNS record, which will allow us to encrypt and decrypt traffic.  We'll do this using AWS Certificate Manager.  Finally, we need to configure our Ingress to consume HTTPS traffic on port 443, terminate the SSL traffic, and execute the transaction with the service running on Kubernetes using standard HTTP.</p>
            <h2>Configuring a Route 53 Domain</h2>
            <p>One of the best features of AWS is that it has scalable DNS service called Route 53.  This allows you to register domain names, which can serve any IP-based web traffic, and integrates seamlessly with other AWS offerings.  You don't necessarily need to use Route 53, you could use any domain provider, but I've found that Route 53's integrations are very helpful and make set up pretty simple.</p>
            <p>Our first stop with Route 53 is going to be to register a domain.  You can do this in the console, and it's pretty straightforward.  You choose a domain name (for example, <code className="inline">connoryager.com</code>), add contact information (be sure to use information where you can be readily contacted - there may be important communications regarding your domain), and purchase the domain.  Depending on the domain you select and the top-level domain (ex. .com, .net, .org), the price and availability may vary.  Generally, you should be able to get one pretty cheap, mine costs $12.00 a year.  It may take a little while for your domain registration to be complete.</p>
            <img src={route53DomainRegistration} className="img-fluid post-img-bordered post-img" alt="Route 53 domain registration" />
            <p>Once you've registered a domain, you'll want to create a Hosted Zone for that domain.  In your hosted zone, create an <code className="inline">A Record</code> for the domain, and a subdomain that you will use to route to your application.  This could be something like <code className="inline">www</code> or <code className="inline">api</code>.  Click the "Alias" toggle, and in the endpoint dropdown select "Alias to Application and Classic Load Balancer".  We want to use this subdomain to route to our Kubernetes Ingress.  Choose your region, and your application load balancer from the dropdowns, and click "Create records".</p>
            <img src={route53HostedZone} className="img-fluid post-img-bordered post-img" alt="Route 53 hosted zone" />
            <p>Once that finishes creating, your domain should be all set up to serve your application traffic!  Open up a terminal and use the <code className="inline">curl</code> command to test your service:</p>
            <CodeSnippet code="curl http://{subdomain}.{domain}.{top-level-domain}/{path}" language="sh" showLineNumbers={false} />
            <p>You should see a response from your Spring Boot application.</p>
            <h2>Creating a Certificate</h2>
            <p>Next, open up the AWS Certificate Manager console.  We're going to request an SSL certificate for the domain that we just registered.  Click "Request", then select "Request a public certificate."  Use the full domain name for the fully qualified domain name (ex. <code className="inline">www.connoryager.com</code>), then "DNS validation".  We can use this option because Route 53 is our DNS provider.  Then click "Request", and click into the newly-created certificate.  You should see under "Domains" a button that says "Create records in Route 53."  Click this button, then use the default options and click "Create records".  This will create the records in Route 53 that are required to verify your ownership of the domain.  AWS may take some time here to validate the certificate.</p>
            <p>Once the certificate status is "Issued," we're ready to configure our app ingress to use the certificate and expose port 443 to internet traffic.</p>
            <h2>Configuring the Ingress</h2>
            <p>In order to use the certificate we just created, we need to make a few adjustments to our app ingress that we set up in the previous post.  We need to add the <code className="inline">alb.ingress.kubernetes.io/listen-ports</code> annotation, as well as some fields for the host to the spec.</p>
            <CodeSnippet code={ingress} language="yaml" showLineNumbers={true} />
            <p>This will instruct the Ingress to listen on port 443, secure traffic using the certificate that we set up for our subdomain, and terminate the SSL traffic by passing the request to the Kubernetes cluster on port 80, which is used for HTTP.  Delete the old ingress by running <code className="inline">kubectl delete ingress &#123;ingress-name&#125;</code>, and then apply the newly-saved template: <code className="inline">kubectl apply -f ingress.yaml</code>.</p>
            <p>The new load balancer will likely take a few minutes to provision.  Once it's finished traffic reaching the load balancer should be routed to the cluster.  The cURL command we ran earlier won't work this time, because the load balancer is no longer open on port 80, but by using HTTPS instead we should get a response from our Spring Boot service running on the cluster:</p>
            <CodeSnippet code="curl https://{subdomain}.{domain}.{top-level-domain}/{path}" language="sh" showLineNumbers={false} />
            <p>That should do it for this post!  We've set up TLS for our application, and are now serving our API over the internet securely.  The next thing I'd like to do is configure our cluster and test service to interact with an RDS database, so we can start to build out simple features for our Spring Boot application within the AWS and EKS ecosystem.  That'll be coming up in a post shortly.</p>
            <br />
        </div>
    );
}

export default K8sTLSPost;