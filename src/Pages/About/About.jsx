import { Helmet } from "react-helmet";
import ceo from '../../assets/about.png';

const About = () => {
    const about = [
        {
            'id': 1,
            'title': 'Embracing a Vision',
            'description': 'Our journey at Stuff Boxes began with a simple yet powerful vision to revolutionize parcel management and simplify the lives of our users. We envisioned a seamless, efficient, and reliable system that connects people with their parcels effortlessly.'
        },
        {
            'id': 2,
            'title': 'Customer-Centric Approach',
            'description': 'At Stuff Boxes, we believe in putting our customers first. Every decision we make, every feature we develop, is rooted in enhancing the user experience. Our commitment to providing exceptional service is unwavering, and we continually strive to exceed your expectations.'
        },
        {
            'id': 3,
            'title': 'Building a Community',
            'description': 'Beyond being a parcel management platform, Stuff Boxes is a community of individuals who share a common goal making the process of sending and receiving parcels a breeze. We foster an environment of collaboration and mutual support, both within our team and with our valued users.'
        },
        {
            'id': 4,
            'title': 'A Future Focused on You',
            'description': 'As we look to the future, our commitment remains steadfast. We are dedicated to evolving alongside the ever-changing needs of our users, creating new possibilities, and setting the standard for excellence in parcel management. Together, we are shaping a future where sending and receiving parcels is not just a transaction but a seamless, enjoyable experience.'
        },
    ]

    return (
        <div className="mt-10 py-20 container mx-auto">
            <Helmet><title>About Us</title></Helmet>
            <div className="flex justify-between lg:flex-row flex-col gap-5">
                <div className="basis-1/2 relative flex lg:justify-start md:justify-around rounded">
                    <img className="rounded md:pl-6 px-3" src={ceo} alt="" />
                    <div className="absolute lg:w-2/5 md:w-3/5 w-4/5 right-0 space-y-1 md:space-y-3 bg-white px-6 py-4 rounded-lg -bottom-14 md:right-14">
                        <h2 className="text-[#16A7FC] md:text-lg text-base font-bold">Bari Siddique </h2>
                        <p className="text-[#6F1DF4] font-thin font-raleway md:text-base text-sm">CEO- Staff in Boxes </p>
                        <q className="md:text-sm text-xs text-[#3C3C43D9]">Leadership is not about titles, it is about actions. A CEO true impact is measured by the inspiration they ignite, the challenges they embrace, and the collaborative spirit they foster within their team</q>
                        <p className="text-right font-signature font-bold">-Bari Siddique</p>
                    </div>
                </div>
                <div className="basis-1/2 flex flex-col justify-center lg:mt-0 mt-14">
                    <h1 className="text-center mb-5 font-raleway font-bold text-4xl text-black">Our CEO Say</h1>
                    <div className="grid grid-cols-2 gap-4">
                        {
                            about.map(item => <article key={item.id}>
                                <h2 className="md:text-xl text-lg text-black mb-3 font-bold">{item.title}</h2>
                                <q className="text-justify md:text-base text-sm">{item.description}</q>
                            </article>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;