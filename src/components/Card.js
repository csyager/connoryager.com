import { Link } from "react-router-dom";

function Card(props) {
    const title = props.title;
    const text = props.text;
    const filename = props.filename;
    const image = props.image;
    
    return (
        <div class="col-md-4">
            <div class="card blog-card">
                <img className="card-img-top" src={image} alt="Greekrho logo" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                    <Link to={filename} className="btn btn-primary">Full post</Link>
                </div>
            </div>
        </div>
    );
}

export default Card;