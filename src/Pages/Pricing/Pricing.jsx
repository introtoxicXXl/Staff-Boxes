import { useEffect, useState } from "react";
import SquishyCard from "../../Components/SquishyCard/SquishyCard";
import Loader from "../../Components/Loader/Loader";

const Pricing = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setLoading(false);
        };
        fetchData();
    }, []);
    const prices = [
        {
            'id': 1,
            'title': 'Light Parcel Plan',
            'subTitle': '0-1KG',
            'price': 50,
            'description': 'A budget-friendly option for small parcels up to 1 kg. Enjoy secure and efficient delivery with real-time tracking, perfect for lightweight items and important documents.',
            'points': ['Ideal for small parcels weighing up to 1 kg', 'Secure and affordable delivery', 'Real-time tracking for peace of mind', 'Perfect for lightweight items and documents'],
            'bgColor': 'bg-indigo-500'
        },
        {
            'id': 2,
            'title': 'Standard Parcel Plan',
            'subTitle': '1-2KG',
            'price': 100,
            'description': 'Our Standard Parcel Plan caters to shipments within the 1-2 kg range. Experience an enhanced parcel management journey with faster delivery, priority handling, and comprehensive tracking.',
            'points': ['Suitable for parcels within the 1-2 kg range', 'Enhanced features for a seamless experience', 'Faster delivery with priority handling', 'Comprehensive tracking and notifications'],
            'bgColor': 'bg-violet-600'
        },
        {
            'id': 3,
            'title': 'Premium Parcel Plan',
            'subTitle': 'Up to 2Kg',
            'price': 150,
            'description': 'For a comprehensive solution to parcels up to 2 kg, choose our Premium Parcel Plan. Benefit from expedited delivery, premium tracking, and priority customer support for a seamless experience.',
            'points': ['Comprehensive solution for parcels up to 2 kg', 'Expedited delivery service', 'Premium tracking with detailed status updates', 'Priority customer support for any inquiries'],
            'bgColor': 'bg-pink-600'
        },
        {
            'id': 4,
            'title': 'Medium Parcel Plan',
            'subTitle': '10-30Kg',
            'price': 1500,
            'description': 'Tailored for medium-sized parcels weighing 20-30 kg, our Medium Parcel Plan offers secure and reliable delivery, advanced tracking, priority handling, and insurance coverage for added peace of mind.',
            'points': ['Tailored for medium-sized parcels, weighing 10-20 kg', 'Secure and reliable delivery for heavier items', 'Advanced tracking features', 'Priority handling and insurance coverage'],
            'bgColor': 'bg-green-600'
        },
        {
            'id': 5,
            'title': 'Large Parcel Plan',
            'subTitle': '30-100Kg',
            'price': 3500,
            'description': 'Specifically designed for larger shipments between 30-100 kg, our Large Parcel Plan provides expedited delivery, special handling, robust tracking, and dedicated customer support for your heavier items.',
            'points': ['Specifically designed for larger parcels, 30-100 kg', 'Expedited delivery and special handling', 'Robust tracking and notifications', 'Dedicated customer support for your heavier shipments'],
            'bgColor': 'bg-cyan-600'
        },
        {
            'id': 6,
            'title': ' Heavy Parcel Plan',
            'subTitle': 'Up to 100Kg',
            'price': 6500,
            'description': 'Our Heavy Parcel Plan is the ultimate solution for parcels up to 100 kg. Experience specialized handling, premium tracking, and priority customer support, ensuring a smooth and secure delivery for your heavier shipments.',
            'points': ['Comprehensive solution for parcels up to 100 kg', 'Specialized handling for heavy shipments', 'Premium tracking with real-time updates', 'Priority customer support and insurance coverage'],
            'bgColor': 'bg-rose-600'
        },
    ]

    return (
        <div>
            {
                loading ? <Loader /> : <div className="container mx-auto my-20 py-10">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 lg:px-0 px-3">
                        {
                            prices.map(service => <SquishyCard key={service.id} service={service} />)
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Pricing;