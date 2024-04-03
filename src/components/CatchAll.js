import { Link } from "react-router-dom"

export default function CatchAll() {
    return (
        <div className="container">
            <h1 className="display-1"><code className="inline">404</code></h1>
            <h3 className="display-4 mb-5">Hmmm we couldn't find what you're looking for...</h3>

            <h4 className="display-6">Try again from the <Link to="/">home page</Link>?</h4>
        </div>
    )
}