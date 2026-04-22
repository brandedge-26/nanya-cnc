import ConsultationClient from './ConsultationClient'
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Request CNC Consultation | Nanya CNC – Engineering System",
    description:
        "Request a CNC machine consultation. Tell us your production needs and our engineers will design the right machine setup for your industry.",
};


const GetConsultationPage = () => {
    return <ConsultationClient />
}

export default GetConsultationPage
