import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import moment from "moment";

const CheckoutForm = () => {
    const { user } = useAuth();
    const[loading,setLoading]=useState(false)
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const { data: item = {}, refetch } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookMyParcel/${id}`);
            return res.data
        }
    })
    const price = item.price;
    useEffect(() => {
        if (price) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, price])
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        // conform payment 
        const { paymentIntent, error: paymentErr } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'Anonymous',
                    name: user?.displayName || 'Anonymous'
                }
            }
        })
        if (paymentErr) {
            console.log(paymentErr)
        } else {
            if (paymentIntent.status === 'succeeded') {
                console.log(paymentIntent)
                const paymentInfo = {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'Anonymous',
                    transactionId: paymentIntent.id,
                    price: price,
                    paymentUserId: item._id,
                    deliveryManId: item.deliveryManId,
                    date: moment().format('LLL'),
                    paymentStatus: 'Success'
                }
                const res = await axiosSecure.post('/payment', paymentInfo);
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Congress",
                        text: `${price} taka payment complete`,
                        icon: "success"
                    });
                    refetch();
                    setLoading(false)
                }
            }
        }
    }

    return (
        <div className="md:w-11/12 mx-auto h-screen flex justify-evenly items-center lg:flex-row flex-col gap-5">
            <div className="w-full lg:basis-1/2">
                <form className=" w-full">
                    <CardElement className="py-4 px-3 rounded-lg border-2 bg-white" />
                </form>
            </div>
            <div className="lg:basis-1/2">
                <div className=" bg-slate-300/20 px-6 py-4  rounded-2xl space-y-6 shadow-md">
                    <div className="space-y-2">
                        <h2 className="text-slate-800 font-medium md:text-xl sm:text-lg ">{item?.parcelType}</h2>

                    </div>
                    <div className="mt-5 flex justify-between items-center font-medium">
                        <h2 className="md:text-xl text-gray-800 mr-5">{item?.price} Taka</h2>
                        <button className="bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold md:text-base sm:text-sm text-[12px] hover:bg-slate-900" disabled={!stripe || !clientSecret} type="submit" onClick={handleSubmit}>
                        {loading ? <span className="loading loading-spinner"></span> : 'Pay'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;