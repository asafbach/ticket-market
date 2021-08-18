import { useMemo , useEffect} from "react";

import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
}   from '@stripe/react-stripe-js';


const StripeForm = ( {getStripeToken}) => {
    //console.log('running StripeForm');

    // useEffect(() => {

    // }, [stripe]);

    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async event => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          console.log('Stripe.js has not loaded yet. Make sure to disable');
          return;
        }
    
        const payload = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement),
          billing_details : {
              email : 'asafb054@gmail.com',
          }
        });
        
        //console.log("[PaymentMethod]", payload);
        const token = payload.paymentMethod.id;
        console.log("[PaymentMethod]", token);
        getStripeToken(token);
      };


    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'> 
            <label>
                Card number
            </label>
            <CardNumberElement  className='form-control'/>
            </div>
            <div className='form-group'> 
            <label>
                Card expiry
            </label>
            <CardExpiryElement  className='form-control'/>
            </div>
            <div className='form-group'> 
            <label>
                Card cvc
            </label>
            <CardCvcElement  className='form-control'/>
            </div>
            <button className='btn btn-primary' type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
  };

  export default StripeForm;



  //https://stripe.com/docs/stripe-js/react#element-components




