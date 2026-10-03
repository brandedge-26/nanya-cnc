// Renders one or more schema.org objects as a JSON-LD <script> tag for rich search results
const JsonLd = ({ data }: { data: object | object[] }) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
};

export default JsonLd;
