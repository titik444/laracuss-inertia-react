import { Link, useForm, usePage } from "@inertiajs/react";

export default function Nav() {
    const { auth } = usePage().props;
    const { component } = usePage();

    const { data, setData, get } = useForm({
        search: new URLSearchParams(window.location.search).get("search") || "",
    });

    const submit = (e) => {
        e.preventDefault();

        get("/discussions");
    };

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
            <div className="container flex justify-content-between">
                <Link href={"/"} className="navbar-link">
                    <img
                        src={`/images/logo-white.png`}
                        className="h-32px"
                        alt="Laracuss Logo"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mx-0 mx-lg-3">
                        <li className="nav-item d-block d-lg-none d-xl-block">
                            <Link
                                href={"/"}
                                className={`nav-link ${
                                    component === "Home" && "active"
                                }`}
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href={"/discussions"}
                                className={`nav-link ${
                                    component === "Discussions/Index" &&
                                    "active"
                                }`}
                            >
                                Discussions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href={"/#about-us"}
                                className="nav-link text-nowrap"
                            >
                                About Us
                            </Link>
                        </li>
                    </ul>
                    <form
                        className="d-flex w-100 me-4 my-2 my-lg-0"
                        role="search"
                        onSubmit={submit}
                    >
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <img
                                    src={`/images/magnifier.png`}
                                    alt="Search"
                                />
                            </span>
                            <input
                                className="form-control border-start-0 ps-0"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                name="search"
                                value={data.search}
                                onChange={(e) =>
                                    setData("search", e.target.value)
                                }
                            />
                        </div>
                    </form>
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        {auth.user ? (
                            <li className="nav-item my-auto dropdown">
                                <Link
                                    className="nav-link p-0 d-flex align-items-center"
                                    onClick={(e) => e.preventDefault()}
                                    data-bs-toggle="dropdown"
                                >
                                    <div className="avatar-nav-wrapper me-2">
                                        <img
                                            src={
                                                auth.user.profile_photo
                                                    ? `/storage/${auth.user.profile_photo}`
                                                    : `https://ui-avatars.com/api/?name=${auth.user.username}&background=random`
                                            }
                                            alt={auth.user.username}
                                            className="avatar rounded-circle"
                                        />
                                    </div>
                                    <span className="fw-bold">
                                        {auth.user.username}
                                    </span>
                                </Link>
                                <ul className="dropdown-menu mt-2">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            href={route(
                                                "users.show",
                                                auth.user.username
                                            )}
                                        >
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            method="POST"
                                            href={"/logout"}
                                            as="button"
                                            className="dropdown-item"
                                        >
                                            Log out
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item my-auto">
                                    <Link
                                        href={"/login"}
                                        className={`nav-link text-nowrap ${
                                            component === "Auth/Login" &&
                                            "active"
                                        }`}
                                    >
                                        Log In
                                    </Link>
                                </li>
                                <li className="nav-item ps-1 pe-0">
                                    <Link
                                        href={"/sign-up"}
                                        className="btn btn-primary-white"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
