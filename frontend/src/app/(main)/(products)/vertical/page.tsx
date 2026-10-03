import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

const VerticalPage = () => {
    return (
        <div>VerticalPage</div>
    )
}

export default VerticalPage;
