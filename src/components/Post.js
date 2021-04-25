import { useParams } from "react-router-dom";
import GreekRhoPost from "./posts/Greekrho";
import ReactAppS3Post from "./posts/ReactAppS3";

var components = {
    'greekrho': GreekRhoPost,
    'reactapps3': ReactAppS3Post
}

function Post() {
    let { filename } = useParams();
    var MyComponent = components[filename];
    return (
        <MyComponent />
    );
}

export default Post;