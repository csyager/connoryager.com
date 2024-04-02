import {MathJaxContext, MathJax} from 'better-react-mathjax';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faGithub
  } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faGithub);

function Powerranks() {

    return (
        <div className="container post-content">
            <h1 className="display-4">LoL Powerranking Application</h1>
            <h5 className="text-muted">Oct 29, 2023</h5><br />
            <p><FontAwesomeIcon icon={faGithub} /> This project is on Github!  Click the links below to view!</p>
            <ul>
                <li><a href="https://github.com/csyager/lolpowerranks-ranking-service" target="_blank" rel="noreferrer">Ranking service</a></li>
                <li><a href="https://github.com/csyager/lolpowerranks-frontend" target="_blank" rel="noreferrer">Frontend</a></li>
                <li><a href="https://github.com/csyager/lolpowerranks-scripts" target="_blank" rel="noreferrer">Scripts</a></li>
            </ul>

            <div className="embed-responsive embed-responsive-16by9 mb-3">
                <iframe className="embed-responsive-item" width="560" height="315" src="https://www.youtube.com/embed/fPVPXeFQOp8?si=3Qtk7g0whm3FksOG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>

            <p className="post-body">About a month ago, I was looking for a project to dig into outside of work, and came across the League of Legends powerranking hackathon on devpost.  The theme of the project was to design a ranking system that could be used to compare teams playing League of Legends, both globally and within the context of a tournament with a smaller subset of teams.  To build the ranking system, we were provided with a great deal of game data from the past year of competitive play.  I decided to sign up, mostly just as a goal to be working towards to flex my creative muscles and keep my web skills sharp.  While I had initially started with a few friends, it became clear pretty quickly that I was the only one with either the time or energy to put towards the project.  That said, I had a good time working on it, and got to use some interesting technologies to develop it.  Here's the writeup that I submitted along with the project.</p>

            <h2>Project Summary</h2>
            <p className="post-body">My project uses a simple Elo rating system to calculate a rating for a team based on the wins and losses in the provided dataset.  These ratings are stored in DynamoDB for production access.  To support querying the rating database, I've written a Spring web API in Java, according to the provided API specifications.  I've also created a simple frontend application for interacting with the API, though the API itself is also publicly documented and accessible.</p>

            <h2>Technologies Used</h2>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>AWS Athena</td>
                        <td>For loading and querying the provided data during ranking generation</td>
                    </tr>
                    <tr>
                        <td>AWS DynamoDB</td>
                        <td>As a production database</td>
                    </tr>
                    <tr>
                        <td>Python</td>
                        <td>Data manipulation for generating the rankings</td>
                    </tr>
                    <tr>
                        <td>Java Spring</td>
                        <td>As backend API framework</td>
                    </tr>
                    <tr>
                        <td>AWS Fargate</td>
                        <td>Compute solution for the backend API</td>
                    </tr>
                    <tr>
                        <td>AWS ALB</td>
                        <td>Application load balancing</td>
                    </tr>
                    <tr>
                        <td>Docker + AWS ECR</td>
                        <td>Backend API containerization and repository</td>
                    </tr>
                    <tr>
                        <td>ReactJS</td>
                        <td>Application frontend</td>
                    </tr>
                    <tr>
                        <td>AWS S3</td>
                        <td>Application frontend hosting</td>
                    </tr>
                </tbody>
            </table>

            <h2>Rating System</h2>
            <p className="post-body">The rating system used in this project is a simple implementation of an Elo rating system based on all the games provided in the data.  Teams initially have a rating of 1000 and are rewarded or deducted points based on the outcome of each match.  Before a match, the probability that each team will win is calculated based on their Elo entering the match:</p>
            <MathJaxContext>
                <div className="d-flex justify-content-center mb-3"><MathJax dynamic inline>{"\\(probability_{team1} = \\frac{1.0}{1.0 + 10^{\\frac{elo_{team2} - elo_{team1}}{400}}}\\)"}</MathJax></div>
            </MathJaxContext>
            <p>Based on the calculated outcomes, if the expected team wins, they will be awarded points based on their probability of victory entering the match.  This value is calculated as a scalar multiplied by the probability.  The losing team's Elo will decrease by the same value.</p>
            <MathJaxContext>
                { /* eslint-disable-next-line */ }
                <div className="d-flex justify-content-center mb-3"><MathJax dynamic inline>{"\\(new\~elo = scalar * win\~probability\\)"}</MathJax></div>
            </MathJaxContext>
            <p>Using this scheme, teams who are favored to win and do win are rewarded with a smaller number of points than teams that are expected to lose but end up winning (an upset).  On the other hand, teams that are predicted to lose and do lose are not penalized as harshly as teams that are expected to win but end up losing.</p>
            <p>When calculating the scalar value, I wanted to determine a value that most frequently predicted the expected winner.  I did this by testing possible values from 1 to 500, and in each iteration keeping track of the number of upsets encountered.  It turns out that in this range, 74 was the scalar value that most-accurately predicted games, with an upset percentage of 37.54%.  Worth noting is that as the rating system starts in an “untrained” state, upsets don't necessarily represent inaccuracies.</p>
            <p>Using this system, I wrote a set of Python scripts to query Athena for the data that I wanted, namely teams and the games that they played.  I ran these inputs against the rating system, and published the data to DynamoDb, which I wanted to use as a production data store. </p>

            <h2>Backend</h2>
            <p>To facilitate interactions with the DynamoDb, I wrote an API in Java using the Spring framework.  Spring was selected due to my familiarity with the framework, but also because I wanted the API to be portable and easily containerized.  Spring also has excellent package support and is easy to get up and running quickly.</p>
            <p>The API is built mostly to the spec provided, with a few exceptions.  First, I wanted to include the ELO rating as part of the ranking results, so that it could be displayed in the frontend.  Second, I added a few endpoints for getting the entire set of teams and tournaments, also for utility purposes for the frontend.  Lastly, I added a simple health endpoint for ALB health checks.</p>
            <p>To host the backend, I chose AWS Fargate.  I wanted to run the Spring application as a container for ease of deployment, which gave me three good options in the AWS ecosystem:  ECS, EKS, and Fargate.  While I like the customizability of Kubernetes, I wanted something that was a little less time-intensive for bootstrapping the app, and EKS pricing is a bit on the expensive side.  ECS is fine, but I didn't want to spend too much time managing instances.  Finally I settled on Fargate, which provides a serverless environment for running the containerized application.  </p>
            <p>Setup was really easy, and I was able to configure a load balancer and target group as part of the initial setup, which was a nice plus.</p>
            
            <h2>Frontend</h2>
            <p>I wanted to serve the API through a frontend to make a full stack user experience.  I chose React as my Javascript framework, mostly because it's what I'm most familiar with.  In terms of the user-experience, the way that I felt that the API definition provided could be best represented is as a set of search fields and filters over the global dataset.  Because of this, I designed the app as a single-page application, which by default serves the global leaderboard.  Expanding the dropdown of filters reveals a tournament selector and a team selector.  When a tournament is selected, the “teams” input is disabled, and a new optional field appears to specify a stage in that tournament, which will further filter the results.  For the team selector, any number of teams can be searched for via the input and selected via the dropdown.   Applying the filter will refresh the results list.</p>
            <p>To host the web interface, I went with AWS S3 because of the near-zero cost and ease of setup.  Since the Javascript application can be built into static resources, there's no real server cost associated with serving the frontend in this way.</p>
            
            <h2>Future Improvements and Lessons Learned</h2>
            <p>In future stages, I would like to improve the ranking methodology by including a time component to the ranking.  For example, I would have liked to implement a form of logistic decay for the Elo rating, so that over time between games, a team's Elo will decrease slowly at first, then more rapidly as more time passes.  The thinking behind this is that teams may be unfairly rewarded under the current system for not playing games, as their Elo will not change at all.  Additionally, teams that are “in practice” by continuously playing will not see unfair decay in their rating.  In implementing such a mechanism, I would have liked to have mapped team success over time against the amount of time between their games and have found a regression model that would best fit the data.  That regression model could then be used as a decay function.</p>
            <p>If I had time to flesh out the user interface, I would have made the interface a multi-page application.  While I think the filter is functional, and the single-page application has the benefit of simplicity, I think that users would be more comfortable if I had more clearly separated the global, team, and tournament rankings into separate navigational components.</p>
            <p>On the backend, I would have liked to have added SSL termination on the application load balancer, an authentication mechanism with throttling, and a caching layer over the DynamoDb.  SSL would require creating a domain for the application, which would be easily doable with more time.  Authentication would have taken considerably more work and would have complicated testing, but I would have liked to have used AWS Cognito as a tool for giving API access to the frontend.  Additionally, I could have implemented a throttle mechanism to protect the backend from a spike in requests from any one client.  In terms of database caching, some of our operations (like getting all the tournaments) require scanning a DynamoDb table, which is a costly operation.  Obviously under the given constraints, I could have just hardcoded the tournaments, but I wanted to model what a real application might look like.  If this application were being used in a real-world application, these expensive database queries could be cached, so that identical requests don't consume read capacity on the DynamoDb.</p>
            <p>One of the lessons I learned early on was to simplify the problem.  While I think digging deep into the data provided would have been interesting, ultimately the most important thing for my project was to get a working prototype that met the project requirements.  For my particular case, the data that I really needed to get to was the games and the teams involved, so I had to ignore the flashy data provided in some of the other tables.</p>
            <p>On the other hand, I ended up spending quite a bit of time on the API and frontend, which I think could have been better spent refining the ranking methodology.  While I'm glad that I added some user-interface-polish to the project, I find myself wishing that I had more time with the data.</p>

        </div>
    );
}

export default Powerranks;