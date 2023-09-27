import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Form({ answer }) {
    const { setData, put, processing, errors } = useForm({
        ...answer,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("answers.update", answer.id));
    };

    return (
        <Authenticated>
            <Head title="Answer a Question" />

            <section className="bg-gray pt-4 pb-5">
                <div className="container">
                    <div className="mb-5">
                        <div className="d-flex align-items-center">
                            <div className="d-flex">
                                <div className="fs-2 fw-bold me-2 mb-0">
                                    Answer a Question
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
                                                    htmlFor="answer"
                                                    className="form-label"
                                                >
                                                    Answer
                                                </label>
                                                <textarea
                                                    className={`form-control ${
                                                        errors.answer
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    id="answer"
                                                    name="answer"
                                                    defaultValue={answer.answer}
                                                    onChange={(e) =>
                                                        setData(
                                                            "answer",
                                                            e.target.value
                                                        )
                                                    }
                                                    style={{
                                                        height: "100px",
                                                    }}
                                                    autoFocus
                                                />
                                                {errors.answer && (
                                                    <div className="invalid-feedback">
                                                        {errors.answer}
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
                                                    href={route(
                                                        "discussions.show",
                                                        answer.discussion.slug
                                                    )}
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
