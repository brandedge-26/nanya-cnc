export default function YouTubeEmbed({ videoid }: { videoid: string }) {
    return (
        <div className="flex justify-center items-center w-full p-4 ">
            <div className="w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl">
                <div className="relative aspect-video">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full "
                        src={`https://www.youtube.com/embed/${videoid}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
