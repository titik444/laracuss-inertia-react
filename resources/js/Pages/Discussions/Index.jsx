import Authenticated from "@/Layouts/Authenticated";
import Pagination from "@/Components/Pagination";
import Alert from "@/Components/Alert";
import { Head, Link, usePage } from "@inertiajs/react";
import moment from "moment";

export default function Index({
    auth,
    discussions,
    categories,
    search,
    withCategory,
}) {
    const { flashMessage } = usePage().props;

    return (
        <Authenticated>
            <Head title="Discussion Page" />

            {flashMessage?.message && <Alert message={flashMessage.message} />}

            <section className="bg-gray pt-4 pb-5">
                <div className="container">
                    <div className="mb-4">
                        <div className="mb-3 d-flex align-items-center justify-content-between">
                            <h2 className="me-4 mb-0">
                                {search
                                    ? `Search Results for ${search}`
                                    : "All Discussions"}
                                <span>
                                    {withCategory &&
                                        ` About ${withCategory.name}`}
                                </span>
                            </h2>
                            <div>
                                {discussions.total}{" "}
                                {discussions.total > 1
                                    ? "discussions"
                                    : "discussion"}
                            </div>
                        </div>
                        {auth.user ? (
                            <Link
                                href={"/discussions/create"}
                                className="btn btn-primary"
                            >
                                Create Discussion
                            </Link>
                        ) : (
                            <Link href={"/login"} className="btn btn-primary">
                                Log In to Create Discussion
                            </Link>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-8 mb-5 mb-lg-0">
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
                                                    {discussion.like_counter
                                                        ?.count || 0}{" "}
                                                    {discussion.like_counter
                                                        ?.count > 1
                                                        ? "likes"
                                                        : "like"}
                                                </div>
                                                <div className="text-nowrap color-gray">
                                                    {discussion.answer.length}{" "}
                                                    {discussion.answer.length >
                                                    1
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
                                                    <h3>{discussion.title}</h3>
                                                </Link>
                                                <p>
                                                    {discussion.content_preview}
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
                                                                    src={
                                                                        discussion
                                                                            .user
                                                                            .profile_photo
                                                                            ? `/storage/${discussion.user.profile_photo}`
                                                                            : `https://ui-avatars.com/api/?name=${discussion.user.username}&background=random`
                                                                    }
                                                                    alt={
                                                                        discussion
                                                                            .user
                                                                            .username
                                                                    }
                                                                    className="avatar rounded-circle"
                                                                />
                                                            </Link>
                                                        </div>{" "}
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
                                                            </Link>{" "}
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
