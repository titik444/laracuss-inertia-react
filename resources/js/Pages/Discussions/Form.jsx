import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Form({ discussion, categories }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: discussion?.title || "",
        category_slug: discussion?.category.slug || "",
        content: discussion?.content || "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (discussion) {
            put(route("discussions.update", discussion.slug));
        } else {
            post("/discussions");
        }
    };

    return (
        <Authenticated>
            <Head title={discussion? "Edit Discussion" : "Create Discussion"} />

            <section className="bg-gray pt-4 pb-5">
                <div className="container">
                    <div className="mb-5">
                        <div className="d-flex align-items-center">
                            <div className="d-flex">
                                <div className="fs-2 fw-bold me-2 mb-0">
                                    Ask a Question
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-8 mb-5 mb-lg-0">
                            <div className="card card-discussions mb-5">
                                <div className="row">
                                    <div className="col-12">
                                        <form onSubmit={submit}>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="title"
                                                    className="form-label"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${
                                                        errors.title
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    id="title"
                                                    name="title"
                                                    value={data.title}
                                                    onChange={(e) =>
                                                        setData(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    autoFocus
                                                />
                                                {errors.title && (
                                                    <div className="invalid-feedback">
                                                        {errors.title}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="category_slug"
                                                    className="form-label"
                                                >
                                                    Category
                                                </label>
                                                <select
                                                    className={`form-select ${
                                                        errors.category_slug
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    name="category_slug"
                                                    value={data.category_slug}
                                                    id="category_slug"
                                                    onChange={(e) =>
                                                        setData(
                                                            "category_slug",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option>
                                                        -- Choose One --
                                                    </option>
                                                    {categories.map(
                                                        (category) => (
                                                            <option
                                                                value={
                                                                    category.slug
                                                                }
                                                                key={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                {errors.category_slug && (
                                                    <div className="invalid-feedback">
                                                        {errors.category_slug}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="content"
                                                    className="form-label"
                                                >
                                                    Question
                                                </label>
                                                <textarea
                                                    className={`form-control ${
                                                        errors.content
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    id="content"
                                                    name="content"
                                                    value={data.content}
                                                    onChange={(e) =>
                                                        setData(
                                                            "content",
                                                            e.target.value
                                                        )
                                                    }
                                                    style={{
                                                        height: "100px",
                                                    }}
                                                />
                                                {errors.content && (
                                                    <div className="invalid-feedback">
                                                        {errors.content}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <button
                                                    className="btn btn-primary me-4"
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    Submit
                                                </button>
                                                <Link
                                                    href={
                                                        discussion
                                                            ? route(
                                                                  "discussions.show",
                                                                  discussion.slug
                                                              )
                                                            : route(
                                                                  "discussions.index"
                                                              )
                                                    }
                                                >
                                                    Cancel
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
