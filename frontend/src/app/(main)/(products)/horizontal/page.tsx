import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

const HorizontalPage = () => {
    return (
        <div>HorizontalPage</div>
    )
}

export default HorizontalPage;
