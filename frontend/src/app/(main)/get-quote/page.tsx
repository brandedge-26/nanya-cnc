import GetQuoteClient from './GetQuoteClient'
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Get Instant Quote | NANYA CNC",
    description:
        "Get a fast and accurate quote for your project. Submit your details and receive a customized solution quickly.",
};


const AboutPage = () => {
    return <GetQuoteClient />
}

export default AboutPage