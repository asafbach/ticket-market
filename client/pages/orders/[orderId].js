
import { useEffect, useState } from 'react';
import UseRequest from '../../hooks/use-request';
import {
  Elements,
} from '@stripe/react-stripe-js';
import StripeForm from '../../components/stripeForm';
import {loadStripe} from '@stripe/stripe-js';
import Router from 'next/router';

const stripePromise =  loadStripe('pk_test_51JP2jiKqaIld5PRXS5ONYrhLdp9SSYYvRD5dk9P3ZSDQe2kWidvjNagPsel2Su1buXvaW7exfPibYtkIWD364V6P00hg2OXTY9');

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

    const {doRequest, errors} = UseRequest({
        url:'/api/payments',
        method:'post',
        body:{
            orderId : order.id
        },
        onSuccess : (payment) => {Router.push('/orders')}
    });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  const getStripeToken = (token) =>{
    doRequest({token : 'tok_visa'});
    console.log(`tokenId= ${token} orderId=${order.id}`);
  };

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <Elements stripe={stripePromise}>
        <StripeForm getStripeToken = {getStripeToken}/>
     </Elements>
     {errors}
    </div>
  );

};



OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;