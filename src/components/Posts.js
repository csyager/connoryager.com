import Card from './Card';
import greekrhoImage from '../images/posts/greekrho.png';
import reactImage from '../images/posts/react.png';

function Posts() {
    return (
        <div className="container">
            <h1>Posts</h1>
            <div className="row">
                <Card image={greekrhoImage} title="GreekRho Beta Launch" filename='posts/greekrho'
                    text='Announcing the beta launch of our Greek organization management tool, GreekRho' />
                <Card image={reactImage} title="Hosting a React App on S3" filename='posts/reactapps3'
                    text='A short tutorial on how to host a React App on AWS S3' />
            </div>
        </div>
    )
}

export default Posts;