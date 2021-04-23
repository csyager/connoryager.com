import { useParams } from "react-router-dom";
import GreekRhoPost from "./posts/Greekrho";

var components = {
    'greekrho': GreekRhoPost
}

function Post() {
    let { filename } = useParams();
    var MyComponent = components[filename];
    return (
        <MyComponent />
    );
}

export default Post;