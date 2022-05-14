import reactImage from '../../images/posts/react.png';
import reactdefaultImage from '../../images/posts/reactdefault.png'

function ReactPost() {
    return (
        <div className="container post-content">
            <h1 className="display-4">Hosting a React App on Amazon S3</h1>
            <h5 className="text-muted">Apr 25, 2021</h5><br />
            
            <div className="post-header-img">
                <img src={reactImage} alt="react" className="img-fluid" />
            </div>

            <p className="post-body">Most people know Amazon S3 as a powerful file storage option offered on the AWS environment.  What some people don't know is that S3 can also be used to serve static websites in a cost-effective and highly available way.  This post will walk through how we can serve a React app on S3.</p>

            <h2>Requirements</h2>
            <p>First things first, we need to make sure we have a few requirements satisfied.  </p>
            <ul>
                <li>AWS Account - If you don't have one already, you'll need to create an AWS account.  AWS offers a plethora of resources and services, and a very nice "free tier" that lets you try out their services at no cost, usually with a limit of one year.  Click <a href="https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/" target="_blank" rel="noreferrer">here</a> to create an account.</li>
                <li>aws-cli - AWS provides a command line interface for interacting with their resources.  Follow <a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html" target="_blank" rel="noreferrer">these instructions</a> for configuring your command line to work with your account.</li>
                <li>Node - Node is a free, open source server environment that serves Javascript.  We'll use this to serve the website we build locally during development.  You can install this with your package manager of choice.  I did this project on a Mac using the popular package manager homebrew, so I installed this using the command <kbd>brew install node</kbd>, but there are alternatives if you are running on a Linux or Windows machine.  This will also install npm, a package manager for Javascript packages that we will use for the rest of the tutorial.</li>
                <li>create-react-app - Create react app is a CLI tool for configuring your development environment quickly and correctly.  Install it by running <kbd>npm install create-react-app</kbd> from your command line.</li>
            </ul>
            <p>Once you have these requirements installed, we're ready to get started.</p>
            <hr />
            <h2>create-react-app</h2>
            <p>Now we'll use the create-react-app package we just installed to initialize our development environment.  This will create the directory structure we're going to use, add a few react-scripts that will help us in development, and even initialize a git repository in your working directory.  Navigate into the directory where you want your project to live and run the following:</p>
            <pre><code>{`> npx create-react-app my-app
> cd my-app
> npm start
`}</code></pre>
            <p>This will create the directory structure of the app in a directory called sample_react_app and start the development server.  Your directory structure should now look like this (ignoring the node_modules directory):</p>
            <pre><code>{`.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    └── setupTests.js

2 directories, 17 files`}</code></pre>

        <p>If your browser didn't automatically open the page already, open your browser and navigate to <code className="inline">http://localhost:3000</code>.  You should now see the default react page running in your browser!</p>
        <img src={reactdefaultImage} alt="default react page" className="img-fluid"/>
        <p>You can now substitute the default code for your project.  The main place that your code lives is in the <code className="inline">src/App.js</code> file.  Changing this file and saving should automatically refresh the page in your browser, which is very useful for seeing your changes take effect in real time.  React is a single-page application by default, but if you're interested in adding more standard routing to your application, check out my post on react-router.</p>
        <hr />
        <h2>Hosting Your React App on S3</h2>
        <p>Now we want to host our app somewhere, so people can view it on the internet.  To do this, we're going to start in the AWS console.  Log into your account and navigate to the S3 console.  Click on "Create Bucket."  For the name, you're going to want to name it <b>whatever your domain will eventually be</b>.  For example, this site is hosted on a bucket called <code className="inline">www.connoryager.com</code>, because that is the domain that I'm hosting this site on.  S3 bucket names need to be globally unique.</p>
        <p>Once you've named your bucket, find the checkbox marked "Block all public access."  Because we want our site to be publicly accessible, we need to uncheck this box, and make sure all the boxes beneath it are also unchecked.  Once this is done, click "Create bucket".</p>
        <p>Navigate into your created bucket, which should be empty.  Click on the Properties tab, and scroll to "Static website hosting."  Click on the Edit button, and change the radio button under "Static website hosting" to "Enable."  Under index document, type "index.html."  This tells the S3 website where the file we want to display when users navigate to our site will be located.  Click "Save changes" and navigate back to the main page for your bucket.</p>
        <p>Click on the permissions tab and scroll to "Bucket policy.  By default, users won't be able to see your site because they don't have the GetObject permission on your bucket.  Click Edit, and in the Policy editor copy and paste this policy, replacing <code className="inline">your-bucket-name</code> with the name of your bucket:</p>
        <pre><code>{`{
    "Version": "2008-10-17",
    "Id": "PolicyForPublicWebsiteContent",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}`}</code></pre>

        <p>Now navigate back to the properties tab of your bucket, and under Static website hosting you should see a Bucket website endpoint.  Opening this page in the browser should serve your bucket as a website!  Of course, the bucket is currently empty so you shouldn't see anything yet.  Next we'll upload our built React app to the bucket.</p>

        <hr />
        <h2>Building your React app and uploading to S3</h2>
        <p>We're going to do a quick shortcut here by creating a custom script that we can run from the command line.  Open <code className="inline">package.json</code> in the top level directory of your React project.  In the script object, add this line as a list element, again replacing your-bucket-name with your bucket name: <kbd>"deploy": "aws s3 sync build/ s3://your-bucket-name"</kbd>.  Your scripts object should now look something like this:</p>

        <pre><code>{`"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "aws s3 sync build/ s3://your-bucket-name"
  },`}</code></pre>

        <p>Now, when we run <kbd>npm run deploy</kbd> from the command line, our build directory will sync with your S3 bucket, and any changes you've built will propagate to the bucket.  To test this out, run <kbd>npm run build</kbd>, then <kbd>npm run deploy</kbd>.  Your output should look something like this:</p>

        <pre><code>{`> npm run build
> react-blog@0.1.0 build
> react-scripts build

Creating an optimized production build...
Compiled successfully.
...

> npm run deploy
> react-blog@0.1.0 deploy
> aws s3 sync build/ s3://your-bucket-name
...
        `}</code></pre>
        <p>If these scripts execute successfully, you should see a build directory appear in your top-level working directory, and the files in that directory should have been uploaded to your S3 bucket.  Any time that you're ready to publish your changes to your website, run these two scripts and the S3 bucket hosting it will be updated.  Go back to your browser now and navigate to the static site hosting address we got from the S3 console earlier, and you should see your site published at that address!</p>

        <hr />
        <h2>Using a custom domain</h2>
        <p>You probably don't want your users to need to navigate to that long URL everytime they try to find your site.  To fix this, we'll use AWS's Route 53 service to purchase a domain name and create a record mapping your domain to your new static site.  Navigate to the Route 53 dashboard in the AWS console.  First, we need to create a domain.  In the side navigation bar, click "Registered domains," and click "Register Domain."  In the search bar, search for the domain that you wish to use.  For my site, that's "connoryager.com".  Follow the options to purchase the domain.  This can take a little time to propagate, and requires that your domain name be unique.</p>
        <p>Now, back in the Route 53 console, click "Hosted zones" and then "Create hosted zone".  In the dialogue box under Domain name, enter the domain name that you just purchased.  For example, the domain name for this site is "connoryager.com."  Then, click "Create hosted zone."  Once this is complete, click on the new hosted zone and click "Create record."  Under record name, enter "www", and under Record type select "A."  When selecting where to route to, enter the static website URL that we got from the S3 static website hosting console.  Then click "Create records," and you're all done!  After a few minutes, navigating to <code className="inline">http://www.your-domain-name.com</code> should bring up you're React app!</p>

        <hr />
        <h2>Conclusion</h2>
        <p>We've now set up our React app to be served from an S3 bucket.  This is a highly cost-effective solution that allows you to develop using the excellent React framework and deploy your projects seamlessly, without worrying about maintaining a server to serve your site.  Hopefully this tutorial was helpful in getting your project rolling.  Happy hacking!</p>
        </div>
        
    );
}

export default ReactPost;