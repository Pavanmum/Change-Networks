const Footer = () => {
  return (<>
    <div className="copy-right position-relative">
    <div className="container-fluid">
    <div className="copy-right-content ">
        <p>
        <span style={{fontWeight: 300}}>CHANGE Networks is neither a partner of nor an affiliate of Cisco
            Systems.</span><br />
        <span style={{fontSize: 13, color: '#424242', fontWeight: 400}}>
            <a href="https://change-networks.com/terms_and_conditions" target="_blank" style={{fontSize: 13, color: '#424242', fontWeight: 400}}>Terms &amp; Conditions</a> |
            <a href="https://change-networks.com/privacy_policy" target="_blank" style={{fontSize: 13, color: '#424242', fontWeight: 400}}>Privacy Policy</a> |
            <a href="https://change-networks.com/delivery_and_shipping_policy" target="_blank" style={{fontSize: 13, color: '#424242', fontWeight: 400}}>Delivery &amp; shipping policy</a> |
            <a href="https://change-networks.com/return_and_refund_policy" target="_blank" style={{fontSize: 13, color: '#424242', fontWeight: 400}}>Return&amp; Refund Policy</a>
        </span><br />
        © 2010-2024 CHANGE Networks LLC. All Rights Reserved.
        </p>
    </div>
    <div style={{right: 1, bottom: 27, textAlign: 'center', marginTop: 5}}><img src="https://change-networks.com/assets/img/paycards.png" width="40%" /></div>
    </div>
    <link href="https://cdn.sur.ly/widget-awards/css/surly-badges.min.css" rel="stylesheet" />
    <div className="position-absolute" style={{bottom: 10, left: 10}}>
    <div onClick="if(event.target.nodeName.toLowerCase() != 'a' && event.target.parentElement.nodeName.toLowerCase() != 'a') {window.open('https://sur.ly/i/change-networks.com'); return 0;}">
        <img src="https://change-networks.com/public/front_assets/img/boss_logo2.jpg" width={115} />
       
    </div>
    </div>
</div>
<div className="go-top ">
    <i className="las la-long-arrow-alt-up " />
</div>
<div className="modal fade career_login_modal" id="loginModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
    <div className="modal-content">
        <div className="modal-header pb-0">
        <h5 className="modal-title" id="exampleModalLongTitle">Login</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
        </button>
        </div>
        <div className="modal-body pt-0">
        <div className="social-login text-center d-flex align-items-center justify-content-center">
            {/* <div class="g-signin2" data-longtitle="true" data-onsuccess="Google_signIn" data-theme="light" data-width="200"></div> */}
            {/* <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div> */}
            <a href="#" onClick="login()"><i><img src="https://change-networks.com/public/front_assets/img/google-ico.svg" className="btn-social-google" /></i> Login with Google</a>
            {/* <a href="#"><i class="fab fa-facebook-f"></i> </a> */}
            {/* <a href="#"><i class="fab fa-linkedin-in"></i></a> */}
        </div>
        <div className="or-box"><span>OR</span></div>
        <form action="#" method="post" className="via-password-view mt-3" style={{display: 'none'}}>
            <div className="form-group">
            <div className="input-group">
                <span className="input-group-addon"><i className="fal fa-user" /></span>
                <input type="text" className="form-control" name="email" placeholder="Email" required="required" />
            </div>
            <span className="help-block email-msg hide" /><br />
            </div>
            <div className="form-group">
            <div className="input-group">
                <span className="input-group-addon"><i className="fal fa-lock" /></span>
                <input type="password" className="form-control" name="password" placeholder="Password" required="required" autoComplete="on" />
            </div>
            <span className="help-block password-msg" />
            </div>
            <div className="align-items-center d-flex form-group justify-content-between mt-4">
            <div className="position-relative">
                <label className="custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="item_checkbox" name="item_checkbox" defaultChecked defaultValue />
                <span className="custom-control-label d-flex">&nbsp;Remember Me</span>
                </label>
            </div>
            <div className="text-right pt-0" style={{fontSize: 12}}>
                <a href="javascript:void(0)" className="text-danger via-otp">Login with OTP</a>
            </div>
            </div>
            <div className="form-group text-center mt-2 mb-0">
            <div className="g-recaptcha" data-sitekey="6LfjVCITAAAAAHNOHIFXxjwjaLS1GTI4T7lyPG8i" />
            <button type="button" className="btn btn-primary btn-sm login_password">Login</button>
            </div>
        </form>
        <form action="#" method="post" className="via-otp-view mt-3">
            <div className="form-group">
            <div className="input-group">
                <span className="input-group-addon"><i className="fal fa-user" /></span>
                <input type="text" className="form-control" name="email" placeholder="Email" required="required" />
            </div>
            <span className="help-block sent-otp-msg" />
            </div>
            <div className="otp-btn">
            <div className="form-group text-center">
                <div className="g-recaptcha" data-sitekey="6LfjVCITAAAAAHNOHIFXxjwjaLS1GTI4T7lyPG8i" />
                <button type="button" className="btn btn-primary btn-sm send_otp">Send OTP</button>
            </div>
            <div className="align-items-center d-flex form-group justify-content-center mt-4">
                <div className="text-center pt-0" style={{fontSize: 12}}>
                <a href="javascript:void(0)" className="text-danger via-password">Login with Password</a>
                </div>
            </div>
            </div>
            <div className="otp-login-btn" style={{display: 'none'}}>
            <div className="form-group">
                <div className="input-group">
                <span className="input-group-addon"><i className="fal fa-lock" /></span>
                <input type="text" className="form-control" name="otp" required="required" />
                </div>
            </div>
            <div className="align-items-center d-flex form-group justify-content-between mt-4">
                <div className="position-relative">
                <label className="custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="item_checkbox" defaultChecked name="item_checkbox" defaultValue />
                    <span className="custom-control-label d-flex">&nbsp;Remember Me</span>
                </label>
                </div>
                <div className="text-right pt-0" style={{fontSize: 12}}>
                <a href className="text-danger">Login with Password</a>
                </div>
            </div>
            <div className="form-group text-center mt-2 mb-0">
                <div className="g-recaptcha" data-sitekey="6LfjVCITAAAAAHNOHIFXxjwjaLS1GTI4T7lyPG8i" />
                <button type="button" className="btn btn-primary btn-sm login_otp">Login</button>
            </div>
            </div>
        </form>
        </div>
        <div className="modal-footer hide">Don't have an account? <a href="#registerModal2" data-dismiss="modal" data-toggle="modal"> Sign up</a></div>
    </div>
    </div>
</div>
</>
  )
}

export default Footer