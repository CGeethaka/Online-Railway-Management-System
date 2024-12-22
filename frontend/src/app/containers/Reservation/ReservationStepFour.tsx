import React from "react";
import {
  Badge,
  Button,
  Col,
  Descriptions,
  Row,
} from 'antd';

export function ReservationStepFour(props) {

  const onNextBtnClick = () => {
    props.setCurrent(4)
  }

  return (
    <div className="rm-reservations--step-four">
      <Row>
        <Col span={24} align="middle">
          <Descriptions title="Reservation Details" bordered>
            <Descriptions.Item label="Email">abc@abc.com</Descriptions.Item>
            <Descriptions.Item label="Date">2023/08/12</Descriptions.Item>
            <Descriptions.Item label="Time">05:30</Descriptions.Item>
            <Descriptions.Item label="From Station">Moratuwa</Descriptions.Item>
            <Descriptions.Item label="To Station">Fort</Descriptions.Item>
            <Descriptions.Item label="Train Name">Moratuwa</Descriptions.Item>
            <Descriptions.Item label="To Station">Fort</Descriptions.Item>
            <Descriptions.Item label="Seat Numbers" span={2}>
              A01,A02,A03
            </Descriptions.Item>
            <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row>
        <Col span={24} align="middle">
          <Button onClick={() => { props.setCurrent(2) }} style={{ margin: "50px 20px", width: 100 }} >
            Back
          </Button>
          <Button type="primary" onClick={onNextBtnClick} style={{ margin: "50px 20px", width: 100 }}>
            Next
          </Button>
        </Col>
      </Row>
    </div >);
}
