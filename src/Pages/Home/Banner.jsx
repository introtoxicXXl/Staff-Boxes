import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Banner = () => {
    return (
        <section className="container mt-24 px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 mx-auto">
            <div className="space-y-4">
                <span className="block text-xs md:text-sm font-raleway text-indigo-500 font-bold">
                    Better Every Day
                </span>
                <h1 className='text-[#261134] font-bold lg:text-5xl md:text-3xl text-3xl'>We are provide best <br /> courier services.</h1>
                <p className='lg:text-xl md:text-lg text-base font-raleway font-thin'>We deliver your products safely to your home in a reasonable time.</p>
            </div>
            <div>
                <ShuffleGrid />
            </div>
        </section>
    );
};

const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

const squareData = [
    {
        id: 1,
        src: "https://static.imoney.my/articles/wp-content/uploads/2022/06/21174824/courier-delivery.jpg",
    },
    {
        id: 2,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw5OOLFD1TsF0w1Ouj51i52q_Rfz6GF4Ay4czdCjwF258mEGhcpXnNovVV4-OPO0Lyz6Y&usqp=CAU",
    },
    {
        id: 3,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBagLz7w7e-Iwbw3-3IxUx3E7NlU3Q8dlT3_6MaT3GkhK6DJHtVZeBUXUadT0OoiHKJJs&usqp=CAU",
    },
    {
        id: 4,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoQIgHu2FAeNcJpMMenGqdhEjcSyM2kbXt2Q&usqp=CAU",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1620455800201-7f00aeef12ed?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1607227063002-677dc5fdf96f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1604605801370-3396f9bd9cf0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1493135637657-c2411b3497ad?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 10,
        src: "https://images.unsplash.com/photo-1615678815958-5910c6811c25?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 11,
        src: "https://images.unsplash.com/photo-1609143739217-01b60dad1c67?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 12,
        src: "https://images.unsplash.com/photo-1608535002897-27b2aa592456?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 13,
        src: "https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=1531&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 14,
        src: "https://plus.unsplash.com/premium_photo-1682090258246-74c9293d4d75?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 15,
        src: "https://images.unsplash.com/photo-1595167543180-e7894b577443?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 16,
        src: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

const generateSquares = () => {
    return shuffle(squareData).map((sq) => (
        <motion.div
            key={sq.id}
            layout
            transition={{ duration: 1.5, type: "spring" }}
            className="w-full h-full"
            style={{
                backgroundImage: `url(${sq.src})`,
                backgroundSize: "cover",
            }}
        ></motion.div>
    ));
};

const ShuffleGrid = () => {
    const timeoutRef = useRef(null);
    const [squares, setSquares] = useState(generateSquares());

    useEffect(() => {
        shuffleSquares();

        return () => clearTimeout(timeoutRef.current);
    }, []);

    const shuffleSquares = () => {
        setSquares(generateSquares());

        timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };

    return (
        <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
            {squares.map((sq) => sq)}
        </div>
    );
};

export default Banner;