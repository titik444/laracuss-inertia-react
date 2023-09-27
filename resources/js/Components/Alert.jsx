export default function Alert({message}) {
    return (
        <div
            id="alert"
            className="alert alert-success mb-0 rounded-0"
        >
            <div className="container">{message}</div>
        </div>
    );
}
