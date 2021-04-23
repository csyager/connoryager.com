import { useParams } from "react-router-dom";
import StopMotionProject from "./projects/StopMotion";

var components = {
    'stopmotion': StopMotionProject
}

function Project() {
    let { filename } = useParams();
    var MyComponent = components[filename];
    return (
        <MyComponent />
    );
}

export default Project;