import React from 'react';

const styles = {

footer2 : {   
position:"absolute",
left:"0",
bottom:"0",
right:"0",
width:"00%",
marginTop: "auto",

}
}

export default function Footer() {
    return (
        <footer className="footer2">      
            <div className="container px-4 px-lg-5">
                <div className="social d-flex justify-content-center">
                <a className="mx-2" href="https://github.com/MM-SalvoDragotta/" target="_blank"> <i className="fab fa-github fa-2x"></i></a>
                <a className="mx-2" href="https://www.linkedin.com/in/salvodragotta/" target="_blank"><i className="fab fa-linkedin-in fa-2x" aria-hidden="true"></i></a>
                <a className="mx-2" href="https://twitter.com/Dynamo_Sydney/" target="_blank"><i className="fab fa-twitter fa-2x"></i></a>
                <a className="mx-2" href="https://www.facebook.com/dynamousergroup/" target="_blank"><i className="fab fa-facebook-f fa-2x"></i></a>
                </div>
                <div className="small text-center text-muted">Icons made by 
                <a href="https://www.freepik.com" title="Freepik">Freepik</a> from 
                <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                </div>
                <div className="small text-center text-muted">Copyright &copy; 2021 - Salvo Dragotta</div>
            </div>
        </footer>
    )
}