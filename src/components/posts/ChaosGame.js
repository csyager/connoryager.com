
import githubImage from '../../images/github.png';
import sierpinskyTriangle from '../../images/posts/sierpinsky-triangle.png';
import chaosSquareRandom from '../../images/posts/chaos_square_random.png';
import chaosSquares from '../../images/posts/chaos_squares.png';
import chaosTriangles from '../../images/posts/chaos_triangles.png';
import { HashLink as Link } from 'react-router-hash-link';

function GreekRhoPost() {
    return (
        <div className="container post-content">
            <h1 className="display-4">Chaos Game</h1>
            <h5 className="text-muted">Jun 26, 2021</h5><br />
            <p><img src={githubImage} alt="github" className="github-intext" /> This project is on Github!  Click <a href="https://github.com/csyager/triangles" target="_blank" rel="noreferrer">here</a> to view!</p>
            
            <div className="post-header-img">
                <img src={sierpinskyTriangle} alt="triangle" className="img-fluid" />
            </div>

            <p className="post-body">The image that you see on this page is called a <code>Sierpinski Triangle</code>.  It's an example of a fractal, or an image that appears the same at any scale.  Fractals are <code>self-similar</code>, meaning that fractions of the image are similar to the image itself.  For example, if you zoom in on the Sierpinski Triangle so that only the top sub-triangle is visible, the image would look identical to the original Sierpinski Triangle.</p>
            <p>Let's take a brief aside and talk about <code>chaos theory</code>.  Chaos theory is the mathematical study of <i>chaos</i>, or systems that seem random and disordered, but actually obey mathematical laws.  When I think of chaos, I think of the vastness and apparent randomness of the physical universe.  While we may exist in a mess of atoms, all bouncing around randomly, in reality these particles all obey the laws of physics.  They aren't really bouncing around randomly, they actually transfer energy between each other and change properties in predictable ways.  </p>
            <p>An important principle in chaos theory is that the initial state of a deterministic system (a system where the same initial state will always produce the same output, but the change in output is not proportional to the change in input) can produce large changes in later states<sup><Link to="#footnote-1">[1]</Link></sup>.  This is often illustrated via the metaphor of the <code>butterfly effect</code>.  The butterfly effect is the idea that a butterfly flapping it's wings on one side of the Earth could lead to hurricanes on the other.  In 1961, Edward Lorenz ran a computational model for predicting weather<sup><Link to="#footnote-1">[1]</Link></sup>.  He found that an error of around one in a thousand caused dramatically different outcomes.  This is the core tenant of chaotic systems:  by changing initial conditions ever so slightly, huge differences in final state can occur.  When thinking about the universe, I think about the big bang, which set all of the particles that we see today into motion.  Studies suggest that tiny changes in the way the universe developed in it's first 10<sup>-43</sup> seconds could have completely changed the way it developed<sup><Link to="#footnote-2">[2]</Link></sup>.  If the starting conditions weren't precisely the way they occurred in our universe, there almost certainly wouldn't be butterflies to flap their wings, or humans to ponder the consequences, at least not the way we know them.</p>
            <h2>Pure Chaos</h2>
            <p>To demonstrate chaos, I wrote a program that simulates an experiment, called the <code>chaos game</code>.  To play the simulation, clone the repository linked at the top of the article.  The chaos game is pretty simple, and relies on one of the most fundamental aspects of chaos, it's apparent randomness.  The way it is played is by starting out with a geometric shape, with a number of vertices, and a <i>seed</i>, or a point on the same plane as the shape.  Each round of the game, one of the vertices is chosen at random, and the seed is moved half the distance toward the vertice.  On the next turn, another vertice is selected at random, the seed moves from it's new position half-way to the next, and the game continues in this fashion.  To start, let's try the chaos game using a square.  If you've cloned the repository, from the root directory run <code>python3 random_squares.py</code>.  A window should open, with the vertices of the square plotted and the seed placed inside.  Play around with the "Plot points" buttons, and see if you notice a pattern forming.</p>
            <div className="post-img-right">
                <figure className="figure">
                    <img src={chaosSquareRandom} alt="random square plot" className="img-fluid" />
                    <figcaption className="figure-caption">Chaos game simulation on a square, showing 500 iterations</figcaption>
                </figure>
            </div>
            <p className="post-body">If you've noticed any pattern, it should be that there isn't any pattern!  We have what appears to be a completely random distribution of points falling within our square.  If you run the program again, but this time move the inital position of the seed somewhere else, you should find the same results.  It appears that given these rules of the game, we get pure randomness.</p>
            <h2>Attractors</h2>
            <p>If you're a chaos theorist, this game isn't very helpful.  There's no way to predict any outcome from any input.  So let's try changing the rules a bit.  Instead of randomly choosing one of the four corners to move towards, let's add one stipulation:  the next corner chosen can't be the same as the one you just moved towards.  We don't really have any reason to think this will change the random outcome, after all, we just showed that choosing points at random does create a chaotic random distribution.  Why would removing one choice make a difference?  Well, let's simulate it and see.  Try running <code>python3 squares.py</code>, and see if you can find a pattern.</p>
            <div className="post-img-left">
                <figure className="figure">
                    <img src={chaosSquares} alt="ordered square plot" className="img-fluid" />
                    <figcaption className="figure-caption">Chaos game simulation on a square, where the most recently chosen vertice cannot be chosen again, showing 500 iterations</figcaption>
                </figure>
            </div>
            <p className="post-body">The image to the left shows 500 iterations using this pattern.  You may notice that, compared to the image above, a pattern appears to be emerging.  There appear to be forbidden regions in the shape of squares, where points can't be plotted.  If you look closely, you may notice that the pattern generated is actually a complex fractal.  There is a pattern that repeats itself at smaller scales.  Now try moving the starting position around the plot.  You'll notice that changing the starting point changes the location of the first several points plotted.  However, when you plot a few hundred points, the fractal pattern emerges regardless.  This pattern is the <code>attractor</code> of the chaotic system, because after a sufficiently large number of iterations, the seemingly random system evolves into this state.</p>

            <div className="post-img-right">
                <figure className="figure">
                    <img src={chaosTriangles} alt="ordered triangle plot" className="img-fluid" />
                    <figcaption className="figure-caption">Chaos game simulation on a triangle, where any vertex can be chosen, showing 500 iterations</figcaption>
                </figure>
            </div>
            <p>Now let's try the chaos game with a triangle.  In this game, any vertex can be randomly chosen, and the point will move halfway to that vertex.  Run <code>python3 triangles.py</code> to see this system simulated.  As before, the first several points plotted appear to be bouncing around randomly, but after plotting several hundred points you should notice that a familiar pattern is emerging.  The attractor for this system is the Sierpinski Triangle!  Chaos theory is highly interested in these attractive states, because they seem to magically create order out of apparent chaos.  Attractive states in chaotic systems help mathematicians to nullify butterfly effects that make systems appear unsolvable.  In the example of the chaos game simulation, if you asked someone with no knowledge of the Sierpinski Triangle to tell you where the 10,000,000th random movement of a point half the distance to a random vertex of a triangle would lie, they would almost certainly tell you it was impossible, or maybe they'd try the first 10 iterations and give up when they saw the apparent randomness or the differences caused by changing the starting seed.  A well-versed chaos theorist, however, would show you the triangle and tell you it could only lie on this fractal.</p>

            <p>Chaotic systems are everywhere in the real world.  The weather, the movements of planets, the flight paths of fighter jets, and many other systems behave chaotically.  What if there were attractive states to be found in all of these systems?  If we had perfect understanding of all the butterfly effects that make a hurricane, and all of their attractive states, we'd be able to perfectly track the weather.  Or, if we knew every attractive force being exerted on an asteroid, we could perfectly plot it's movement through space.  Although these systems behave according to fixed laws, their attractive states remain unknown, or otherwise incalculable.  Finding attractors like the Sierpinski Triangle are key to solving these complex systems, and cracking their secrets wide open.</p>
            
            <h2>Footnotes</h2>
            <ol>
                <li id="footnote-1">Borwein, J., &amp; Rose, M. (2012, November 18). Explainer: What is Chaos Theory? The Conversation. https://theconversation.com/explainer-what-is-chaos-theory-10620</li>
                <li id="footnote-2">Moskowitz, C. (2010). After Big Bang Came Moment of Pure Chaos, Study Finds. Space.Com. https://www.space.com/9255-big-bang-moment-pure-chaos-study-finds.html</li>
            </ol>
            
        </div>
    );
}

export default GreekRhoPost;