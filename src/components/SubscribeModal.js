import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

function SubscribeForm(props) {
    const [emailAddress, setEmailAddress] = useState("")
    const [loadingState, setLoadingState] = useState(false);
    const [submitState, setSubmitState] = useState("Submit")
    const [responseStatusCode, setResponseStatusCode] = useState(0)
    const [formSubmitted, setFormSubmitted] = useState(false);

    const changeHandler = (e) => {
        setEmailAddress(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: emailAddress
            })
        };
        setSubmitState("");
        setLoadingState(true);
        const response = await fetch('https://3ety76pa44.execute-api.us-east-1.amazonaws.com/prod/subscribe', requestOptions);
        const status = await response.status;
        console.log(status);
        setResponseStatusCode(status);
        setLoadingState(false);
        setFormSubmitted(true)
    }

    if (!formSubmitted){
        return (
            <form onSubmit={submitHandler}>
                <div className="modal-body">         
                        <input className="form-control" type="email" placeholder="Email Address" value={emailAddress} onChange={changeHandler} required/>
                        <small id="emailHelp" className="form-text text-muted">You will receive an email notification when a new post is published.  You can unsubscribe at any time.</small>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary"><ClipLoader color="#ffffff" size="20px" loading={ loadingState} />{ submitState}</button>
                </div>
            </form>
        )
    } else if (responseStatusCode === 200) {
        return(
            <div className="alert alert-success" role="alert">You have successfully registered to receive email notifications.</div>
        );
    } else {
        return (
            <div className="alert alert-danger" role="alert">Your response could not be submitted.  Error code {responseStatusCode}</div>
        );
    }
}

function SubscribeModal(props) {
    return (
        <div className="modal fade" id="subscribeModal" tabIndex="-1" role="dialog" aria-labelledby="subscribeModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="subscribeModalLabel">Subscribe</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <SubscribeForm />
                </div>
            </div>
        </div>
    )
    
    
}

export default SubscribeModal;