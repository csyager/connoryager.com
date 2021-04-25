import stopmotionImage from '../../images/projects/stopmotion.png';
import githubImage from '../../images/github.png';

function StopMotionProject() {
    return (
        <div className="container post-content">
            <h1 className="display-4">Arduino Uno Stop Motion Camera</h1>
            <h5 className="text-muted">Apr 23, 2021</h5><br />
            <p><img src={githubImage} alt="github" className="github-intext" /> This project is on Github!  Click <a href="https://github.com/csyager/arduino-stop-motion" target="_blank" rel="noreferrer">here</a> to view!</p>
            
            <div className="post-header-img">
                <a href={stopmotionImage}><img src={stopmotionImage} alt="stopmotion architecture" className="img-fluid" /></a>
            </div>

            <p className="post-body">This project was a fun exercise that I put together in my free time to practice what I had learned about AWS resources during my client work.  The basic idea was that using an Arduino Uno board that I had lying around, a camera module, an ethernet connection, and an AWS backend comprised of an S3 bucket, Lambda function, and API gateway I could make a stop motion camera to take pictures of a snake plant in my apartment every six hours (in hindsight a quicker growing plant would have been better!).  The entire process ended up taking the better part of two days, and I actually learned a fair bit about image types and their byte makeup, as well as some networking lessons while troubleshooting my implementation.  </p>
            <p>The basic architecture of this project is utilizing an ethernet connection from the Arduino board to send HTTP requests to a Cloudformation distribution, which forwards the request to an API hosted on AWS API Gateway. The gateway is configured to trigger a Lambda function, which parses the data and writes it to an S3 bucket. The Arduino is configured in my code to run the camera capture and HTTP request every 6 hours.</p>
            <p>Writing the lambda function and configuring the AWS resources was really the easy part.  The thing that hung me up the most was working with the ArduCAM module that I was using to capture the image and actually getting the image to send without becoming corrupted.  The Arduino language is a bit unweildy, somewhere between writing in C and Java.  It was nice to refresh on the more memory intensive operations needed to work in a low-level language though, and a fun challenge to really get digging around in the byte code of the images.  For example, the Ethernet shield I was using with the project isn't strong enough to send the entire image in one go, so I needed to break the image down into chunks of 512 bytes to be sent across the network at one time.  The problem with that is that in doing that, I ended up inadvertently overwriting the first byte, which identifies the filetype of the image.  That's a pretty big deal, because even though the data was sending correctly I couldn't view the image when I downloaded it.  Only after tediously comparing my JPEG with several valid JPEGs and some furious Googling did I learn that all JPEGs start with the bytes <code>0xFF 0xD8</code>, and made the necessary adjustment.</p>
            <p>Another hang up was that the Ethernet Shield is only capable of sending unsecure HTTP requests, while AWS API Gateway requires using HTTPS.  This turned out to be a pretty quick fix, by configuring a Cloudfront distribution to sit between the gateway and the internet.  Still though, finding out the extra steps to take in what I thought would be straightforward took some time.  If you're interested in giving this a go for yourself, here is a rough outline of the steps I took:</p>
            <hr />
            <h2>Requirements</h2>
            <ul>
                <li>Arduino UNO</li>
                <li>Arduino Ethernet Shield 2</li>
                <li>Arducam OV2640 MINI 2MP PLUS Module</li>
                <li>Amazon AWS Account</li>
            </ul>
            <hr />
            <h2>Configuring the AWS Environment</h2>
            <ul>
                <li>S3 - S3 buckets are simple file stores. This is where the stop motion images will end up. First, navigate to the S3 console (you can use the global search feature to find it). Click create bucket, give it a name, and ignore the rest and click Create Bucket.</li>
                <li>Lambda - Lambdas are short scripts that AWS will execute, charging you only for the time that they run. These are perfect for this project, because we don't want to pay for the continuous uptime of an entire EC2 instance when we really only need compute resources for a few seconds every day. This function will be receiving an HTTP request from the API gateway as an "event," then storing the image data as a JPEG in the S3 bucket we just configured. Navigate to the Lambda console and click "Create Function." Use the "Author from scratch" option, give it a name, and in the Runtime dropdown select Python 3.8. Then click Create function. In the code editor, copy and paste the code in Lambda/S3StoreImage.py. This code receives the HTTP request, parses out the JPEG image being sent to it in the event body (in bytes), appends 0xFF to the start of this data (JPEG files start with the bytes 0xFF/0xD8. For some reason, our Arduino script was overwriting the first byte, which causes the files to come through corrupted), gives the file a name based on the current date and hour in UTC, then uploads that file to the S3 bucket.</li>
                <li>IAM Role - Running the lambda above as a test will fail due to insufficient permissions. To allow these writes, we need to manually give it permission to access the bucket. Navigate to the IAM console and click "Roles." Search for the role associated with your Lambda execution (try searching for the name you gave your function). Click attach policies, then create policy. Using the visual editor, search for the S3 service, click the checkbox next to write, under Bucket click "Add ARN", enter the name of the bucket you created to house your images, and then click through until the policy is created. Ensure this policy is attached to the lambda execution role, and you should be good to go.</li>
                <li>API Gateway - API gateway receives HTTP requests and directs them to functions, load balancers, and other resources within the AWS environment. In this case, the API gateway will direct requests to the lambda function we just configured. Navigate to the API gateway console, click Create API, use a simple HTTP API, click "Add Integration", select Lambda, and find the lambda function you previously created. Then click "Add Integration", and ensure that ANY request is being mapped to the Lambda. Then click through until the gateway is created</li>
                <li>CloudFront - There's a small snag here. API Gateway will only receive HTTPS requests, but the Ethernet Shield 2 is only capable of sending unsecure HTTP requests. Fortunately there's a way around this. We're going to setup a CloudFront distribution, which is essentially an extra layer between the internet and the API gateway. First, go to the API Gateway console and click on your API. Find the default stage, and copy the Invoke URL. Now in the CloudFront console, click "Create Distribution," and "Get Started." Paste the invoke URL in the Origin Domain Name field. For viewer protocol policy, make sure you allow HTTP and HTTPS. For allowed HTTP methods, make sure to click the third option, allowing GET, HEAD, OPTIONS, PUT, POST, PATCH, and DELETE. All the other settings should be fine, click create distribution. Open the details of your new distribution, and grab the domain name. This will be where you send requests from the Arduino module.</li>
            </ul>
            <hr />
            <h2>Configuring the Arduino</h2>
            <p><a href="https://www.arducam.com/knowledge-base/mini-tutorial/">The Arducam docs</a> are a good place to start to get the Arducam module configured. To use my code, you will need to have the Arducam library installed in the library directory of your Arduino IDE environment. Make sure to uncomment the OV2640_MINI_2MP_PLUS lines in memorysaver.h, as instructed in the documentation. When I downloaded the library, this happened to be configured for my model by default.</p>
            <p>The code found in Arduino/StopMotion.ini configures the Ethernet client to send requests to port 80 of a CloudFront distribution that I set up. If you've already set up your own AWS environment, take the domain name of the CloudFront distribution you've created and replace the one at the top of my file, the variable char HOST_NAME[]. Once the configuration steps laid out above are followed, running your Arduino script should start sending POST requests to your CloudFront distribution, which will forward to the API Gateway, which will trigger the lambda, which will write the image bytes as a file to the S3 bucket. Set up your camera somewhere sturdy (I used a breadboard to give it a horizontal base), let it run for a bit, and you'll amass a nice collection of images in the S3 bucket to make a stop motion out of.</p>
        </div>
    );
}

export default StopMotionProject;