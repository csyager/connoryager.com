import cambridge_1 from "../../images/albums/2024_3_30_cambridge/cambridge_1.jpg";
import cambridge_2 from "../../images/albums/2024_3_30_cambridge/cambridge_2.jpg";
import cambridge_3 from "../../images/albums/2024_3_30_cambridge/cambridge_3.jpg";

export default function CambridgeAlbum() {
    return (
        <div className="container">
            <h1>2024-03-30 Cambridge, MA</h1>
            <figure class="figure mb-4">
                <img src={cambridge_1} className="figure-img img-fluid rounded" alt="cambridge_1" />
                <figcaption className="figure-caption">My younger brother Chase playing in his game against Harvard.</figcaption>
            </figure>
            <figure class="figure">
                <img src={cambridge_2} className="figure-img img-fluid rounded" alt="cambridge_2" />
                <figcaption className="figure-caption">Family and friends with Chase after the game.</figcaption>
            </figure>
            <figure class="figure">
                <img src={cambridge_3} className="figure-img img-fluid rounded" alt="cambridge_3" />
                <figcaption className="figure-caption">The view from a bridge crossing the Charles.  Boston is on the left bank and Cambridge on the right.</figcaption>
            </figure>
            
        </div>
    )

}