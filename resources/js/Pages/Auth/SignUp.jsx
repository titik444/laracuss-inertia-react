import Auth from "@/Layouts/Auth";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function SignUp() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        username: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post("/sign-up");
    };

    const passwordToggle = (e) => {
        e.preventDefault();

        const passwordInput = document.getElementById("password");
        const passwordImg = document.getElementById("password-toggle-img");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordImg.src = `/images/eye.png`;
        } else {
            passwordInput.type = "password";
            passwordImg.src = `/images/eye-slash.png`;
        }
    };

    return (
        <Auth>
            <Head title="Sign Up Page" />

            <section className="bg-gray vh-100">
                <div className="container">
                    <div className="row pt-5 justify-content-center">
                        <div className="col-12 col-lg-6 my-auto mb-5 mb-lg-auto me-0">
                            <div className="d-none d-lg-block">
                                <h2>Join the Laracuss Community</h2>

                                <ul>
                                    <li>Stuck? Ask in the Discussions</li>
                                    <li>
                                        Get answers from experienced developers
                                        from around the world
                                    </li>
                                    <li>Contribute by answering questions</li>
                                </ul>
                            </div>
                            <div className="d-block d-lg-none fs-4 text-center">
                                Create your account in a minute. It's free.
                            </div>
                        </div>
                        <div className="col-12 col-lg-3 h-100">
                            <Link
                                href={`/`}
                                className="nav-link mb-5 text-center"
                            >
                                <img
                                    src={`/images/logo.png`}
                                    alt="Laracuss logo"
                                    className="h-32px"
                                />
                            </Link>
                            <div className="card mb-5">
                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className={`form-control ${
                                                errors.email && "is-invalid"
                                            } ${
                                                errors.credentials &&
                                                "is-invalid"
                                            }`}
                                            id="email"
                                            placeholder="name@example.com"
                                            autoComplete="off"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            autoFocus
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        )}
                                        {errors.credentials && (
                                            <div className="invalid-feedback">
                                                {errors.credentials}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="password"
                                            className="form-label"
                                        >
                                            Password
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                className={`form-control border-end-0 pe-0 rounded-0 rounded-start ${
                                                    errors.password &&
                                                    "is-invalid"
                                                }`}
                                                id="password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <span
                                                className={`input-group-text bg-white border-start-0 pe-auto ${
                                                    errors.password &&
                                                    "border-danger rounded-end"
                                                }`}
                                            >
                                                <Link
                                                    id="password-toggle"
                                                    onClick={passwordToggle}
                                                >
                                                    <img
                                                        src={`/images/eye-slash.png`}
                                                        alt="Password toggle"
                                                        id="password-toggle-img"
                                                    />
                                                </Link>
                                            </span>
                                            {errors.password && (
                                                <div className="invalid-feedback">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="username"
                                            className="form-label"
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                errors.username && "is-invalid"
                                            }`}
                                            id="username"
                                            autoComplete="off"
                                            name="username"
                                            value={data.username}
                                            onChange={(e) =>
                                                setData(
                                                    "username",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.username && (
                                            <div className="invalid-feedback">
                                                {errors.username}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3 d-grid">
                                        <button
                                            type="submit"
                                            className="btn btn-primary rounded-2"
                                            disabled={processing}
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center">
                                Already have an account?{" "}
                                <Link href={`/login`}>
                                    <u>Log in</u>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Auth>
    );
}
