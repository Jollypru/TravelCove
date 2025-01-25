import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckOutForm = () => {
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async(event) =>{
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);

        if(!card){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log('Payment error', error);
            setError(error.message);
        }else{
            console.log('Payment method:' , paymentMethod);
            setError(null);
        }
    }
    return (
        <div className='mt-8'>
            <form onSubmit={handleSubmit}>
                <CardElement 
                    options={{
                        style: {
                            base:{
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder':{
                                    color:'#aab7c4'
                                },
                            },
                            invalid: {
                                color: '#9e2146'
                            },
                        },
                    }}
                >
                </CardElement>
                <button className='bg-sky-700 px-3 text-white mt-5' type='submit' disabled={!stripe}>Pay</button>
                <p className='text-red-700'>{error}</p>
            </form>
        </div>
    );
};

export default CheckOutForm;