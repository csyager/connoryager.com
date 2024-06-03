import githubImage from '../../images/github.png';
import CodeSnippet from '../CodeSnippet';
import CanvasImg from '../../images/projects/soback-canvas.png';
import MoodMeter from '../../images/projects/mood_meter.jpg';

export default function SoBack() {
    return (
        <div className="post-content">
            <h1 className="display-4">We're So Back - A Mood-Sharing Web Application</h1>
            <h5 className="text-muted">Jun 3, 2024</h5><br />
            <p><img src={githubImage} alt="github" className="github-intext" /> This project is on GitHub!  Click <a href="https://github.com/csyager/we-are-so-back" target="_blank" rel="noreferrer">here</a> to view!</p>

            <div className="post-header-img">
                <figure>
                    <img src={MoodMeter} alt="mood-meter" className="img-fluid"/>
                    <figcaption className="figure-caption">The (slightly-redacted, for the sake of professionalism) mood meter, which plots a person's energy vs. their pleasantness to find their current mood.</figcaption>
                </figure>
                
            </div>

            <p className="post-body">To set the scene a bit - a few months back I was on a skiing trip with some friends.  A popular meme at this time was to send your friends a picture of "the mood meter" and ask them to rate their current mood across two axes - unpleasant to pleasant and low energy to high energy.  Your position on these axes maps to a "mood," generally indicating if you're having a good time or not.</p>
            <p className="post-body">One of my friends commented that it would be nice if this came in the form of an app, so you could track your friends' moods real time.  I figured that sounded simple enough, so I threw one together.  I approached this problem with something of a hackathon mentality - I had a simple enough problem to solve, a vision of an interface, and a few simple use cases that I wanted to support.  It's certainly not a polished project, but it was fun to make and functional enough to share, so I'm writing about it here.</p>
            <hr />
            <h2>Backend</h2>
            <p className="post-body">Two things I wanted to prioritize when setting up the backend were cost and simplicity.  AWS Serverless Application Model (SAM) is essentially a layer over cloudformation that simplifies the setup of a few key serverless resources, like an API Gateway, Lambda Functions, and DynamoDB Tables.  It also provides some local testing capabilities out of the box, which were convenient during development.  I'm not really sure how it compares to things like the Serverless Framework since I've never used that before, but as I understand it has similar features and it's a simple enough way to setup some infrastructure-as-code.  In total, the SAM template sets up:  An API gateway with events, endpoints, and verbs that route to the handler Lambda, a Lambda function that handles the requests, and two DynamoDB tables (explored more later).</p>
            <p className="post-body">To further simplify, I wanted to use a single lambda function to serve requests.  Because requests are short lived database queries and updates and the executable is fairly small, I don't feel too bad about doing this.  If I wanted to fully decouple this component, I could have setup several Lambdas, each handling a separate API endpoint, but that seemed like overkill.  Instead, I used <a href="https://github.com/sivel/flask-lambda" target="_blank" rel="noreferrer">flask-lambda</a>, a pretty simple wrapper for a Flask application that does all the setup necessary to run it as a Lambda function.  This let me use Flask's helpful routing logic to setup handlers for each API verb and endpoint.</p>
            <p className="post-body">Input validation is often annoying and tedious.  I wanted to use something like Jackson, which handles data serialization and can perform validation against JSON objects when converting to Java classes.  For this I went with <a href="https://marshmallow.readthedocs.io/en/stable/" target="_blank" rel="noreferrer">Marshmallow</a>, which does class-based schema enforcement.  This was pretty easy to setup and use out-of-the-box.</p>
            <hr />
            <h2>Data Layer</h2>
            <p className="post-body">Again, to save on cost I really didn't want to use a dedicated database.  DynamoDB bills by storage volume and offers on-demand billing for queries, which both sound good for me.  Additionallly, NoSQL offers some flexibility in terms of a variable data model, and I didn't really expect to need many relational structures, so it seemed like a good fit.</p>
            <p className="post-body">The data model really just consists of two tables:</p>
            <ul>
                <li>GamePlayersTable
                    <ul>
                        <li><b>game_id</b> - String partition key that identifies the game</li>
                        <li><b>player_id</b> - String sort key that identifies the player</li>
                        <li><b>x_coord</b> - Numerical x-coordinate</li>
                        <li><b>y_coord</b> - Numerical y-coordinate</li>
                    </ul>
                </li>
                <li>GamesTable
                    <ul>
                        <li><b>game_id</b> - String partition key that identifies the game</li>
                    </ul>
                </li>
            </ul>
            <p className="post-body">The <code className="inline">GamePlayersTable</code> contains all the player information needed in a game session.  The <code className="inline">game_id</code> attribute is a unique identifier for an ongoing game.  The <code className="inline">player_id</code> attribute uniquely identifies a player.  DynamoDB tables work like gigantic hash tables, split among fleets of servers that are unseen to the end customer.  The partiiton key (or hash key) is hashed to find which partition the data resides on when a query is submitted.  Within a partition, items are sorted by their sort key, if they have one.  If you're using a partition and a sort key, together they form the primary key for the database record (meaning that it uniquely identifies the record).  In our case, this means that we can get all the records for a given game_id in a single query, and that each game_id/player_id pair uniquely identifies a record.</p>
            <p className="post-body">The <code className="inline">GamesTable</code> contains just a list of game IDs.  When a player joins a game, this table is referenced to make sure that the game exists.  The reason that we don't use the GamePlayersTable to serve this purpose is that if a player starts a game but hasn't submitted any data yet, the game would be unfindable.  This just seemed like a simple enough solution to the problem, so I went with it.</p>
            <hr />
            <h2>Frontend</h2>
            <div className="post-img-left">
                <figure>
                    <img src={CanvasImg} alt="We're so back canvas screen" className="img-fluid" />
                    <figcaption className="figure-caption">The canvas screen, showing three players (the current player is the green crosshair, not shown in the list)</figcaption>
                </figure>
                
            </div>
            <p className="post-body">For the frontend I went with React, because it's a framework that I'm familiar with and continues to be used frequently in industry.  Something that I don't usually do though is use Typescript.  This was a long-overdue exercise, as Typescript is generally favored due to providing type safety that Javascript famously does not have.  In all, I think I've been converted.  There are some situations where typing was a little annoying since I've become used to Javascript not caring about such details, but I can imagine that in all it saved development time that would otherwise have been spent digging through console logs to figure out why an object is not being parsed correctly.  To each their own, but I'd say it was a more idiomatic experience.</p>
            <p className="post-body">The frontend consists of two screens, though it's a single-page application.  The Login screen allows users to either join a game using a screenname and game ID or start a new game.  State is maintained in the device's local storage (I'll come back to this), so once a game is joined the user is directed to the Canvas screen.  On the canvas screen the user can click or tap to place a crosshair on the graph, as well as see the positions placed by other players in the game, along with their chosen screen names.  When the page is loaded, a request is made to the API to get all existing <code className="inline">GamePlayersTable</code> entries with the given game ID.  This populates the graph with crosshairs for each players selected position.</p>
            <p className="post-body">Ok, why use local storage for state?  I expect that the app will be used intermittently over the course of a day, week, month, etc.  Even if a user closes their browser or the tab running the game, I want them to be able to pick up where they left off, without being kicked out of the game they were playing.  A React component would lose the state in that situation.  Since the data footprint is quite small (just a game_id and a player_id), local storage seemed to be the best way to go.</p>
            <p className="post-body">When a player taps the graph, two things happen - first, a crosshair is drawn on an <code className="inline">HTMLCanvasElement</code>, and second, an API call is made to create or update an existing record on the <code className="inline">GamePlayersTable</code> with the X and Y coordinates of their placement.</p>
            <p className="post-body">The X and Y coordinates present an interesting issue.  For the application to be responsive to screen size, the graph dimensions will need to vary depending on the viewport of the player.  If we just stored the coordinates as raw pixel values, a point on one device would be in a different location than the same point on another device.  Fixing this is easy enough - when the player taps the graph, their pixel-based coordinates are converted to a fractional-representation.  (0, 0) represents the top-left corner of the image, (1, 1) represents the bottom right, and (0.5, 0.5) represents dead-center.  The coordinates are stored in the database in their fractional-representation and converted back to a pixel-based representation when they are read.  This preserves the position on the graph regardless of it's dimensions on the players viewport.</p>
            <p className="post-body">When a game is created, the backend responds with a randomly-generated game ID.  To make it easier for players to share the game with friends, I added a "copy" function that copies a shareable URL.  The URL includes the game ID as a query parameter.  When the login page loads, if the query parameter is set it will auto-populate the game ID.  I think this is a pretty nice touch, as it removes the need for tedious copy-pasting and facilitates spreading the game via word-of-mouth.</p>
            <hr />
            <h2>Known Issues, Improvements, etc.</h2>
            <p className="post-body">Probably the biggest issue is that there is no sort of validation that you are who you say you are when you join a game.  For example, if one player joins a game using one alias, and another joins the game with the same alias, they both would be permitted to move the same crosshair on the graph.  I realized this while I was building it, but chose not to make it a concern - after all, it's a prototype.  I wanted to prioritize the ease of joining a game over worrying that people may misuse the application.  That said, if I wanted to market this to a larger audience, that would likely have to be addressed.</p>
            <p className="post-body">Another concern is that players could manipulate their own local storage to change the application state.  Again, I'm not too worried about this.  The worst case scenario is that they would end up in a game by themselves.  Still, improving the application state management would be a nice addition.</p>
            <p className="post-body">Realistically, I'm not too concerned about an influx of requests causing issues on the API or database side.  If this application were to grow though, adding some throttling mechanism and validating that the game you're writing to is valid would probably be a smart thing to do.</p>
            <p className="post-body">In terms of fun featuers, one suggestion I've already received is to allow users to upload a profile image or avatar that could be placed instead of a crosshair.  I like that idea, the only issue would be storing the images in a way that doesn't become prohitively expensive.  I'd also be concerned about the content being uploaded.  Maybe a meet-in-the-middle solution would be to provide a small library of avatar images that can be placed instead.  Another idea I had was to let users upload their own graphs or other images to use, though this has the same concern.  Supporting a larger library of games though would be simple enough.  If you have any suggestions, feel free to comment them below.</p>
            <hr />
            <h2>Local Testing</h2>
            <p className="post-body">One of the biggest advantages I found using SAM was that local testing was relatively straightforward.  In particular, using Docker to setup the testing environment made everything pretty easy.  If you look at the <code className="inline">template.yaml</code>, you might notice that I pass a parameter <code className="inline">ExecEnv</code>, which can be either local or prod, defaulting to prod.  When I run the SAM API locally, I pass a parameter, like this:</p>
            <CodeSnippet code={"sam local start-api --parameter-overrides ExecEnv=local"} language="shell" showLineNumbers={false} />
            <p className="post-body">In my Lambda handler function, I get the ExecEnv parameter, and if it's set to local I setup the DynamoDB resource using a local endpoint.  This directs database calls to a running instance of <a href="https://hub.docker.com/r/amazon/dynamodb-local" target="_blank" rel="noreferrer">dynamodb-local</a>, which is provided by AWS for local testing.  The <code className="inline">sam local start-api</code> command also runs as a Docker container.  Between these two containers I can fully simulate the service running in the cloud.  Neat!</p>
            <hr />
            <h2>Conclusion</h2>
            <p className="post-body">In all, this was a fun project.  I'd welcome any feedback or contributions, and if this seems like fun feel free to give it a try with your friends!  I'll leave a link to the prototype below.  Thanks for reading!</p>

            <a href="https://soback.connoryager.com" target="_blank" rel="noreferrer">soback.connoryager.com</a>
        </div>
    )
}