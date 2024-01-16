import { motion } from "framer-motion";
import { PropTypes } from 'prop-types';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const SquishyCard = ({ service }) => {
    return (
        <section className="">
            <div className="mx-auto ">
                <Card service={service} />
            </div>
        </section>
    );
};

const Card = ({ service }) => {
    const { title, subTitle, description, points, bgColor } = service;

    return (
        <motion.div
            whileHover="hover"
            transition={{
                duration: 1,
                ease: "backInOut",
            }}
            variants={{
                hover: {
                    scale: 1.05,
                },
            }}
            className={`relative shrink-0 overflow-hidden rounded-xl ${bgColor} p-8`}
        >
            <div className="relative z-10 text-white">
                <span className="mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-white">
                    {subTitle}
                </span>
                <motion.span
                    initial={{ scale: 0.85 }}
                    variants={{
                        hover: {
                            scale: 1,
                        },
                    }}
                    transition={{
                        duration: 1,
                        ease: "backInOut",
                    }}
                    className="my-2 block origin-top-left font-mono lg:text-6xl md:text-6xl text-5xl font-black leading-[1.2]"
                >
                    {title}
                </motion.span>
                <p>
                    {description}
                </p>
                <ul className="mt-3">
                    {
                        points.map((point,indx)=><li className="ml-14 font-bold font-raleway flex items-center" key={indx}> <IoMdCheckmarkCircleOutline className="mr-2"/>{point}</li>)
                    }
                </ul>
            </div>
            <div className="mt-10">
                <button className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white">
                    Get it now
                </button>
            </div>
            <Background />
        </motion.div>
    );
};

const Background = () => {
    return (
        <motion.svg
            width="320"
            height="384"
            viewBox="0 0 320 384"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 z-0"
            variants={{
                hover: {
                    scale: 1.5,
                },
            }}
            transition={{
                duration: 1,
                ease: "backInOut",
            }}
        >
            <motion.circle
                variants={{
                    hover: {
                        scaleY: 0.5,
                        y: -25,
                    },
                }}
                transition={{
                    duration: 1,
                    ease: "backInOut",
                    delay: 0.2,
                }}
                cx="160.5"
                cy="114.5"
                r="101.5"
                fill="#262626"
            />
            <motion.ellipse
                variants={{
                    hover: {
                        scaleY: 2.25,
                        y: -25,
                    },
                }}
                transition={{
                    duration: 1,
                    ease: "backInOut",
                    delay: 0.2,
                }}
                cx="160.5"
                cy="265.5"
                rx="101.5"
                ry="43.5"
                fill="#262626"
            />
        </motion.svg>
    );
};
SquishyCard.propTypes = {
    service: PropTypes.object
}
Card.propTypes = {
    service: PropTypes.object
}
export default SquishyCard;