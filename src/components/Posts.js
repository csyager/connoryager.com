import Card from './Card';
import greekrhoImage from '../images/posts/greekrho.png';

function Posts() {
    return (
        <div className="container">
            <h1>Posts</h1>
            <div className="row">
                <Card image={greekrhoImage} title="GreekRho Beta Launch" filename='posts/greekrho'
                    text='Announcing the beta launch of our Greek organization management tool, GreekRho' />
            </div>
        </div>
    )
}

export default Posts;