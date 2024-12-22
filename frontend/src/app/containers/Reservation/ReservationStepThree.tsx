import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/img/logo.png';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { RadioChangeEvent } from 'antd';
import {
  Col,
  Row,
  Button,
  Select,
  Form,
  TimePicker,
  Radio,
  Checkbox,
  Typography,
  Steps,
  Divider
} from 'antd';
import trainApi from "../../api/trainApi";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';


dayjs.extend(customParseFormat);


export function ReservationStepThree(props) {
  const { Title } = Typography;
  const { Step } = Steps;
  const [value, setValue] = useState(1);

  const axios = require('axios').default;
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const checkTrain = () => {
    const getDistanceData = async () => {
      try {
        const results = await trainApi.getDistance();
        console.log(results)
      } catch (e) { }
    };
    getDistanceData();

    console.log('jjjj')
  }

  // const onChange = (e: CheckboxChangeEvent) => {
  //   console.log(`checked = ${e.target.checked}`);
  // };

  const onNextBtnClick = () => {
    // if (selectedRow) {
    props.setCurrent(3)
    // }
    // setIsError(true)
  }

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };

  const options = [
    { label: 'A1', value: 'A1' },
    { label: 'A2', value: 'A2' },
    { label: 'A3', value: 'A3', disabled: true },
    { label: 'A2', value: 'A2' },
    { label: 'A2', value: 'A2' },
    { label: 'A2', value: 'A2' },
    { label: 'A2', value: 'A2' },
    { label: 'A2', value: 'A2' },
    { label: 'A2', value: 'A2' },
    { label: 'A2', value: 'A2' },
  ];

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    marginTop: 16,
  };

  useEffect(() => {
    console.log(props.data)
  });

  return (
    <div className="rm-reservations--step-three">
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
          <Divider orientation="left">1. Select the Carriage</Divider>
          <Radio.Group onChange={e => { }} className="seats" style={{ display: 'flex', flexDirection: 'column' }}>
            <Radio.Button value="1A">First Class Carriage 1</Radio.Button>
            <Radio.Button value="1B">First Class Carriage 2</Radio.Button>
            <Radio.Button value="2A">Second Class Carriage 1</Radio.Button>
            <Radio.Button value="2B">Second Class Carriage 2</Radio.Button>
            <Radio.Button value="3A">Third Class Carriage 1</Radio.Button>
            <Radio.Button value="3A">Third Class Carriage 2</Radio.Button>
            <Radio.Button value="3A">Third Class Carriage 3</Radio.Button>
          </Radio.Group>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 8, offset: 4 }}>
          <Divider orientation="left">2. Select the Seats</Divider>
          <Form.Item>
            <Checkbox.Group options={options} onChange={onChange} style={contentStyle} />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ margin: "50px 0 25px" }}>
        <Col span={24}>
          <Divider>Selected</Divider>
        </Col>
      </Row>
      <Row style={{ margin: "25px 0" }}>
        <Col xs={{ span: 24 }} sm={{ span: 3, offset: 9 }}>
          <Title level={5}>First Class Seats:</Title>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 4 }}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            options={options}
          />
        </Col>
      </Row>
      <Row style={{ margin: "25px 0" }}>
        <Col xs={{ span: 24 }} sm={{ span: 3, offset: 9 }}>
          <Title level={5}>Second Class Seats:</Title>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 4 }}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            options={options}
          />
        </Col>
      </Row>
      <Row style={{ margin: "25px 0" }}>
        <Col xs={{ span: 24 }} sm={{ span: 3, offset: 9 }}>
          <Title level={5}>Third Class Seats:</Title>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 4 }}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            options={options}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} align="middle">
          <Button onClick={() => { props.setCurrent(1) }} style={{ margin: "50px 20px", width: 100 }} >
            Back
          </Button>
          <Button type="primary" onClick={onNextBtnClick} style={{ margin: "50px 20px", width: 100 }}>
            Next
          </Button>
        </Col>
      </Row>

    </div >);
}
