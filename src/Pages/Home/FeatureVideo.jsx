import video from '../../assets/video.mp4';
const FeatureVideo = () => {

    return (
        <div className="container mx-auto md:py-20 py-6">
            <div className='hero md:w-10/12 mx-auto md:px-0 px-2'>
                <video autoPlay loop playsInline className='md:rounded-3xl rounded-lg'>
                    <source src={video} />
                </video>
                <div className="hero-overlay bg-black bg-opacity-60 md:rounded-3xl rounded-lg"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="text-[#16A7FC] font-oxanium lg:text-5xl md:text-3xl text-xl md:mb-4 font-bold">FASTEST DELIVERY</h1>
                        <p className="font-raleway lg:text-base md:text-xs text-[8px]"> You can get your valuable item in the fastest period of time with safety. Because your emergency is our first priority.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureVideo;