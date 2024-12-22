import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  Col,
  Row,
  Button,
  message,
  Form,
  TimePicker,
  Select,
  Input,
  Tree,
  InputNumber,
} from 'antd';
import { stationNames } from '../assets/stations';
import { startingStations } from '../assets/startingStations';
import trainApi from "../api/trainApi";

interface Train {
  key: React.Key;
  id: string,
  trainNumber: string;
  trainName: string;
  origin: string | null;
  destination: string;
  departure: string;
  arrival: string;
  type: string;
  originValue: string;
  destinationValue: string;
  direction: string;
  days: string
}

interface TrainFormProps {
  mode?: "edit" | "add"; // or whatever modes you expect
  initialData?: Train; // type based on what you expect
}

const { TreeNode } = Tree;
const { Option } = Select;

function getLabelForValue(valueToFind: string) {
  const station = stationNames.find((station) => station.value === valueToFind);
  return station ? station.label : null;
}

export function TrainForm(props: TrainFormProps) {

  const history = useHistory();

  const [form] = Form.useForm();
  const [values, setValues] = useState();
  const [checkedKeys, setCheckedKeys] = useState("");
  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");
  const [treeData, setTreeData] = useState<DataNode[]>([
    {
      title: 'Stations',
      key: 'sec',
      children: []
    },
  ]);

  useEffect(() => {
    if (props.mode === "edit" && props.initialData) {
      setValues(props.initialData);
    } else {
      setValues({
        firstClassCompartments: "0",
        secondClassCompartments: "0",
        thirdClassCompartments: "6",
        type: "slow",
      });
      form.resetFields();
    }
  }, [props.mode, props.initialData]);

  useEffect(() => {
    const direction = parseInt(startStation) > parseInt(endStation) ? "up" : "down";
    if (direction === "up") {
      const allValues =
        stationNames
          .reverse()
          .filter(station => (parseInt(startStation) >= parseInt(station.value)))
          .map((station) => {
            return { key: station.value, title: station.label };
          });
      setTreeData([
        {
          title: 'Stations',
          key: 'sec',
          children: allValues
        },
      ]);
    } else if (direction === "down") {
      const allValues =
        stationNames
          .filter(station => (parseInt(endStation) >= parseInt(station.value)))
          .map((station) => {
            return { key: station.value, title: station.label };
          });
      setTreeData([
        {
          title: 'Stations',
          key: 'sec',
          children: allValues
        },
      ]);
    }
  }, [endStation]);

  const onFinish = (v: any) => {

    const createTrain = async (data: Train) => {
      try {
        const results = await trainApi.createTrain(data);
        history.push('/admin/trains');
        message.success('The new train created successfully.');
        console.log(results)

      } catch (error) {
        if (error.response && error.response.data.message) {
          message.error(error.response.data.message);
        } else {
          console.log(error)
        }
      }
    };

    const getDistanceData = async (from: String, to: String) => {
      try {
        const results: any = await trainApi.getDistance(from, to);


        if (results) {
          const direction = parseInt(v.origin) > parseInt(v.destination) ? "up" : "down";
          const departureFormatted = dayjs(v.departure).format('HH:mm');
          const duration = results.data.duration;
          const arrivalFormatted = dayjs(v.departure).add(duration, 'minute').format('HH:mm');
          const originFormatted = getLabelForValue(v.origin);
          const destinationFormatted = getLabelForValue(v.destination);

          createTrain({
            ...v,
            originValue: originFormatted,
            destinationValue: destinationFormatted,
            departure: departureFormatted,
            arrival: arrivalFormatted,
            stops: checkedKeys,
            direction: direction,
          });
        }
      } catch (e) { }
    };

    getDistanceData(getLabelForValue(v.origin), getLabelForValue(v.destination));

  };

  const onCheck = (keys: string[]) => {
    setCheckedKeys(JSON.stringify(keys));
    console.log(checkedKeys)
  };


  return values ? <Row gutter={[16, 16]} justify="center" align="middle">
    <Col span={16}>
      <Form
        labelCol={{ span: 8 }}
        onFinish={onFinish}
        initialValues={values}
      >
        <Form.Item
          name="trainNumber"
          label="Train Number"
          rules={[
            {
              required: true,
              message: 'Please input train number',
            }
          ]}
        >
          <Input
            style={{ width: 250 }} />
        </Form.Item>
        <Form.Item
          name="trainName"
          label="Train Name"
        >
          <Input
            style={{ width: 250 }} />
        </Form.Item>
        <Form.Item
          name="firstClassCompartments"
          label="Number of First Class Compartments"
          rules={[
            {
              required: true,
              message: 'Please input number of compartments',
            }
          ]}
        >
          <InputNumber min={0} style={{ width: 150 }} />
        </Form.Item>
        <Form.Item
          name="secondClassCompartments"
          label="Number of Second Class Compartments"
          rules={[
            {
              required: true,
              message: 'Please input number of compartments',
            }
          ]}
        >
          <InputNumber min={0} style={{ width: 150 }} />
        </Form.Item>
        <Form.Item
          name="thirdClassCompartments"
          label="Number of Third Class Compartments"
          rules={[
            {
              required: true,
              message: 'Please input number of compartments',
            }
          ]}
        >
          <InputNumber min={0} style={{ width: 150 }} />
        </Form.Item>
        <Form.Item
          name="departure"
          label="Start Time"
          rules={[
            {
              required: true,
              message: 'Please input start time',
            }
          ]}
        >
          <TimePicker format={"HH:mm"} style={{ width: 150 }} />
        </Form.Item>
        <Form.Item
          name="days"
          label="Available Days"
          rules={[
            {
              required: true,
              message: 'Please select days',
            }
          ]}
        >
          <Select
            style={{ width: 150 }}
            options={[
              { value: "sun,mon,tue,wed,thu,fri,sat", label: "Everyday" },
              { value: "mon,tue,wed,thu,fri", label: "Weekdays" },
              { value: "mon,tue,wed,thu,fri,sat", label: "Except Sunday" },]}
          />
        </Form.Item>
        <Form.Item
          name="origin"
          label="Starting Station"
          rules={[
            {
              required: true,
              message: 'Please select a station',
            }
          ]}
        >
          <Select
            style={{ width: 150 }}
            options={startingStations}
            onChange={(e) => {
              console.log(e)
              setStartStation(e);
            }}
          />
        </Form.Item>
        <Form.Item
          name="destination"
          label="Ending Station"
          rules={[
            {
              required: true,
              message: 'Please select a station',
            }
          ]}
        >
          <Select
            style={{ width: 150 }}
            options={startingStations}
            disabled={startStation !== "" ? false : true}
            onChange={(e) => {
              setEndStation(e);
            }}
          />
        </Form.Item>
        <Form.Item
          name="type"
          label="Slow/Express"
          rules={[
            {
              required: true,
              message: 'Please select a type',
            }
          ]}
        >
          <Select
            style={{ width: 150 }}
            options={[{ value: "slow", label: "Slow" },
            { value: "express", label: "Express" }]}
          />
        </Form.Item>
        <Form.Item
          name="stops"
          label="Train Stops"
        >
          <Tree
            checkable
            onCheck={onCheck}
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: 150 }}>
            {Object.keys(values).length === 4 && values.constructor === Object ? "Submit" : "Edit"}
          </Button>
        </Form.Item>
      </Form>
    </Col>
  </Row > : <></>
}
