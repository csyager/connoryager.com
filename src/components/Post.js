import '../style/post.css';
import { useParams } from "react-router-dom";
import GreekRhoPost from "./posts/Greekrho";
import ReactAppS3Post from "./posts/ReactAppS3";
import ReactRouterPost from "./posts/ReactRouter";
import CryptoMiningPost from "./posts/CryptoMining";
import ChaosGamePost from './posts/ChaosGame';
import SurvivorMontyHall from './posts/SurvivorMontyHall';
import SpringCaching from './posts/SpringCaching';
import K8sSpringboot from './posts/K8sSpringboot';
import K8sTLS from './posts/K8sTLS';
import K8sPostgres from './posts/K8sPostgres'
import { useEffect } from "react";

var components = {
    'greekrho': GreekRhoPost,
    'reactapps3': ReactAppS3Post,
    'reactrouter': ReactRouterPost,
    'cryptomining': CryptoMiningPost,
    'chaosgame': ChaosGamePost,
    'survivormontyhall': SurvivorMontyHall,
    'springcaching': SpringCaching,
    'k8sspringboot': K8sSpringboot,
    'k8stls': K8sTLS,
    'k8srds': K8sPostgres
}

function Post() {
    let { filename } = useParams();
    var MyComponent = components[filename];
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <MyComponent />
    );
}

export default Post;