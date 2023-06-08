import './Footer.css'
import logo from '../../resources/logo.png'

const Footer = () => {
    return (
        <>
        <div className="footer-wrap">
            <div className="footer-content">

                <div className="border-helper"></div>

                    <div className="footer-logo">
                        <img src={logo} id='logo' className='footer-logo'></img>
                    </div>

                    <div className="footer-text">
                        <div>
                            © 2023 Steamer Corporation.  All rights reserved.  All trademarks are property 
                            of their respective owners in the US and other countries.
                        </div>
                        <div>
                            VAT included in all prices where applicable.
                        </div>
                    </div>

                    {/* <div className="right-footer-logo"></div> */}

                <div className="border-helper"></div>

                <div className="footer-links">
                    <a href='#'>About Steamer</a>
                    &nbsp;|&nbsp;
                    <a href='https://www.linkedin.com/in/anton-james-9b5b18275/'>LinkedIn</a>
                    &nbsp;|&nbsp;
                    <a href='https://github.com/AntonJames-Sistence/Steamer'>GitHub</a>
                    &nbsp;|&nbsp;
                    <a href='#'>AngelList</a>
                    &nbsp;|&nbsp;
                    <a href='#'>Support</a>
                    &nbsp;|&nbsp;
                    <a href='#'>Gift Cards</a>
                </div>
            </div>
        </div>
        <div className='placeholder'></div>
        </>
    )
}

export default Footer;