import Nav from "@/Components/Nav";

export default function Auth({ children }) {
    return (
        <>
            <Nav />

            {children}
        </>
    );
}
