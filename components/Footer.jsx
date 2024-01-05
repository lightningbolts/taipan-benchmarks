"use client"

const Footer = () => {
    return (
        <section className="footer">
            <div className="footer_container flex gap-20 flex-center">
                <div className="footer_left ">
                    <h1 className="footer_text blue_gradient">
                        © 2024 Taipan Benchmarks
                    </h1>
                </div>
                <div className="footer_center">
                    <h1><strong>Downloads</strong></h1>
                    <h1 className="footer_text blue_gradient">
                        <a href="">Windows 10 or 11</a>
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <a href="">MacOS (Arm)</a>
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <a href="">MacOS (Intel)</a>
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <a href="">Linux (Debian)</a>
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <a href="">Linux (Arch)</a>
                    </h1>
                </div>
                <div className="footer_right">
                    <h1><strong>About Taipan Benchmarks</strong></h1>
                    <h1 className="footer_text blue_gradient">
                        <a href="">About Us</a>
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <a href="">Contact</a>
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <a href="">Privacy Policy</a>
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <a href="">Help Center</a>
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default Footer;
