import { Link } from 'react-router-dom/';
import './Footer.css';

const Footer = () => {
    return (
        <>
        <div className="footer-wrap">
            <div className="footer-content">

                <div className="border-helper"></div>

                    <div className="footer-logo">
                    
                        <div className="footer-text">
                            <div>
                                © 2023 Steamer Corporation.  All rights reserved.  All trademarks are property 
                                of their respective owners in the US and other countries.
                            </div>
                            <div>
                                VAT included in all prices where applicable.
                            </div>
                        </div>

                        <Link className='footer-logo-img' to='/'></Link>
                    </div>

                    {/* <div className="right-footer-logo"></div> */}

                <div className="border-helper"></div>

                <div className="footer-links">
                    <a href='https://github.com/AntonJames-Sistence/Steamer' target='_blanc'>About Steamer</a>
                    &nbsp;|&nbsp;
                    <a href='https://www.linkedin.com/in/anton-james-ja/' target='_blanc'>LinkedIn</a>
                    &nbsp;|&nbsp;
                    <a href='https://wellfound.com/anton-james' target='_blanc'>Wellfound</a>
                    &nbsp;|&nbsp;
                    <a href='https://github.com/AntonJames-Sistence' target='_blanc'>GitHub</a>
                </div>
            </div>
        </div>
        <div className='placeholder'></div>
        </>
    )
}

export default Footer;