import { Divider, Radio, Table, Button, Row, Col, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react';
import trainApi from "../../api/trainApi";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { stationNames } from '../../assets/stations';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Your Station',
    dataIndex: 'yourStation',
  },
  {
    title: 'Arrival Time',
    dataIndex: 'arrivalTime',
  },
  {
    title: 'Departure Time',
    dataIndex: 'departureTime',
  },
  {
    title: 'Your End Station',
    dataIndex: 'yourEndStation',
  },
  {
    title: 'Destination',
    dataIndex: 'destination',
  },
];

const getLabelForValue = (valueToFind: string) => {
  const station = stationNames.find((station) => station.value === valueToFind);
  return station ? station.label : null;
}



export function ReservationStepTwo(props) {
  const [selectedRow, setSelectedRow] = useState();
  const [isError, setIsError] = useState(false);
  const [trainData, setTrainData] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRow(selectedRows);
      const selectedRow = { ...selectedRows[0] }
      console.log(selectedRow, 'selectedrow')
      console.log({ ...props.data, ...selectedRow }, 'ssss')
      props.setData({ ...props.data, ...selectedRow })
      setIsError(false)
    },
  };

  const onNextBtnClick = () => {
    if (selectedRow) {
      props.setCurrent(2)
    }
    setIsError(true)
  }

  useEffect(() => {
    console.log(props.data, "ata")
    const getTrains = async () => {
      try {
        const { date, startStation, endStation, startTime, endTime } = props.data;
        const formattedDate = dayjs(date).format('ddd').toLowerCase();
        const direction = parseInt(startStation) > parseInt(endStation) ? "up" : "down";
        const startTimeFormatted = dayjs(startTime).format('HH:mm');
        const endTimeFormatted = dayjs(endTime).format('HH:mm');
        console.log(formattedDate, direction, startTimeFormatted, endTimeFormatted);
        const results = await trainApi
          .getTrains(`days=${formattedDate}&direction=${direction}&start=${startTimeFormatted}&end=${endTimeFormatted}&startstation=${startStation}&endstation=${endStation}`);
        // .getTrains(`days=sun&direction=up&start=04:00&end=07:00&startstation=005&endstation=007`);
        // message.success('The new train created successfully.');


        const trainData = results.data.map(async (train) => {
          const { arrival,
            createdAt,
            days,
            departure,
            destination,
            destinationValue,
            direction,
            firstClassCompartments,
            origin,
            originValue,
            secondClassCompartments,
            thirdClassCompartments,
            trainName,
            trainNumber,
            type } = train;

          const getDistanceData = async (from: String, to: String) => {
            console.log(from, 'from')
            console.log(to, 'to')
            try {
              const results: any = await trainApi.getDistance(from, to);
              if (results) {
                // console.log(results, 'getDistance results')
                // console.log(results.data.duration, 'duration')
                const duration = results.data.duration;
                console.log(duration, 'getDistance duration')
                // console.log(departure, 'departure')
                // console.log(dayjs(departure).format('HH:mm'), 'departure')
                const dateObject = dayjs(departure, "HH:mm");
                const dateString = dateObject.format("YYYY-MM-DD HH:mm")
                // console.log(dateString);
                console.log(dayjs(dateString).add(duration, 'minute'), 'add')
                return dayjs(dateString).add(duration, 'minute').format('HH:mm');
              }
            } catch (e) { }
          };

          const startStationTime = await getDistanceData(originValue, getLabelForValue(startStation));
          const endStationTime = await getDistanceData(originValue, getLabelForValue(endStation));

          console.log(startStationTime, 'sga')
          console.log(endStationTime, 'end')

          return ({
            yourStation: getLabelForValue(startStation),
            arrivalTime: startStationTime,
            departureTime: startStationTime,
            yourEndStation: getLabelForValue(endStation),
            destination: destinationValue
          })


        })

        const trainDataResolved = await Promise.all(trainData);
        setTrainData(trainDataResolved);

        // setTrainData

        // console.log(trainData, 'trainData')

      } catch (error: any) {
        if (error.response && error.response.data.message) {
          message.error(error.response.data.message);
        } else {
          console.log(error)
        }
      }
    };

    getTrains();
    // setTrainData(trains);

  }, [props.data])

  return (
    <div>
      <Row>
        <Col span={24} align="middle">
          {trainData && <Table
            rowSelection={{
              type: 'radio',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={trainData}
          />}

        </Col>
      </Row>

      <Row>
        <Col span={24} align="middle">
          {isError && <div className="error" style={{ color: "#ff4d4f" }}>Please Select a Train.</div>}
        </Col>
      </Row>

      <Row>
        <Col span={24} align="middle">
          <Button onClick={() => { props.setCurrent(0) }} style={{ margin: "50px 20px", width: 100 }} >
            Back
          </Button>
          <Button type="primary" onClick={onNextBtnClick} style={{ margin: "50px 20px", width: 100 }}>
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};
