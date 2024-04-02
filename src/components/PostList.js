import { Link } from "react-router-dom";

function PostListEntry(props) {
    return (
        <>
            <div className="row justify-content-between">
                <div className="col-8">
                    <Link to={props.link} className="recent-posts-link">{props.title}</Link>
                </div>
                <div className="col-4">
                    <time className="recent-posts-time float-right">{props.date}</time>
                </div>
            </div>
            <hr />
        </>
    )
}

function PostList(props) {
    return (
        <div className="mt-3 mb-3">
            <div className="row justify-content-between mb-3">
                <div className="col-8">
                    <h2>{props.title}</h2>
                </div>
                {props.viewAll &&
                    <div className="col-4">
                        <Link to="posts" className="btn btn-secondary float-right">View all</Link>
                    </div>
                }
            </div>
            {props.children}

        </div>
    )
}

export {PostList, PostListEntry}