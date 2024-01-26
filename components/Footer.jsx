"use client"

import DownloadFooter from "@components/DownloadFooter";

const Footer = () => {
    return (
        <div>
        <hr className="footer_line"/>
        <section className="footer">
            <div className="footer_container flex gap-20 justify-center items-start py-10">
                <div className="footer_left">
                    <h1 className="footer_text blue_gradient">
                        © 2024 Taipan Benchmarks
                    </h1>
                </div>
                <div className="footer_center ">
                    <h1><strong>Downloads</strong></h1>
                    <h1 className="footer_text blue_gradient">
                        <DownloadFooter
                            os={"Windows 10 or 11"}
                            file_name={"array_windows.zip"}
                            os_logo={"windows"}
                        />
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <DownloadFooter
                            os={"MacOS (Arm)"}
                            file_name={"array_macos_arm.zip"}
                            os_logo={"apple"}
                        />
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <DownloadFooter
                            os={"MacOS (Intel)"}
                            file_name={"array_macos_intel.zip"}
                            os_logo={"apple"}
                        />
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <DownloadFooter
                            os={"Linux (Debian)"}
                            file_name={"array_linux_debian.zip"}
                            os_logo={"ubuntu"}
                        />
                    </h1>
                    <h1 className="footer_text blue_gradient">
                        <DownloadFooter
                            os={"Linux (Arch)"}
                            file_name={"array_linux_arch.zip"}
                            os_logo={"archlinux"}
                        />
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
                    <h1 className="footer_text blue_gradient">
                        <a href="">Terms of Service</a>
                    </h1>
                </div>
            </div>
        </section>
        </div>
    );
};

export default Footer;
