import { useParams } from "react-router-dom";
import PowerOfDifferenceProject from "./projects/PowerOfDifference";
import StopMotionProject from "./projects/StopMotion";
import STSPaperProject from "./projects/STSPaper";
import RtxStockBotProject from "./projects/RtxStockBot";
import TennisMLProject from "./projects/TennisML";
import Powerranks from "./projects/Powerranks";
import { useEffect } from "react";

var components = {
    'stopmotion': StopMotionProject,
    'stspaper': STSPaperProject,
    'powerofdifference': PowerOfDifferenceProject,
    'stockbot': RtxStockBotProject,
	'tennisml': TennisMLProject,
    'powerranks': Powerranks
}

function Project() {
    let { filename } = useParams();
    var MyComponent = components[filename];
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <MyComponent />
    );
}

export default Project;
