import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/react";
import moment from "moment/moment";

export default function Home({
    answerCount,
    discussionCount,
    userCount,
    latestDiscussions,
}) {
    return (
        <Authenticated>
            <Head title="Home Page" />

            <div>
                <section className="container hero">
                    <div className="row align-items-center h-100">
                        <div className="col-12 col-lg-6">
                            <h1>
                                The Laravel
                                <br />
                                Community Forum
                            </h1>
                            <p className="mb-4">
                                Empowering the Laravel Community to connect,
                                share and learn
                            </p>
                            <Link
                                href={`/sign-up`}
                                className="btn btn-primary me-2 mb-2 mb-lg-0"
                            >
                                Sign Up
                            </Link>
                            <Link
                                href={`/discussions`}
                                className="btn btn-secondary mb-2 mb-lg-0"
                            >
                                Join Discussions
                            </Link>
                        </div>
                        <div className="col-12 col-lg-6 h-315px order-first order-lg-last mb-3 mb-lg-0">
                            <img
                                src={`/images/hero-image.png`}
                                className="hero-image float-lg-end"
                            />
                        </div>
                    </div>
                </section>
                <section className="container min-h-372px">
                    <div className="row">
                        <div className="col-12 col-lg-4 text-center">
                            <img
                                src={`/images/discussions.png`}
                                className="promote-icon mb-2"
                                alt="Discussions"
                            />
                            <h2>
                                {discussionCount > 1
                                    ? "Discussions"
                                    : "Discussion"}
                            </h2>
                            <p className="fs-3">{discussionCount}</p>
                        </div>
                        <div className="col-12 col-lg-4 text-center">
                            <img
                                src={`/images/answers.png`}
                                className="promote-icon mb-2"
                                alt="Answers"
                            />
                            <h2>{answerCount > 1 ? "Answers" : "Answer"}</h2>
                            <p className="fs-3">{answerCount}</p>
                        </div>
                        <div className="col-12 col-lg-4 text-center">
                            <img
                                src={`/images/users.png`}
                                className="promote-icon mb-2"
                                alt="Users"
                            />
                            <h2>{userCount > 1 ? "Users" : "User"}</h2>
                            <p className="fs-3">{userCount}</p>
                        </div>
                    </div>
                </section>
                <section className="bg-gray">
                    <div className="container py-80px">
                        <h2 className="text-center mb-5">Help Others</h2>
                        <div className="row">
                            {latestDiscussions.length > 0 &&
                                latestDiscussions.map((latestDiscussion) => {
                                    return (
                                        <div
                                            className="col-12 col-lg-4 mb-3"
                                            key={latestDiscussion.id}
                                        >
                                            <div className="card">
                                                <Link
                                                    href={route(
                                                        "discussions.show",
                                                        latestDiscussion.slug
                                                    )}
                                                >
                                                    <h3>
                                                        {latestDiscussion.title}
                                                    </h3>
                                                </Link>
                                                <div>
                                                    <p className="mb-5">
                                                        {
                                                            latestDiscussion.content_preview
                                                        }
                                                    </p>
                                                    <div className="row">
                                                        <div className="col me-1 me-lg-2">
                                                            <Link
                                                                href={route(
                                                                    "discussions.categories.show",
                                                                    latestDiscussion
                                                                        .category
                                                                        .slug
                                                                )}
                                                            >
                                                                <span className="badge rounded-pill text-bg-light">
                                                                    {
                                                                        latestDiscussion
                                                                            .category
                                                                            .name
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        <div className="col-5 col-lg-7">
                                                            <div className="avatar-sm-wrapper d-inline-block">
                                                                <Link
                                                                    href={route(
                                                                        "users.show",
                                                                        latestDiscussion
                                                                            .user
                                                                            .username
                                                                    )}
                                                                    className="me-1"
                                                                >
                                                                    <img
                                                                        src={
                                                                            latestDiscussion
                                                                                .user
                                                                                .profile_photo
                                                                                ? `/storage/${latestDiscussion.user.profile_photo}`
                                                                                : `https://ui-avatars.com/api/?name=${latestDiscussion.user.username}&background=random`
                                                                        }
                                                                        className="avatar rounded-circle"
                                                                        alt={
                                                                            latestDiscussion
                                                                                .user
                                                                                .username
                                                                        }
                                                                    />
                                                                </Link>
                                                            </div>{" "}
                                                            <span className="fs-12px">
                                                                <Link
                                                                    href={route(
                                                                        "users.show",
                                                                        latestDiscussion
                                                                            .user
                                                                            .username
                                                                    )}
                                                                    className="me-1 fw-bold"
                                                                >
                                                                    {latestDiscussion
                                                                        .user
                                                                        .username
                                                                        .length >
                                                                    7
                                                                        ? latestDiscussion.user.username.slice(
                                                                              0,
                                                                              7
                                                                          ) +
                                                                          "..."
                                                                        : latestDiscussion
                                                                              .user
                                                                              .username}
                                                                </Link>{" "}
                                                                <span className="color-gray">
                                                                    {moment(
                                                                        latestDiscussion.created_at
                                                                    ).fromNow()}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </section>
                <section className="container min-h-372px d-flex flex-column align-items-center justify-content-center">
                    <h2>Ready to contribute?</h2>
                    <p className="mb-4">Want to make a big impact?</p>
                    <div className="text-center">
                        <Link
                            href={`/sign-up`}
                            className="btn btn-primary me-2 mb-2 mb-lg-0"
                        >
                            Sign Up
                        </Link>
                        <Link
                            href={`/discussions`}
                            className="btn btn-secondary mb-2 mb-lg-0"
                        >
                            Join Discussions
                        </Link>
                    </div>
                </section>
            </div>
        </Authenticated>
    );
}
