import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TrainForm } from '../../../components/TrainForm';
import trainApi from "../../../api/trainApi";

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

export function EditTrain() {

    const { trainId } = useParams();
    const [train, setTrain] = useState<Train[] | null>();

    useEffect(() => {
        const getTrainData = async () => {
            try {
                const train = await trainApi.getTrain(trainId);
                console.log(train)
                const {
                    id,
                    trainNumber,
                    trainName,
                    departure,
                    destination,
                    origin,
                    firstClassCompartments,
                    secondClassCompartments,
                    thirdClassCompartments,
                    type,
                    days } = train.data;
                setTrain({
                    id,
                    trainNumber,
                    trainName,
                    origin,
                    destination,
                    firstClassCompartments,
                    secondClassCompartments,
                    thirdClassCompartments,
                    type,
                    departure: dayjs(departure, "HH:mm"),
                    days
                });
            } catch (e) {
                console.error('Error fetching trains:', e);
            }
        };

        getTrainData();

    }, []);

    if (!train) return <></>;

    return (
        <div className="rm-common-wrapper">
            <Row gutter={[16, 16]} justify="center" align="middle">
                <Col span={16}>
                    <TrainForm mode="edit" initialData={{ ...train }} />
                </Col>
            </Row>
        </div>
    );
} 
