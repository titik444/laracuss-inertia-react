import Authenticated from "@/Layouts/Authenticated";
import Pagination from "@/Components/Pagination";
import { Head, Link, usePage } from "@inertiajs/react";
import moment from "moment";
import { useState } from "react";
import Alert from "@/Components/Alert";

export default function Show({ user, discussions, answers }) {
    const { auth } = usePage().props;

    const { flashMessage } = usePage().props;

    const [alert, setAlert] = useState("");

    const onHandleSharePage = (e) => {
        e.preventDefault();

        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(location);

            setAlert("Link to this page copied successfully");
        }
    };

    return (
        <Authenticated>
            <Head title={user.username} />

            {flashMessage?.message && <Alert message={flashMessage.message} />}

            {alert && <Alert message={alert} />}

            <section className="bg-gray pt-4 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-4 mb-5 mb-lg-0">
                            <div className="d-flex mb-4">
                                <div className="avatar-wrapper rounded-circle overflow-hidden flex-shrink-0 me-4">
                                    <img
                                        className="avatar"
                                        src={
                                            user.profile_photo
                                                ? `/storage/${user.profile_photo}`
                                                : `https://ui-avatars.com/api/?name=${user.username}&background=random`
                                        }
                                    />
                                </div>
                                <div>
                                    <div className="mb-4">
                                        <div className="fs-2 fw-bold mb-1 lh-1 text-break">
                                            {user.username}
                                        </div>
                                        <div className="color-gray">
                                            Member since{" "}
                                            {moment(user.created_at).fromNow()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link
                                    id="share-page"
                                    className="btn btn-primary me-4"
                                    onClick={(e) => onHandleSharePage(e)}
                                >
                                    Share
                                </Link>
                                {auth?.user?.id === user.id && (
                                    <Link
                                        href={route(
                                            "users.edit",
                                            user.username
                                        )}
                                    >
                                        Edit Profile
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-lg-8">
                            <div className="mb-5">
                                <h2 className="mb-3">My Discussions</h2>
                                <div>
                                    {discussions.data.length === 0 ? (
                                        <div className="card card-discussions">
                                            Currently no discussion yet
                                        </div>
                                    ) : (
                                        discussions.data.map((discussion) => (
                                            <div
                                                className="card card-discussions"
                                                key={discussion.id}
                                            >
                                                <div className="row">
                                                    <div className="col-12 col-lg-2 mb-1 mb-lg-0 d-flex flex-row flex-lg-column align-items-end">
                                                        <div className="text-nowrap me-2 me-lg-0">
                                                            {discussion
                                                                .like_counter
                                                                ?.count ||
                                                                0}{" "}
                                                            {discussion
                                                                .like_counter
                                                                ?.count > 1
                                                                ? "likes"
                                                                : "like"}
                                                        </div>
                                                        <div className="text-nowrap color-gray">
                                                            {
                                                                discussion
                                                                    .answer
                                                                    .length
                                                            }{" "}
                                                            {discussion.answer
                                                                .length > 1
                                                                ? "answers"
                                                                : "answer"}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-10">
                                                        <Link
                                                            href={route(
                                                                "discussions.show",
                                                                discussion.slug
                                                            )}
                                                        >
                                                            <h3>
                                                                {
                                                                    discussion.title
                                                                }
                                                            </h3>
                                                        </Link>
                                                        <p>
                                                            {
                                                                discussion.content_preview
                                                            }
                                                        </p>
                                                        <div className="row">
                                                            <div className="col me-1 me-lg-2">
                                                                <Link
                                                                    href={route(
                                                                        "discussions.categories.show",
                                                                        discussion
                                                                            .category
                                                                            .slug
                                                                    )}
                                                                >
                                                                    <span className="badge rounded-pill text-bg-light">
                                                                        {
                                                                            discussion
                                                                                .category
                                                                                .name
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="col-5 col-lg-4">
                                                                <div className="avatar-sm-wrapper d-inline-block">
                                                                    <Link
                                                                        href={route(
                                                                            "users.show",
                                                                            discussion
                                                                                .user
                                                                                .username
                                                                        )}
                                                                        className="me-1"
                                                                    >
                                                                        <img
                                                                            className="avatar rounded-circle"
                                                                            src={
                                                                                discussion
                                                                                    .user
                                                                                    .profile_photo
                                                                                    ? `/storage/${discussion.user.profile_photo}`
                                                                                    : `https://ui-avatars.com/api/?name=${discussion.user.username}&background=random`
                                                                            }
                                                                        />
                                                                    </Link>
                                                                </div>
                                                                <span className="fs-12px">
                                                                    <Link
                                                                        href={route(
                                                                            "users.show",
                                                                            discussion
                                                                                .user
                                                                                .username
                                                                        )}
                                                                        className="me-1 fw-bold"
                                                                    >
                                                                        {
                                                                            discussion
                                                                                .user
                                                                                .username
                                                                        }
                                                                    </Link>
                                                                    <span className="color-gray">
                                                                        {moment(
                                                                            discussion.created_at
                                                                        ).fromNow()}
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    {discussions.last_page > 1 && (
                                        <Pagination data={discussions} />
                                    )}
                                </div>
                            </div>
                            <div>
                                <h2 className="mb-3">My Answers</h2>
                                <div>
                                    {answers.data.length === 0 ? (
                                        <div className="card card-discussions">
                                            Currently no answer yet
                                        </div>
                                    ) : (
                                        answers.data.map((answer) => (
                                            <div
                                                className="card card-discussions"
                                                key={answer.id}
                                            >
                                                <div className="row align-items-center">
                                                    <div className="col-2 col-lg-1 text-center">
                                                        {answer.like_counter
                                                            ?.count || 0}{" "}
                                                        {answer.like_counter
                                                            ?.count > 1
                                                            ? "likes"
                                                            : "like"}
                                                    </div>
                                                    <div className="col">
                                                        <span>Replied to</span>{" "}
                                                        <span className="fw-bold text-primary">
                                                            <Link
                                                                href={route(
                                                                    "discussions.show",
                                                                    answer
                                                                        .discussion
                                                                        .slug
                                                                )}
                                                            >
                                                                {
                                                                    answer
                                                                        .discussion
                                                                        .title
                                                                }
                                                            </Link>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    {answers.last_page > 1 && (
                                        <Pagination data={answers} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
