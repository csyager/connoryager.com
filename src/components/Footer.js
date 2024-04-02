import '../style/footer.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faLinkedin,
    faTwitter
  } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from '../images/icon.png';

library.add(faLinkedin, faTwitter);

function Footer() {
    return(
        <div className="d-flex footer-container">
            <footer className="footer border-top text-muted">
                <div className="row">
                    <div className="col-lg-6 col-xl-5 footer-col">
                        <div className="row">
                            <div className="col-lg-2 footer-col" />
                            <div className="col-lg-10 footer-col">
                                <img src={icon} width="35" height="35" className="footer-icon" alt="icon"/><h3 className="footer-brand">connoryager.com</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-7 footer-col">
                        <div className="row">
                            <div className="col-xl-6 footer-col">
                                Connor Yager<br />
                                <a href="mailto:connor.s.yager@gmail.com">connor.s.yager@gmail.com</a>
                            </div>
                            <div className="col-xl-6 footer-col">
                                <a href="https://twitter.com/connor_yager" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /> @connor_yager</a><br />
                                <a href="https://www.linkedin.com/in/connoryager/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /> connoryager</a>
                            </div>
                        </div>
                    </div>     
                </div>
            </footer>
        </div>
    );
}

export default Footer