import './Banner.css';
import banner from '../../assets/banner.png';
const Banner = () => {

    return (
        <div className="mt-24 container mx-auto flex md:flex-row flex-col-reverse justify-between items-center py-10 px-4 gap-5">
            <div className='space-y-4'>
                <h1 className='text-[#261134] font-bold lg:text-5xl md:text-4xl text-3xl'>We are provide best <br /> courier services.</h1>
                <p className='lg:text-xl md:text-lg text-base font-raleway font-thin'>We deliver your products safely to your home in a reasonable time.</p>

            </div>
            <div className="banner-img">
                <img src={banner} alt="" />
            </div>
        </div>
    );
};

export default Banner;