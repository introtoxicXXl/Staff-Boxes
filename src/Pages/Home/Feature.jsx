
import { PropTypes } from "prop-types";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa";
import { PiHandHeartBold } from "react-icons/pi";

const Feature = () => {
    return (
        <div className="py-4 my-10 container mx-auto">
            <div className="w-4/5 mx-auto">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <Card title="On time delivery" Icon={FaRegClock} />
                    <Card title="Fast home delivery" Icon={TbTruckDelivery} />
                    <Card title="We are your product" Icon={PiHandHeartBold} />
                </div>
            </div>
        </div>
    );
};

const Card = ({ title, Icon }) => {
    return (
        <span
            className="w-full p-4 hover:cursor-pointer rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-400 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
            <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
            <div className="">
                <Icon className="mb-2 text-4xl text-[#16A7FC] group-hover:text-white transition-colors relative z-10 duration-300" />
                <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
                    {title}
                </h3>
            </div>
        </span>
    );
};
Card.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    Icon: PropTypes.img,
    href: PropTypes.link,
}

export default Feature;