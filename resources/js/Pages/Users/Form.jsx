import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function Form({ user }) {
    const { data, setData, reset } = useForm({
        username: user.username,
        password: "",
        password_confirmation: "",
    });

    const { errors } = usePage().props;

    const avatar = useRef();

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        setDisabled(true);

        router.post(
            route("users.update", user.username),
            {
                _method: "PUT",
                ...data,
            },
            {
                onFinish: () => setDisabled(false),
            }
        );
    };

    const onHandleChangeProfile = (e) => {
        e.preventDefault();

        setData("profile_photo", e.target.files[0]);
        avatar.current.src = URL.createObjectURL(e.target.files[0]);
    };

    return (
        <Authenticated>
            <Head title="Edit Profile" />

            <section className="bg-gray pt-4 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-5">
                            <form onSubmit={submit}>
                                <div className="d-flex flex-column flex-md-row mb-4">
                                    <div className="edit-avatar-wrapper mb-3 mb-md-0 mx-auto mx-md-0">
                                        <div className="avatar-wrapper rounded-circle overflow-hidden flex-shrink-0 me-4">
                                            <img
                                                ref={avatar}
                                                id="avatar"
                                                className="avatar"
                                                src={
                                                    user.profile_photo
                                                        ? `/storage/${user.profile_photo}`
                                                        : `https://ui-avatars.com/api/?name=${user.username}&background=random`
                                                }
                                            />
                                        </div>
                                        <label
                                            htmlFor="picture"
                                            className="btn p-0 edit-avatar-show"
                                        >
                                            <img
                                                src={`/images/edit-circle.png`}
                                                alt="Edit circle"
                                            />
                                        </label>
                                        <input
                                            type="file"
                                            className="d-none"
                                            id="picture"
                                            name="picture"
                                            accept="image/*"
                                            onChange={(e) =>
                                                onHandleChangeProfile(e)
                                            }
                                        />
                                    </div>
                                    <div>
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
                                                    errors.username
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                id="username"
                                                name="username"
                                                value={data.username}
                                                onChange={(e) =>
                                                    setData(
                                                        "username",
                                                        e.target.value
                                                    )
                                                }
                                                autoFocus
                                            />
                                            {errors.username && (
                                                <div className="invalid-feedback">
                                                    {errors.username}
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
                                            <input
                                                type="password"
                                                className={`form-control ${
                                                    errors.password
                                                        ? "is-invalid"
                                                        : ""
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
                                            <div className="fs-12px color-gray">
                                                Empty this if you don't want to
                                                change your password
                                            </div>
                                            {errors.password && (
                                                <div className="invalid-feedback">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="password_confirmation"
                                                className="form-label"
                                            >
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                className={`form-control ${
                                                    errors.password_confirmation
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="fs-12px color-gray">
                                                Empty this if you don't want to
                                                change your password
                                            </div>
                                            {errors.password_confirmation && (
                                                <div className="invalid-feedback">
                                                    {
                                                        errors.password_confirmation
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-primary me-4"
                                        type="submit"
                                        disabled={disabled}
                                    >
                                        Save
                                    </button>
                                    <Link
                                        href={route(
                                            "users.show",
                                            user.username
                                        )}
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
