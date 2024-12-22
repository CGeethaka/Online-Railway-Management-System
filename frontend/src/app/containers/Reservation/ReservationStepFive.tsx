import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import paymentApi from "../../api/paymentApi";
import { Col, Divider, Row } from "antd";

export function ReservationStepFive() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");


  const getConfig = () => {
    const getConfig = async () => {
      try {
        const result: any = await paymentApi.getConfig();
        console.log(result, 'getconfig results')
        const { publishableKey } = result.data;
        setStripePromise(loadStripe(publishableKey));
      } catch (e) { }
    };
    getConfig();

    console.log('jjjj')
  }

  const createPaymentIntent = () => {
    const createPaymentIntent = async () => {
      try {
        const result: any = await paymentApi.createPayementIntent();
        console.log(result, 'intent results')
        const { clientSecret } = result.data;
        console.log(clientSecret, 'intent clientSecret')
        setClientSecret(clientSecret);
      } catch (e) { }
    };
    createPaymentIntent();

    console.log('aaa')
  }

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    createPaymentIntent();
  }, []);

  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 8, offset: 8 }} align="middle">
          <Divider>Payment</Divider>
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </Col>
      </Row>
    </>
  );
}

export default ReservationStepFive;