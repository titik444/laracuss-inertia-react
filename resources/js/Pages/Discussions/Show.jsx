import Authenticated from "@/Layouts/Authenticated";
import Pagination from "@/Components/Pagination";
import Alert from "@/Components/Alert";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import moment from "moment";

export default function Show({ discussion, discussionAnswers, categories }) {
    const { auth } = usePage().props;

    const { location } = usePage().props.ziggy;

    const { flashMessage } = usePage().props;

    const [alert, setAlert] = useState("");

    const notLikedImage = "/images/like.png";
    const likedImage = "/images/liked.png";

    const {
        delete: destroy,
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        answer: "",
        discussion_id: discussion.id,
        user_id: auth?.user?.id || "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("discussions.answer.store", discussion.slug), {
            preserveScroll: true,
            onSuccess: () => (reset("answer"), setAnswer("")),
        });
    };

    const onHandleDeleteDiscussion = (slug) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this data?"
        );

        if (confirmation) {
            destroy(route("discussions.destroy", slug));
        }
    };

    const onHandleDeleteAnswer = (id) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this data?"
        );

        if (confirmation) {
            destroy(route("answers.destroy", id));
        }
    };

    const onHandleSharePage = (e) => {
        e.preventDefault();

        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(location);

            setAlert("Link to this page copied successfully");
        }
    };

    return (
        <Authenticated>
            <Head title={discussion.title} />

            {flashMessage?.message && <Alert message={flashMessage.message} />}

            {alert && <Alert message={alert} />}

            <section className="bg-gray pt-4 pb-5">
                <div className="container">
                    <div className="mb-5">
                        <div className="d-flex align-items-center">
                            <div className="d-flex">
                                <div className="fs-2 fw-bold color-gray me-2 mb-0">
                                    Discussions
                                </div>
                                <div className="fs-2 fw-bold color-gray me-2 mb-0">
                                    &gt;
                                </div>
                            </div>
                            <h2 className="mb-0">{discussion.title}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-8 mb-5 mb-lg-0">
                            <div className="card card-discussions mb-5">
                                <div className="row">
                                    <div className="col-1 d-flex flex-column justify-content-start align-items-center">
                                        <Link
                                            id="discussion-like"
                                            href={
                                                discussion.like_counter
                                                    ? route(
                                                          "discussions.like.unlike",
                                                          discussion.slug
                                                      )
                                                    : route(
                                                          "discussions.like.like",
                                                          discussion.slug
                                                      )
                                            }
                                            method="post"
                                        >
                                            <img
                                                alt="Like"
                                                id="discussion-like-icon"
                                                className="like-icon mb-1"
                                                src={
                                                    discussion.like_counter
                                                        ? likedImage
                                                        : notLikedImage
                                                }
                                            />
                                        </Link>
                                        <span
                                            id="discussion-like-count"
                                            className="fs-4 color-gray mb-1"
                                        >
                                            {discussion.like_counter?.count ||
                                                0}
                                        </span>
                                    </div>
                                    <div className="col-11">
                                        <div>{discussion.content}</div>
                                        <div className="mb-3">
                                            <Link
                                                href={route(
                                                    "discussions.categories.show",
                                                    discussion.category.slug
                                                )}
                                            >
                                                <span className="badge rounded-pill text-bg-light">
                                                    {discussion.category.slug}
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="row align-items-start justify-content-between">
                                            <div className="col">
                                                <span className="color-gray me-2">
                                                    <Link
                                                        id="share-page"
                                                        onClick={(e) =>
                                                            onHandleSharePage(e)
                                                        }
                                                    >
                                                        <small>Share</small>
                                                    </Link>
                                                </span>
                                                {discussion.user.id ==
                                                    auth?.user?.id && (
                                                    <>
                                                        <span className="color-gray me-2">
                                                            <Link
                                                                href={route(
                                                                    "discussions.edit",
                                                                    discussion.slug
                                                                )}
                                                            >
                                                                <small>
                                                                    Edit
                                                                </small>
                                                            </Link>
                                                        </span>

                                                        <button
                                                            className="color-gray btn p-0 lh-1"
                                                            id="delete-discussion"
                                                            onClick={() => {
                                                                onHandleDeleteDiscussion(
                                                                    discussion.slug
                                                                );
                                                            }}
                                                        >
                                                            <small className="card-discussion-delete-btn">
                                                                Delete
                                                            </small>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            <div className="col-5 col-lg-3 d-flex">
                                                <Link
                                                    href={route(
                                                        "users.show",
                                                        discussion.user.username
                                                    )}
                                                    className="card-discussions-show-avatar-wrapper flex-shrink-0 rounded-circle overflow-hidden me-1"
                                                >
                                                    <img
                                                        src={
                                                            discussion.user
                                                                .profile_photo
                                                                ? `/storage/${discussion.user.profile_photo}`
                                                                : `https://ui-avatars.com/api/?name=${discussion.user.username}&background=random`
                                                        }
                                                        alt={
                                                            discussion.user
                                                                .username
                                                        }
                                                        className="avatar"
                                                    />
                                                </Link>
                                                <div className="fs-12px lh-1">
                                                    <span className="text-primary">
                                                        <Link
                                                            href={route(
                                                                "users.show",
                                                                discussion.user
                                                                    .username
                                                            )}
                                                            className="fw-bold d-flex align-items-start text-break mb-1"
                                                        >
                                                            {
                                                                discussion.user
                                                                    .username
                                                            }
                                                        </Link>
                                                    </span>
                                                    <span className="color-gray">
                                                        {moment(
                                                            discussion.created_at
                                                        ).fromNow()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="mb-5">
                                {discussion.answer.length}{" "}
                                {discussion.answer.length > 1
                                    ? "answers"
                                    : "answer"}
                            </h3>
                            {discussionAnswers.data.length == 0 ? (
                                <div className="mb-5">
                                    <div className="card card-discussions">
                                        Currently no answer yet.
                                    </div>
                                </div>
                            ) : (
                                discussionAnswers.data.map((answer) => (
                                    <div
                                        className="card card-discussions"
                                        key={answer.id}
                                    >
                                        <div className="row">
                                            <div className="col-1 d-flex flex-column justify-content-start align-items-center">
                                                <Link
                                                    className="answer-like d-flex flex-column justify-content-start align-items-center"
                                                    href={
                                                        answer.like_counter
                                                            ? route(
                                                                  "answers.like.unlike",
                                                                  answer.id
                                                              )
                                                            : route(
                                                                  "answers.like.like",
                                                                  answer.id
                                                              )
                                                    }
                                                    method="post"
                                                    preserveScroll
                                                >
                                                    <img
                                                        alt="Like"
                                                        className="like-icon answer-like-icon mb-1"
                                                        src={
                                                            answer.like_counter
                                                                ? likedImage
                                                                : notLikedImage
                                                        }
                                                    />
                                                    <span className="answer-like-count fs-4 color-gray mb-1">
                                                        {answer.like_counter
                                                            ?.count || 0}
                                                    </span>
                                                </Link>
                                            </div>
                                            <div className="col-11">
                                                <div>{answer.answer}</div>
                                                <div className="row align-items-end justify-content-end">
                                                    <div className="col">
                                                        {answer.user_id ==
                                                            auth?.user?.id && (
                                                            <>
                                                                <span className="color-gray me-2">
                                                                    <Link
                                                                        href={route(
                                                                            "answers.edit",
                                                                            answer.id
                                                                        )}
                                                                    >
                                                                        <small>
                                                                            Edit
                                                                        </small>
                                                                    </Link>
                                                                </span>
                                                                <button
                                                                    className="delete-answer color-gray btn btn-link text-decoration-none p-0 lh-1"
                                                                    onClick={() => {
                                                                        onHandleDeleteAnswer(
                                                                            answer.id
                                                                        );
                                                                    }}
                                                                >
                                                                    <small>
                                                                        Delete
                                                                    </small>
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="col-5 col-lg-3 d-flex">
                                                        <Link
                                                            href={route(
                                                                "users.show",
                                                                answer.user
                                                                    .username
                                                            )}
                                                            className="card-discussions-show-avatar-wrapper flex-shrink-0 rounded-circle overflow-hidden me-1"
                                                        >
                                                            <img
                                                                src={
                                                                    answer.user
                                                                        .profile_photo
                                                                        ? `/storage/${answer.user.profile_photo}`
                                                                        : `https://ui-avatars.com/api/?name=${answer.user.username}&background=random`
                                                                }
                                                                className="avatar"
                                                            />
                                                        </Link>
                                                        <div className="fs-12px lh-1">
                                                            <span
                                                                className={
                                                                    discussion.user_id ==
                                                                    answer.user_id
                                                                        ? "text-primary"
                                                                        : ""
                                                                }
                                                            >
                                                                <Link
                                                                    href={route(
                                                                        "users.show",
                                                                        answer
                                                                            .user
                                                                            .username
                                                                    )}
                                                                    className="fw-bold d-flex align-items-start text-break mb-1"
                                                                >
                                                                    {
                                                                        answer
                                                                            .user
                                                                            .username
                                                                    }
                                                                </Link>
                                                            </span>
                                                            <span className="color-gray">
                                                                {moment(
                                                                    answer.created_at
                                                                ).fromNow()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            {discussionAnswers.last_page > 1 && (
                                <Pagination data={discussionAnswers} />
                            )}

                            {auth.user ? (
                                <>
                                    <div>
                                        <h3 className="mb-5">Your Answer</h3>
                                        <div className="card card-discussions">
                                            <form onSubmit={submit}>
                                                <div className="mb-3">
                                                    <textarea
                                                        className="form-control"
                                                        id="answer"
                                                        name="answer"
                                                        value={data.answer}
                                                        onChange={(e) =>
                                                            setData(
                                                                "answer",
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{
                                                            height: "100px",
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn-primary me-4"
                                                        type="submit"
                                                        disabled={processing}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="fw-bold text-center">
                                    Please{" "}
                                    <Link
                                        href="/login"
                                        className="text-primary"
                                    >
                                        sign in
                                    </Link>{" "}
                                    or{" "}
                                    <Link
                                        href="/register"
                                        className="text-primary"
                                    >
                                        create an account
                                    </Link>{" "}
                                    to participate in this discussion.
                                </div>
                            )}
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="card">
                                <h3>All Categories</h3>

                                {categories.map((category) => (
                                    <Link
                                        href={route(
                                            "discussions.categories.show",
                                            category.slug
                                        )}
                                        key={category.id}
                                    >
                                        <span className="badge rounded-pill text-bg-light">
                                            {category.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
