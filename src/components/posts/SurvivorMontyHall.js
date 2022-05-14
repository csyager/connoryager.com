
import survivorMontyHall from '../../images/posts/survivor_monty_hall.png';
import {MathJaxContext, MathJax} from 'better-react-mathjax';
import MontyHallGame from "../MontyHallGame";

function SurvivorMontyHall() {
    return (
        <div className="container post-content">
            <h1 className="display-4">Monty Hall and <i>Survivor</i>'s Do or Die Game</h1>
            <h5 className="text-muted">Dec 2, 2021</h5><br />
            
            <div className="post-header-img">
                <img src={survivorMontyHall} alt="monty hall" className="img-fluid" />
            </div>
            <MathJaxContext>
                <p>If you're a fan of <i>Survivor</i> or a fan of probability (or both?), you may be interested in the strategy behind the <i>Do or Die</i> game from Dec. 1st's episode of the 41st season.  In the game, contestant Deshawn Radden came in last place during an immunity challenge, and as a result had to play a game of chance to determine his fate at the next tribal council.  If he wins the <i>Do or Die</i> game, he is immune from the vote (for the uninitiated, at every <i>Survivor</i> tribal council the contestants cast votes for their fellow tribe mates, with the contestant receiving the most votes removed from the game).  If he loses however, he would be unceremoniously removed from the game without holding a vote.  This twist to my knowledge has never been used before, and a contestant being removed from the game without a vote is highly unusual, so one couldn't fault Deshawn for not being prepared, but let's put it this way:  <b>it's a really good thing Deshawn was not familiar with this problem.</b></p>
                <p>At tribal council, Jeff Probst (the host who is synonymous with <i>Survivor</i> itself) presents Deshawn with three boxes.  One contains a fire emblem, representing life and immunity.  The other two contain skulls representing death and a swift exit from the game.  Deshawn is asked to choose a box, choosing the left most of the three.  Jeff, with the remaining two boxes in front of him, opens one of the two boxes to reveal one of the two skulls.  He then presents Deshawn with a choice:  either keep his box or switch for the third, unopened box.  A fellow contestant, Xander Hastings, can be heard whispering, "It's the Monty Hall problem!"  Deshawn chooses to stick with his gut and keep his box.  When he opens it, he reveals the flame and earns immunity in the upcoming vote, steered clear of danger by his gut instinct.</p>
                <p>This problem is called the <b>Monty Hall Problem</b>, so named for the host of the game show <i>Let's Make a Deal</i> in which it was famously played.  While it seems simple enough, the optimal strategy in this problem is often held up as an example of a <code className="inline">verdical paradox</code>, meaning that the solution seems absurd but is true nonetheless.  Many people when facing this problem assume that there is a <MathJax dynamic inline>{"\\(\\frac{1}{3}\\)"}</MathJax> chance of picking the correct value, and that this number doesn't change even when the offer to switch boxes in presented.  While this may be intuitive, as it turns out it is actually not the case.</p>
                <p>When the choice of boxes is initially presented, the player has a <MathJax dynamic inline>{"\\(\\frac{1}{3}\\)"}</MathJax> chance of selecting the box with the flame inside, while there is a <MathJax dynamic inline>{"\\(\\frac{2}{3}\\)"}</MathJax> chance that the flame is in the remaining boxes.  When Jeff opens a box to reveal a skull, the problem fundamentally changes, even though it does not appear so.  The box that you hold still maintains it's original <MathJax dynamic inline>{"\\(\\frac{1}{3}\\)"}</MathJax> chance of containing the flame, but the unopened box in Jeff's possession <i>also</i> maintains the original <MathJax dynamic inline>{"\\(\\frac{2}{3}\\)"}</MathJax> chance that was initially split between the two boxes.  This means that switching boxes will give the player a 66% chance of winning, vs. 33% chance if they keep their original box.</p>
                <p>In this week's episode, Deshawn fell victim to a common fallacy when playing this game.  The player is naturally suspicious that the host is attempting to trick them into betraying their gut instinct, since the host holds all the knowledge.  While it worked out for Deshawn, this only underscores exactly how lucky he was.  To demonstrate this, I've written two scripts that simulate playing the game.  The first script always sticks with the original box picked.  The second always switches.  The game is played one million times for each strategy.  The results are shown in the table below:</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Strategy</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Win %</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Keep your box</th>
                            <td>332,778</td>
                            <td>667,222</td>
                            <td>33.28%</td>
                        </tr>
                        <tr>
                            <th>Switch boxes</th>
                            <td>666,398</td>
                            <td>333,602</td>
                            <td>66.64%</td>
                        </tr>
                    </tbody>
                </table>
                <p>Still don't believe me?  This game below will allow you to play the <i>Do or die</i> game for yourself.  Try out your own strategy and see if you can beat the "always switch" strategy.</p>
                <MontyHallGame /><br />
                <p>If you play the game enough times using the "always switch" strategy every time, you should see that your score ultimately tends towards 66.66%, whereas if you use the "follow your gut" strategy of holding your box your score should tend towards 33.33%.  On <i>Survivor</i>, the common wisdom is that "knowledge is power."  When considering games of chance, you should always consider the probabilistic power of information.  When new information is presented to the player, your odds may have changed.  If your goal is to "Outwit, Outplay, Outlast," don't let your (albeit deserved) mistrust of Jeff Probst lead you awry.</p>

            </MathJaxContext>
        </div>
    );
}

export default SurvivorMontyHall;