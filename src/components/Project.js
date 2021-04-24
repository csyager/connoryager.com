import { useParams } from "react-router-dom";
import PowerOfDifferenceProject from "./projects/PowerOfDifference";
import StopMotionProject from "./projects/StopMotion";
import STSPaperProject from "./projects/STSPaper";

var components = {
    'stopmotion': StopMotionProject,
    'stspaper': STSPaperProject,
    'powerofdifference': PowerOfDifferenceProject
}

function Project() {
    let { filename } = useParams();
    var MyComponent = components[filename];
    return (
        <MyComponent />
    );
}

export default Project;