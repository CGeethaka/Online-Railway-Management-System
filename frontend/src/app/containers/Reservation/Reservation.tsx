import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, message, Steps, theme } from 'antd';
import { ReservationStepOne } from "./ReservationStepOne";
import { ReservationStepTwo } from "./ReservationStepTwo";
import { ReservationStepThree } from "./ReservationStepThree";
import { ReservationStepFour } from "./ReservationStepFour";
import { ReservationStepFive } from "./ReservationStepFive";

const { Step } = Steps;

// const steps = [
//   {
//     title: 'Search Train',
//     content: <ReservationStepOne ref={childRef} />,
//   },
//   {
//     title: 'Select Train',
//     content: <ReservationStepTwo />,
//   },
//   {
//     title: 'Select Seats',
//     content: <ReservationStepThree />,
//   },
//   {
//     title: 'Confrimation',
//     content: <ReservationStepFour />,
//   },
//   {
//     title: 'Payment',
//     content: <ReservationStepFive />,
//   },
// ];


export function Reservation() {
  const childRef = useRef();

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);


  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onNextClick = () => {
    if (current == 0) {

    }
    next()
  }

  // const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: 20
  };
  return (
    <div className="rm-reservations">
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          {/* <Steps current={current} items={items} /> */}

          <Steps current={current}>
            <Step key="search" title="Search Train" />
            <Step key="select" title="Select Train" />
            <Step key="seats" title="Select Seats" />
            <Step key="confirm" title="Confirmations" />
            <Step key="pay" title="Payment" />
          </Steps>


          <div style={contentStyle}>

            {current === 0 && (<ReservationStepOne setCurrent={setCurrent} data={data} setData={setData} />)}
            {current === 1 && (<ReservationStepTwo setCurrent={setCurrent} data={data} setData={setData} />)}
            {current === 2 && (<ReservationStepThree setCurrent={setCurrent} data={data} setData={setData} />)}
            {current === 3 && (<ReservationStepFour setCurrent={setCurrent} data={data} setData={setData} />)}
            {current === 4 && (<ReservationStepFive setCurrent={setCurrent} data={data} setData={setData} />)}

          </div>

          {/* <div style={contentStyle}>{steps[current].content}</div> */}
          <div style={{ marginTop: 24 }}>
            {/* {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={onNextClick}>
                Next
              </Button>
            )} */}
            {/* {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )} */}
          </div>
        </Col>
      </Row>
    </div >);
}
