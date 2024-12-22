import React, { useState, useEffect } from "react";
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
  DatePicker,
  Form,
  TimePicker,
  Select,
  Typography
} from 'antd';
import trainApi from "../../api/trainApi";
import { stationNames } from "../../assets/stations";

dayjs.extend(customParseFormat);

const onChange = (time: Dayjs, timeString: string) => {
  console.log(time, timeString);
};

export function ReservationStepOne(props) {
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);
  const [startTime, setStartTime] = useState();
  const [disabledHours, setDisabledHours] = useState([0, 1, 2, 3, 4]);

  const axios = require('axios').default;

  const { Title } = Typography;
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

  const disabledDate = (current: any) => {
    // Get the current date without time (midnight)
    const currentDate = new Date().setHours(0, 0, 0, 0);

    // Disable all dates before today (currentDate)
    return current && current < currentDate;
  };

  const onStartTimeChange = (value: string) => {
    setStartTime(value);
  };

  const onFinish = (v) => {
    console.log(v)
    const { date, startStation, endStation, startTime, endTime } = v;
    props.setData({ date, startStation, endStation, startTime, endTime })
    props.setCurrent(1)
  }

  useEffect(() => {
    // console.log(Array.from({ length: dayjs(startTime).hour() }, (_, i) => i))
    // setDisabledHours(Array.from({ length: dayjs(startTime).hour() }, (_, i) => i));
  }, [startTime])

  return (
    <div className="rm-reservations--step-one">
      <Form
        labelCol={{ span: 9 }}
        layout="horizontal"
        onFinish={onFinish}
        style={{ padding: 30, margin: "0 auto" }}
      >
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label="Select Date"
              name="date"
              rules={[
                {
                  required: true,
                  message: 'Please input date',
                }
              ]}>
              <DatePicker
                style={{ width: 130 }} disabledDate={disabledDate} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label="Start Station"
              name="startStation"
              rules={[
                {
                  required: true,
                  message: 'Please input start station',
                }
              ]}>
              <Select
                style={{ width: 130 }}
                options={stationNames}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label="End Station"
              name="endStation"
              rules={[
                {
                  required: true,
                  message: 'Please input end station',
                }
              ]}>
              <Select
                style={{ width: 130 }}
                options={stationNames}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label="Start Time"
              name="startTime"
              rules={[
                {
                  required: true,
                  message: 'Please input start time',
                }
              ]}>
              <TimePicker format={"HH:mm"} showNow={true} minuteStep={30} onChange={onStartTimeChange}
                style={{ width: 130 }} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label="End Time"
              name="endTime"
              rules={[
                {
                  required: true,
                  message: 'Please input end time',
                }
              ]}>
              <TimePicker format={"HH:mm"} showNow={true} minuteStep={30} disabled={startTime ? false : true}
                style={{ width: 130 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} align="middle">
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ margin: "50px 0 0", width: 150 }}>
                Next
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div >);
}
