import { Link } from "@inertiajs/react";

export default function Pagination({ data }) {
    return (
        <nav className="d-flex justify-items-center justify-content-between">
            <div className="d-flex justify-content-between flex-fill d-sm-none">
                <ul className="pagination">
                    {data.prev_page_url ? (
                        <li className="page-item">
                            <Link
                                className="page-link"
                                href={data.prev_page_url}
                                rel="prev"
                            >
                                « Previous
                            </Link>
                        </li>
                    ) : (
                        <li className="page-item disabled" aria-disabled="true">
                            <span className="page-link">« Previous</span>
                        </li>
                    )}

                    {data.next_page_url ? (
                        <li className="page-item">
                            <Link
                                className="page-link"
                                href={data.next_page_url}
                                rel="next"
                            >
                                Next »
                            </Link>
                        </li>
                    ) : (
                        <li className="page-item disabled" aria-disabled="true">
                            <span className="page-link">Next »</span>
                        </li>
                    )}
                </ul>
            </div>

            <div className="d-none flex-sm-fill d-sm-flex align-items-sm-center justify-content-sm-between">
                <div>
                    <p className="small text-muted">
                        Showing <span className="fw-semibold">{data.from}</span>{" "}
                        to <span className="fw-semibold">{data.to}</span> of{" "}
                        <span className="fw-semibold">{data.total}</span>{" "}
                        results
                    </p>
                </div>

                <div>
                    <ul className="pagination">
                        {data.links.map((link) => (
                            <li
                                className={`page-item ${
                                    link.active
                                        ? "active"
                                        : link.url
                                        ? ""
                                        : "disabled"
                                }`}
                                key={link.label}
                            >
                                {link.active ? (
                                    <span className="page-link">
                                        {link.label}
                                    </span>
                                ) : (
                                    <Link className="page-link" href={link.url}>
                                        {link.label === "&laquo; Previous"
                                            ? "‹"
                                            : link.label === "Next &raquo;"
                                            ? "›"
                                            : link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
