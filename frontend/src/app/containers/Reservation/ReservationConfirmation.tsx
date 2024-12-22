import React, { useEffect } from "react";
import {
  Badge,
  Col,
  Descriptions,
  Row,
} from 'antd';
import { useHistory } from 'react-router-dom';

export function ReservationConfirmation() {
  const history = useHistory();
  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/welcome'); // replace '/new-route' with your desired route
    }, 3000);

    return () => clearTimeout(timer); // This will clear the timer if the component is unmounted before the 3 seconds are up
  }, [history]);

  return <div>
    <Row>
      <Col span={8} offset={8}>Thank you for the payment. Redirecting in 3 seconds...</Col>
    </Row>
  </div>;

}
