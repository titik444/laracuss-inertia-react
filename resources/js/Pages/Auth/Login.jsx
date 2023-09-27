import Auth from "@/Layouts/Auth";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post("/login");
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
            <Head title="Login Page" />

            <section className="bg-gray vh-100">
                <div className="container h-100 pt-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-3">
                            <a className="nav-link mb-5 text-center">
                                <img
                                    className="h-32px"
                                    src={`/images/logo.png`}
                                    alt="Laracuss logo"
                                />
                            </a>
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
                                            name="email"
                                            value={data.email}
                                            placeholder="name@example.com"
                                            autoComplete="off"
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
                                    <div className="mb-3 d-grid">
                                        <button
                                            type="submit"
                                            className="btn btn-primary rounded-2"
                                            disabled={processing}
                                        >
                                            Log in
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center">
                                Don't have an account?{" "}
                                <Link
                                    href={`/sign-up`}
                                    className="text-underline"
                                >
                                    <u>Sign up</u>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Auth>
    );
}
