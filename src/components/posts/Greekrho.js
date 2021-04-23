import greekrhoImage from '../../images/posts/greekrho.png';
import githubImage from '../../images/github.png';

function GreekRhoPost() {
    return (
        <div className="container post-content">
            <h1 className="display-4">GreekRho Beta Launch</h1>
            <h5 className="text-muted">Sep 19, 2020</h5><br />
            <p><img src={githubImage} alt="github" className="github-intext" /> This project is on Github!  Click <a href="https://github.com/csyager/greeklink-core" target="_blank" rel="noreferrer">here</a> to view!</p>
            
            <div className="post-header-img">
                <img src={greekrhoImage} alt="greekrho" className="img-fluid" />
            </div>

            <p className="post-body">I’m excited to announce that GreekLink has been officially rebranded as GreekRho, and that we’ve begun our beta testing phase with organizations on grounds at UVA!  We’re starting small, using my fraternity Delta Sigma Phi and another member of the team’s fraternity Alpha Sigma Phi as beta testers, but we’re really excited to be working with clients and shaping the direction of the site’s development alongside them.  While this semester certainly won’t look how we had planned, with social and recruiting events effectively on standby until the end of the semester, it’s our hope that we can get enough hands on the site that we can figure out what needs to be changed and what features need to be added or expanded, so that the application is ready to help organizations hit the ground running once things get back to normal.</p>

            <p>I believe that our application has the potential to seriously disrupt the existing standard for student organizations.  From experience in my own fraternity, we pay hand over foot for subscriptions to segmented services that only solve one or two of our problems at a time.  For example, we pay hefty subscription fees for a financial application that tracks dues payments and provides an online location for submitting payments each semester.  We rely on UVA’s infrastructure for communicating among our members, with little to no privacy of that communication.  We have historically not paid for a rush service, because it’s too expensive and doesn’t offer services that are shaped by our rush practices.  GreekRho hopes to solve many of these problems by offering a central location for all of these services, offering it at a competitive price that beats out what any one of those services would demand, and shaping the service alongside the organizations that use it to ensure that the organization gets everything it needs and nothing it doesn’t.</p>

            <p>Part of that initiative is that our project is <b>open source</b>!  If you’re technically motivated, please feel free to make contributions to our project on Github!  We value feedback from users so highly that we welcome contributions to our source code, and believe that this collaborative approach will make us more able to interface with our clients.  For those users who are less technically inclined, we’ve put a huge emphasis on our support feature, which allows users to submit feature requests, bug reports, and any general feedback so we know what they want and what they don’t.  Additionally, our service is built on Amazon Web Services, and while so far we’ve been able to build within the free tier, passing no cost on to our users or ourselves, we want to accurately gauge the usage of the site, so we can better plan for the costs of operation once we start servicing more organizations.  This means that once we inevitably need to start charging for the usage, we can determine a fair price to pass to the users without ripping them off on exorbitant subscription fees.</p>

            <p>As I’ve said already, I really couldn’t be more excited to be bringing this site to a user base.  Creating applications that serve a purpose is my passion, and seeing a project get use and grow is the most fulfilling thing I do.  If you would like more information regarding the beta, or are interested in what GreekRho could do for you and your organization, shoot us an email at <a href="mailto:support@greek-rho.com">support@greek-rho.com</a>.  There’s a lot more work to be done on the site, and a lot more growth to come!  Keep an eye out for our next release and our next great feature!</p>

        </div>
    );
}

export default GreekRhoPost;