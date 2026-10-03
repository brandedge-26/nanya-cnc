import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

const FiveAxisPage = () => {
    return (
        <div>FiveAxisPage</div>
    )
}

export default FiveAxisPage;
