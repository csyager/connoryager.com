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
                        <a href="https://twitter.com/connor_yager" target="_blank" rel="noreferrer"><i className="fa fa-twitter"></i> @connor_yager</a><br />
                        <a href="https://www.linkedin.com/in/connoryager/" target="_blank" rel="noreferrer"><i className="fa fa-linkedin"></i> connoryager</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer