import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import trainApi from "../../../api/trainApi";
import { Table, Button, Space, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Train {
  key: React.Key;
  id: string,
  trainNumber: string;
  trainName: string;
  origin: string;
  destination: string;
  originValue: string;
  destinationValue: string;
  departure: string;
}


const confirmDelete = async (record) => {
  try {
    console.log(record)
    const results = await trainApi.deleteTrain(record.trainNumber);
    console.log(results, 'red')
    message.success(results.data.message);
    window.location.reload();
  } catch (error) {
    if (error.response && error.response.data.message) {
      message.error(error.response.data.message);
    } else {
      console.log(error)
    }
  }
};


const columns: ColumnsType<Train> = [
  {
    title: 'Train #',
    dataIndex: 'trainNumber',
    sorter: (a, b) => a.trainNumber.localeCompare(b.trainNumber),
    // filterMode: 'tree',
    // filterSearch: true,
    // onFilter: (value: string, record) => record.trainNumber.startsWith(value),
    width: '10%',
  },
  {
    title: 'Train Name',
    dataIndex: 'trainName',
    sorter: (a, b) => a.trainName.localeCompare(b.trainName),
  },
  {
    title: 'Origin',
    dataIndex: 'origin',
    sorter: (a, b) => a.origin.localeCompare(b.origin),
    width: '20%',
  },
  {
    title: 'Destination',
    dataIndex: 'destination',
    sorter: (a, b) => a.destination.localeCompare(b.destination),
    width: '20%',
  },
  {
    title: 'Start Time',
    dataIndex: 'departure',
    sorter: (a, b) => a.departure.localeCompare(b.departure),
    width: '10%',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/admin/trains/${record.id}`}>Edit</Link>
        <Popconfirm title="Are you sure, you want to delete the train？" okText="Yes" cancelText="No" onConfirm={() => { confirmDelete(record) }}>
          <a href="#">Delete</a>
        </Popconfirm>
      </Space>
    ),
  },
];

export function TrainList() {

  const [trains, setTrains] = useState<Train[] | undefined>();

  useEffect(() => {
    const getTrains = async () => {
      try {
        const results = await trainApi.getTrains();
        const newTrains = results.data.map((t: any, index: Number) => {
          const { id, trainNumber, trainName, departure, destination, origin, destinationValue, originValue } = t;
          return {
            key: `train-${index}`,
            id,
            trainNumber,
            trainName,
            origin,
            destination,
            originValue,
            destinationValue,
            departure
          };
        });
        setTrains(newTrains);
      } catch (e) {
        console.error('Error fetching trains:', e);
      }
    };

    getTrains();

  }, []);

  return <>
    <Button type="primary"><Link to="/admin/trains/new">Add Train</Link></Button>
    <Table columns={columns} dataSource={trains} />
  </>;

};
