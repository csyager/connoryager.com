import scikitLearnImage from '../../images/projects/scikit-learn.png'
import { library } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import {
	faGithub
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faGithub)

function Results(props) {
	if (props.showResults) {

		if (props.isLoading) {
			return(
				<div className="d-flex justify-content-center">
					<PulseLoader color="#8EFF4F" loading="true" />
				</div>
			);
		} else {
			if (props.errorMessage) {
				return(
					<div className="d-flex justify-content-center">
						<h2>Error: {props.errorMessage}</h2>
					</div>
				)
			} else {
				return(
					<div className="d-flex justify-content-center">
						<h2>Predicted winner: {props.predictedWinner}</h2>
					</div>
				);
			}
		}
	} else {
		return null;
	}
}

function PredictionForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const [player1, setPlayer1] = useState("");
	const [player2, setPlayer2] = useState("");
	const [predictedWinner, setPredictedWinner] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setPredictedWinner("");
		setErrorMessage("");
		setIsLoading(true);
		setShowResults(true);
		const url = "https://pqkmgs4ll9.execute-api.us-east-1.amazonaws.com/Prod/classify?";
		const p1_encoded = encodeURIComponent(player1);
		const p2_encoded = encodeURIComponent(player2);
		const full_url = url + 'p1=' + p1_encoded + '&p2=' + p2_encoded;
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		};
		const response = await fetch(full_url, requestOptions);
		const statusCode = await response.status;
		const body = await response.json();
		if (statusCode === 200) {
			setPredictedWinner(body['winnerName']);
			setIsLoading(false);
		} else {
			setErrorMessage(body['errorMessage']);
			setIsLoading(false);
		}
	}

	return (
		<div className="container tennis-form-container">
			<div className="card form-card" style={{"verticalAlign": "middle"}}>
				<div className="card-body">
					<form onSubmit={e => { handleSubmit(e) }}>
						<div className="row" style={{"padding": "20px"}}>
							<div className="col">
								<div className="form-group">
									<label htmlFor="player1">Player 1</label>
									<input type="text" className="form-control" id="player1" placeholder="Enter name of first player" value={player1} onChange={e => setPlayer1(e.target.value)}/>
								</div>
							</div>
							<div className="col-2"> vs. </div>
							<div className="col">
								<div className="form-group">
									<label htmlFor="player2">Player 2</label>
									<input type="text" className="form-control" id="player2" placeholder="Enter name of second player" value={player2} onChange={e => setPlayer2(e.target.value)} />
								</div>
							</div>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
					<br />
					<Results isLoading={isLoading} showResults={showResults} predictedWinner={predictedWinner} errorMessage={errorMessage}/>
				</div>
			</div>
		</div>
	)
}

function TennisMLProject() {
	return (
		<div className = "container post-content">
			<h1 className="display-4">Tennis ML Predictor</h1>
			<h5 className="text-muted">Sep 14, 2021</h5><br />
			<p><FontAwesomeIcon icon={faGithub} /> This project is on Github!  Click <a href="https://github.com/csyager/tennis_ml" target="_blank" rel="noreferrer">here</a> to view!</p>

			<div className="post-header-img">
				<a href="https://scikit-learn.org/stable/"><img src={scikitLearnImage} alt="Scikit Learn" className="img-fluid" /></a>
			</div>
			<p className="post-body">Former world #1 tennis player Andre Agassi once said that "Tennis is the loneliest sport... Only boxers can understand the loneliness of tennis players."  As a competitive player for many years in my youth, I think I can see what he means.  In a sport that demands precision and strategy over the course of a multiple-hour match, it can be really difficult to maintain focus.  You can't just play harder, run faster, or go for bigger shots, you need to play <i>smarter</i>.  You need to find inner calm and resolve to beat the person on the other side of the net, even when things aren't going your way.  That inner calm can't come from anyone but yourself.  In boxing, you might draw strength from anger at the enemy, and wanting to hit them harder than they hit you.  In tennis they're too far away to make you angry.  That's probably why you'll see a lot more racquets smashed on the ground than fights in a professional tennis match.  The only person to be angry with is yourself.</p>
			<p>Something that makes tennis even more difficult (and interesting) is that it is in many ways a numbers game.  Each point in a tennis match is not created equally -- you can even win a match having won fewer points than your opponent.  The two services are not created equally, since you can afford to sacrifice precision on your first serve in exchange for more power or better placement if you are confident you'll hit the second one.  You can even drop a set 6-0, if you're confident you'll win the next two. The problem is, once those numbers start to stack up the situation can start to feel hopeless.  If you lose your service in the first game of the set, your odds are already looking down.  How do you find the motivation to turn things around?</p>
			<p>Between the individual nature and the numerical qualities of the game, tennis is a great candidate for statistical analysis.  With no outside factors and the discrete nature of the game (points make games make sets make matches make tournaments), statistics like a player's ace percentage can be accurately tracked, and these metrics likely demonstrate expected success.  So... I combined my interest in tennis with my interest in computers and machine learning to train a classification model to predict the outcome of matches.</p>
			<PredictionForm /><br />
			<p>This form executes an AWS Lambda function that loads a model that I trained locally, then runs a classification algorithm to determine which player would be expected to win in a matchup.  The model is trained by parsing all the ATP tennis matches over the past 5 years, a dataset of about 15000 matches.  For each match, a list of statistics for the two players is scraped from the internet (specifically, <a href="http://tennisabstract.com" target="_blank" rel="noreferrer" >tennisabstract.com</a>, a really great open source data set of match data).  The data is all combined into a .csv file that contains the statistics of the two players and an identifier that shows which of the two sets of statistics was the eventual winner.  This data set is used to train the model, which is then exported and can be used to make a decision between two players' statistics sets to predict the winner.</p><br />
			<h2 className="display-5">Statistics Tracked</h2>
			<table className="table table-responsive-md">
				<thead>
					<tr>
						<th scope="col">Statistic</th>
						<th scope="col">Explanation</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>matches_played</td>
						<td>Matches played over the course of their career</td>
					</tr>
					<tr>
						<td>balanced_leverage_ratio</td>
						<td>Ratio of important points won to lost.  A measure of "clutchness"</td>
					</tr>
					<tr>
						<td>dominance_ratio_plus</td>
						<td>Dominance ratio (percent of return points won divided by percent of service points lost) multiplied by balanced_leverage_ratio.  A measure of performance adjusted by "clutchness"</td>
					</tr>
					<tr>
						<td>excitement_index</td>
						<td>Average leverage rating of all points.  Leverage measures impact of a point on probability of winning the match.  A point at 4-1, 40-0 has low leverage, as probabilty of victory is already very high.</td>
					</tr>
					<tr>
						<td>comeback_factor</td>
						<td>1 divided by win probability of lowest probability win</td>
					</tr>
					<tr>
						<td>deuce_ace_percentage</td>
						<td>Ace percentage when serving to deuce court</td>
					</tr>
					<tr>
						<td>deuce_service_point_won_percentage</td>
						<td>Point win percentage when serving to deuce court</td>
					</tr>
					<tr>
						<td>ad_ace_percentage</td>
						<td>Ace percentage when serving to ad court</td>
					</tr>
					<tr>
						<td>ad_service_point_won_percentage</td>
						<td>Point win percentage when serving to ad court</td>
					</tr>
					<tr>
						<td>deuce_return_point_won_percentage</td>
						<td>Point win percentage when receiving in deuce court</td>
					</tr>
					<tr>
						<td>ad_return_point_won_percentage</td>
						<td>Point win percentage when receiving in the ad court</td>
					</tr>
				</tbody>
			</table>
			
			<h2 className="display-5">Limitations</h2>
			<p>As a test of this model, I used the 2021 US Open draw to see how it would do predicting outcomes.  I managed to work backwards from the championship to the third round before getting tired.  Over those rounds, it got 20/31 of the matches correct, for a percentage of ~64.52%.  Which, all things considered, isn't bad.  One trend that I noticed is that it was a lot better in earlier rounds than later ones (6/8 in the fourth round, 11/16 in the third round, vs. 1/4 in the quarters, 0/1 in the finals).  This makes sense, as in the earlier rounds the seeded players are playing opponents considered to be less likely to win, so if I were to analyze every match in the tournament I would expect a much higher percentage.  Another pattern is that the model was unlikely to predict upsets, which depending on how you look at it could actually be a good thing - if this model picks the same players to win as the method the US Open officially uses, it must be doing something right!</p>
			<p>There was one set of upsets that the model got right though, which is actually probably what I'm most excited about.  If you were following the tournament this year, you might know about the crazy run that Botic van de Zandschulp had.  Botic is a Dutch player who entered the tournament through the qualifiers, which are a series of matches before the main draw.  Usually qualifiers don't make it terribly far, as the better players qualify directly for the main draw (although if you followed the women's bracket, Emma Radacanu became the first qualifier in history to make the final, and also the first to win, historic tournament!).  Botic ultimately went as far as the quarterfinals, beating the 8 seed Casper Ruud and the 11 seed Diego Schwartzman before losing to 2-seed and eventual champion Daniil Medvedev.  What's exciting is that the model actually predicted van de Zandschulp's upset wins in the third and fourth rounds.  That's pretty cool, since nobody would have picked van de Zandschulp to make it very far at all.</p>
			<p>So what are some limitations of this model?  Firstly, this model compares career statistics.  This means that a veteran player likely gets a leg-up on younger players who have had less time to accumulate statistics.  Consider a player like Roger Federer, who (regrettably) is past his prime.  His statistics from his younger, dominant days give him a boost in the decisioning over younger players who might be more likely to beat him.</p>
			<p>Another improvement is (of course) a larger dataset.  This model is trained on matches from the last 5 years.  15,000 matches sounds like a lot, but if I could analyze decades instead of years, the model would be improved.  The reason I didn't do that is partially incomplete data.  Many of the players before 2010 don't have the same career statistics compiled as the ones in the last 5 years, presumably because this is an open-source data project and the compilers of that data just haven't gotten to it yet.</p>
			<p>Finally, related to the web-scraping, programmatically getting the data for every player turned out to be a challenge, usually because of inconsistencies in the names of players between the match records and the site I was using to scrape statistics.  For example, "Carlos Alcaraz" in the match records is "Carlos Alcaraz Garfia" on the stats website, and my program wasn't able to sort out the difference.  Rather than populate the training set with placeholder values that could throw off the result, I just discarded matches that I couldn't scrape good data for.  The pro to this is that the data is clean and the model is trained on good data, the bad side is that ultimately a lot of data is lost doing this.</p>
			<h2 className="display-5">Improvements</h2>
			<p>If I get a chance to come back to this project, there's a few improvements I would make.  First of all, I'd compile a larger data set, as large as was feasible.  More matches means a better model.  I would also increase the dataset horizontally, with more statistics being tracked.  I think the ones that I scraped are very good indicators of success, but it would be interesting if I could work in more contextual information, like how often a player comes to the net, or serve speed or location, or any number of contextual stats.  <a href="http://tennisabstract.com" target="_blank" rel="noreferrer">tennisabstract.com</a> has more statistics available, it would just be a matter of sourcing and scraping it.  Finally, cleaner data is always better.  If I had more time I would go back and edit the players' names who were causing trouble with the scraping.  This would give me hundreds more records for training, and even more if I was able to scrape for earlier dates.</p>
			<br />
			<p>All in all, this was a fun project, and a good foray into machine learning.  I've been interested lately in how data all around us can lead to conclusions that a human couldn't notice themselves.  I think of AlphaGo, which was a program that plays the board game Go, and defeated the best human players in 2017.  Go is thousands of years old, and the computer was able to develop strategies that no human had ever considered.  Presumably, the same secrets could be found in our sports. Perhaps one day a machine-learning program will discover the secret to tennis lies in one particular statistical category, or some combination of skills that make the most elite players.</p>
		</div>

	)
}

export default TennisMLProject;
