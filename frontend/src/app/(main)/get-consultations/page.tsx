import ConsultationClient from './ConsultationClient'
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Request CNC Consultation – Engineering System",
    description:
        "Request a CNC machine consultation. Tell us your production needs and our engineers will design the right machine setup for your industry.",
    alternates: {
        canonical: "/get-consultations",
    },
};


const GetConsultationPage = () => {
    return <ConsultationClient />
}

export default GetConsultationPage
