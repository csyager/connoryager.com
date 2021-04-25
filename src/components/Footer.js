import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faLinkedin,
    faTwitter
  } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faLinkedin, faTwitter);

function Footer() {
    return(
        <div className="d-flex footer-container">
            <footer className="footer border-top text-muted">
                <div className="row">
                    <div className="col-md-6 footer-col">
                        Connor Yager<br />
                        <a href="mailto:cyager@captechconsulting.com">cyager@captechconsulting.com</a>
                    </div>
                    <div className="col-md-6 footer-col">
                        <a href="https://twitter.com/connor_yager" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /> @connor_yager</a><br />
                        <a href="https://www.linkedin.com/in/connoryager/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /> connoryager</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer