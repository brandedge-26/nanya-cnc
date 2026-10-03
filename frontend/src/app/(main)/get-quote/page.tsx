import GetQuoteClient from './GetQuoteClient'
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Request a Quote",
    description:
        "Request a price quotation for Nanya CNC machines. Select your machine of interest and our team will send you a detailed quote.",
    alternates: {
        canonical: "/get-quote",
    },
};


const GetQuotePage = () => {
    return <GetQuoteClient />
}

export default GetQuotePage
