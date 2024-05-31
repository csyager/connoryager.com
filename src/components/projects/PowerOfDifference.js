import powerofdifferenceImage from '../../images/projects/powerofdifference.png';
import githubImage from '../../images/github.png';

function PowerOfDifferenceProject() {
    return (
        <div className="container">
            <h1 className="display-4">Power of Difference Survey</h1>
            <h5 className="text-muted">Jun 20, 2020</h5><br />
            <p><img src={githubImage} alt="github" className="github-intext" /> This project is on Github!  Click <a href="https://github.com/uva-cp-1920/The_Sum" target="_blank" rel="noreferrer">here</a> to view!</p>
            
            <div className="post-header-img">
                <a href={powerofdifferenceImage}><img src={powerofdifferenceImage} alt="Power of Difference landing page" className="img-fluid" /></a>
            </div>

            <b>Abstract</b><br />
            <blockquote className="blockquote">
            The Sum is a Charlottesville-based non-profit, with the stated goal of helping people learn about their implicit biases and understand how to better communicate with people of other backgrounds. Their Power of Difference Assessment, or PDA, is a tool used to identify these implicit biases and collect data that professionals at The Sum can use to consult the assessment taker. Under the initial PDA system, a lack of automation prevented scaling to a larger user base, restricting the growth of the organization and its ability to collect data. Our team was tasked with enhancing the system with features that would allow it to serve as a tool in institutional studies, with the ability to support thousands of assessment-takers and collect meaningful data for use in research.
            </blockquote>

            <p className="post-body">As part of the UVA engineering curriculum, all fourth year students are required to complete a capstone project, meant to be the culmination of what they have learned over their four years. For computer science students, this meant that we would be creating a project based on the requirements and specifications of a client, who was not necessarily of a technical background. At the beginning of the year several clients came to our classroom to pitch their projects to us, and we ranked our favorite choices to find a match.</p>
            <p>My project was with a nonprofit in the Charlottesville area called The Sum. The Sum’s stated goal is to stand in solidarity with all people, and to take strides towards a more just and equitable world for people of all backgrounds. One of their offerings towards this end is the Power of Difference Assessment, which is an online assessment that helps identify implicit biases. By first answering 19 demographics questions and then rating their agreement or disagreement to 70 statements, consultants at The Sum can collect enough data to have a meaningful conversation with the assessment taker about their implicit biases and how they can combat them.</p>
            <p>Our job was to take the existing system, which was thrown together somewhat haphazardly using some Javascript and HTML, and create a new system that could scale to thousands of users so the assessment could be used for institutional studies. In its original form, the assessment could only handle one test taker at a time, and relied heavily on the consultants at The Sum to collect the data manually when they were done before they could compile a report on the results. This obviously wouldn’t work if thousands of people were taking the assessment, so we had to automate everything from starting the test and collecting basic contact information from the user to scheduling consultations when the assessment was over.</p>
            <p>This project resonated with me in a lot of ways. First, being interested in consulting it was fun to be working with a client. I find that the most enjoyable parts of engineering are not when I have to sit by myself and grind on work quietly, but when I can interact with others and toss ideas around and generally collaborate to make something cool. Having a non-technical client kind of forced our team to do that. Secondly, being interested in web development it was fun to take our requirements and really build out an improvement that could scale to a bigger user base. None of the projects I had worked on in class or for fun had ever had a very big user base, so it always felt kind of amateurish. Intentionally designing a system that could support so many users felt very professional, and gave me a confidence boost that I could work on large and scalable projects. Lastly, working with a nonprofit with such a just purpose brought some satisfaction as well. Having taken the assessment several times, I feel that it really is different from any other “bias test” out there, and I believe that the work being done at The Sum has a lot of value. Implicit biases are everywhere in our world, and they’re extremely dangerous. Working on the project felt like working to eliminate them, which was something I really enjoyed.</p>
        
        </div>
    );
}

export default PowerOfDifferenceProject;