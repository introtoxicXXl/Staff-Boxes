import SquishyCard from "../../Components/SquishyCard/SquishyCard";

const OurService = () => {
    const services = [
        {
            'id': 1,
            'title': 'For Business',
            'subTitle': 'BUSINESS',
            'description': 'We give you complete reliable delivery for your company.  We will take full responsibility of the deliveries.',
            'points': ['Corporate goods', 'Shipment', 'Accessories'],
            'bgColor': 'bg-indigo-500'
        },
        {
            'id': 2,
            'title': 'For Household',
            'subTitle': 'HOUSEHOLD',
            'description': 'Offering home delivery around the city, where your products will be at your doorstep within 48-72 hours.',
            'points': ['Personal items', 'Parcels', 'Documents'],
            'bgColor': 'bg-violet-600'
        },
        {
            'id': 3,
            'title': 'For Personal',
            'subTitle': 'PERSONAL',
            'description': 'You can trust us to safely deliver your most sensitive documents to the specific area in a short time.',
            'points': ['Gifts', 'Package', 'Documents'],
            'bgColor': 'bg-pink-600'
        }
    ]

    return (
        <div className="container mx-auto lg:px-0 px-5 space-y-7 my-10">
            <div className="text-center">
                <h3 className="text-[#16A7FC] md:text-4xl text-xl font-bold font-oxanium">SERVICES</h3>
                <h1 className="font-raleway lg:text-5xl md:text-4xl text-2xl font-bold">Our services for you</h1>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    services.map(service => <SquishyCard key={service.id} service={service} />)
                }
            </div>
        </div>
    );
};

export default OurService;