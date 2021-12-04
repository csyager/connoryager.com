import { useEffect } from 'react';
import { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSkull,
    faFire
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faSkull);
library.add(faFire);

function MontyHallGame() {
    const [winnerBox, setWinnerBox] = useState(0);
    const [selectedBox, setSelectedBox] = useState(0);
    const [eliminatedBox, setEliminatedBox] = useState(0);
    const [oneDisabled, setOneDisabled] = useState(false);
    const [twoDisabled, setTwoDisabled] = useState(false);
    const [threeDisabled, setThreeDisabled] = useState(false);
    const [cardTitle, setCardTitle] = useState("Select a box");
    const [oneText, setOneText] = useState("Box 1");
    const [twoText, setTwoText] = useState("Box 2");
    const [threeText, setThreeText] = useState("Box 3");
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [showPlayAgain, setShowPlayAgain] = useState(false);


    const resetGame = () => {
        setSelectedBox(0);
        setEliminatedBox(0);
        setOneDisabled(false);
        setTwoDisabled(false);
        setThreeDisabled(false);
        setCardTitle("Select a box")
        setOneText("Box 1");
        setTwoText("Box 2");
        setThreeText("Box 3");
        setShowPlayAgain(false);
        resetWinnerBox();
    }

    const selectBoxOne = () => {
        if (selectedBox === 0) {
            setSelectedBox(1);
        } else {
            if (winnerBox === 1) {
                setCardTitle("You win!");
                setOneText(<FontAwesomeIcon icon={faFire} size="lg" />)
                setOneDisabled(true);
                if (!twoDisabled) {
                    setTwoDisabled(true);
                    setTwoText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                }
                if (!threeDisabled) {
                    setThreeDisabled(true);
                    setThreeText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                }
                setWins(wins + 1);
            } else {
                setCardTitle("Better luck next time.");
                setOneDisabled(true);
                setOneText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                if (!twoDisabled) {
                    setTwoDisabled(true);
                    setTwoText(<FontAwesomeIcon icon={faFire} size="lg" />)
                }
                if (!threeDisabled) {
                    setThreeDisabled(true);
                    setThreeText(<FontAwesomeIcon icon={faFire} size="lg" />)
                }
                setLosses(losses + 1);
            }
            setShowPlayAgain(true);
        }
        
    }
    const selectBoxTwo = () => {
        if (selectedBox === 0) {
            setSelectedBox(2);
        } else {
            if (winnerBox === 2) {
                setCardTitle("You win!");
                setTwoText(<FontAwesomeIcon icon={faFire} size="lg" />)
                setTwoDisabled(true);
                if (!oneDisabled) {
                    setOneDisabled(true);
                    setOneText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                }
                if (!threeDisabled) {
                    setThreeDisabled(true);
                    setThreeText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                }
                setWins(wins + 1);
            } else {
                setCardTitle("Better luck next time.")
                setTwoDisabled(true);
                setTwoText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                if (!oneDisabled) {
                    setOneDisabled(true);
                    setOneText(<FontAwesomeIcon icon={faFire} size="lg" />)
                }
                if (!threeDisabled) {
                    setThreeDisabled(true);
                    setThreeText(<FontAwesomeIcon icon={faFire} size="lg" />)
                }
                setLosses(losses + 1);
            }
            setShowPlayAgain(true);
        }
        
    }
    const selectBoxThree = () => {
        if (selectedBox === 0) {
            setSelectedBox(3);
        } else {
            if (winnerBox === 3) {
                setCardTitle("You win!");
                setThreeText(<FontAwesomeIcon icon={faFire} size="lg" />)
                setThreeDisabled(true);
                if (!oneDisabled) {
                    setOneDisabled(true);
                    setOneText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                }
                if (!twoDisabled) {
                    setTwoDisabled(true);
                    setTwoText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                }
                setWins(wins + 1);
            } else {
                setCardTitle("Better luck next time.");
                setThreeDisabled(true);
                setThreeText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                if (!oneDisabled) {
                    setOneDisabled(true);
                    setOneText(<FontAwesomeIcon icon={faFire} size="lg" />)
                }
                if (!twoDisabled) {
                    setTwoDisabled(true);
                    setTwoText(<FontAwesomeIcon icon={faFire} size="lg" />)
                }
                setLosses(losses + 1);
            }
            setShowPlayAgain(true);
        }
    }

    const getRandomBox = () => {
        return Math.floor(Math.random() * 3) + 1;
    }

    const resetWinnerBox = () => {
        const winnerBoxNumber = getRandomBox();
        setWinnerBox(winnerBoxNumber);
    }

    useEffect(() => {
        const winnerBoxNumber = getRandomBox();
        setWinnerBox(winnerBoxNumber);
    }, []);

    useEffect(() => {
        if (selectedBox !== 0) {
            if (selectedBox === 1) {
                if (winnerBox === 1) {
                    // eliminate two or three randomly
                    const eliminatedBoxNumber = Math.floor(Math.random() * 2);
                    if (eliminatedBoxNumber === 0) {
                        // eliminate two
                        setEliminatedBox(2);
                        setTwoDisabled(true);
                        setTwoText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                    } else {
                        // eliminate three
                        setEliminatedBox(3);
                        setThreeDisabled(true);
                        setThreeText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                    }
                } else if (winnerBox === 2) {
                    // eliminate three
                    setEliminatedBox(3);
                    setThreeDisabled(true);
                    setThreeText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                } else {
                    // eliminate two
                    setEliminatedBox(2);
                    setTwoDisabled(true);
                    setTwoText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                }
            } else if (selectedBox === 2) {
                if (winnerBox === 2) {
                    // eliminate one or three randomly
                    const eliminatedBoxNumber = Math.floor(Math.random() * 2);
                    if (eliminatedBoxNumber === 0) {
                        // eliminate one
                        setEliminatedBox(1);
                        setOneDisabled(true);
                        setOneText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                    } else {
                        // eliminate three
                        setEliminatedBox(3);
                        setThreeDisabled(true);
                        setThreeText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                    }
                } else if (winnerBox === 1) {
                    // eliminate three
                    setEliminatedBox(3);
                    setThreeDisabled(true);
                    setThreeText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                } else {
                    // eliminate one
                    setEliminatedBox(1);
                    setOneDisabled(true);
                    setOneText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                }
            } else if (selectedBox === 3) {
                if (winnerBox === 3) {
                    // eliminate one or two randomly
                    const eliminatedBoxNumber = Math.floor(Math.random() * 2);
                    if (eliminatedBoxNumber === 0) {
                        // eliminate one
                        setEliminatedBox(1);
                        setOneDisabled(true);
                        setOneText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                    } else {
                        // eliminate two
                        setEliminatedBox(2);
                        setTwoDisabled(true);
                        setTwoText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                    }
                } else if (winnerBox === 1) {
                    // eliminate two
                    setEliminatedBox(2);
                    setTwoDisabled(true);
                    setTwoText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                } else {
                    // eliminate one
                    setEliminatedBox(1);
                    setOneDisabled(true);
                    setOneText(<FontAwesomeIcon icon={faSkull} size="lg" />)
                }
            }
        }
    }, [selectedBox, winnerBox]);

    useEffect(() => {
        if (eliminatedBox !== 0) {
            setCardTitle("Box " + eliminatedBox.toString() + " has been eliminated.  Click your box again to keep it, or the other box to switch.");
        }
    }, [eliminatedBox]);

    const playAgain = () => {
        if (showPlayAgain) {
            return (
                <>
                    <br />
                    <div className="row monty-hall-play-again">
                        <button className="btn btn-primary" onClick={resetGame}>Play again</button>
                    </div>
                </>
            );
        } else {
            return;
        }
    }

    const winPercentage = () => {
        var percentage = ((wins / (wins + losses)) * 100).toFixed(2);
        if (!isFinite(percentage)) {
            percentage = 100;
        }
        return percentage;
    }


    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{cardTitle}</h5>
                    <div className="row">
                        <div className="col-md-4 monty-hall-button-col">
                            <button className="btn btn-primary btn-block" onClick={selectBoxOne} disabled={oneDisabled}><br /><br /><span className="monty-hall-button-text">{oneText}</span><br /><br /><br /></button>
                        </div>
                        <div className="col-md-4 monty-hall-button-col">
                            <button className="btn btn-primary btn-block" onClick={selectBoxTwo} disabled={twoDisabled}><br /><br /><span className="monty-hall-button-text">{twoText}</span><br /><br /><br /></button>
                        </div>
                        <div className="col-md-4 monty-hall-button-col">
                            <button className="btn btn-primary btn-block" onClick={selectBoxThree} disabled={threeDisabled}><br /><br /><span className="monty-hall-button-text">{threeText}</span><br /><br /><br /></button>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-2">
                            Wins: {wins}
                        </div>
                        <div className="col-md-2">
                            Losses: {losses}
                        </div>
                        <div className="col-md-2">
                            Win %: {winPercentage()}%
                        </div>
                    </div>
                    {playAgain()}
                </div>
                
            </div>
        </div>
    )
}

export default MontyHallGame;