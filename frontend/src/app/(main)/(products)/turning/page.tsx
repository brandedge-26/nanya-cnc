import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

const TurningPage = () => {
    return (
        <div>TurningPage</div>
    )
}

export default TurningPage;
