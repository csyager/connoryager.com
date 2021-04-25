import { useParams } from "react-router-dom";
import PowerOfDifferenceProject from "./projects/PowerOfDifference";
import StopMotionProject from "./projects/StopMotion";
import STSPaperProject from "./projects/STSPaper";
import RtxStockBotProject from "./projects/RtxStockBot";

var components = {
    'stopmotion': StopMotionProject,
    'stspaper': STSPaperProject,
    'powerofdifference': PowerOfDifferenceProject,
    'stockbot': RtxStockBotProject
}

function Project() {
    let { filename } = useParams();
    var MyComponent = components[filename];
    return (
        <MyComponent />
    );
}

export default Project;