import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer id="about-us" className="py-80px">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                        <img
                            src={`/images/logo.png`}
                            alt="Laracuss logo"
                            className="h-32px mb-4"
                        />
                        <p className="text-white">
                            Empowering the Laravel community
                            <br />
                            to connect. share and learn.
                        </p>
                    </div>
                    <div className="col-12 col-lg-6 me-auto">
                        <div className="d-flex flex-column flex-lg-row justify-content-end">
                            <div className="d-flex flex-column me-140px mb-3 mb-lg-0">
                                <p className="fw-bold fs-5 text-white text-nowrap">
                                    Contact Us
                                </p>
                                <ul className="list-unstyled">
                                    <li className="text-white">
                                        <Link href="mailto:hi@laracuss.com">
                                            hi@laracuss.com
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex flex-column">
                                <p className="fw-bold fs-5 text-white">Links</p>
                                <ul className="list-unstyled">
                                    <li className="text-white mb-2">
                                        <Link href={"/"}>Home</Link>
                                    </li>
                                    <li className="text-white mb-2">
                                        <Link href={"/discussions"}>
                                            Discussions
                                        </Link>
                                    </li>
                                    <li className="text-white mb-2">
                                        <Link href="#about-us">About Us</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
