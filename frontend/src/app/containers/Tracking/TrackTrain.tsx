import React from 'react';
import { Row, Col, Divider, Typography } from 'antd';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const { Title } = Typography;
const containerStyle = {
    width: '1000px',
    height: '400px',
    margin: '30px auto'
};

const center = {
    lat: 6.7744,
    lng: 79.8821
};

export function TrackTrain() {
    return (<>
        <Row>
            <Col xs={{ span: 24 }} sm={{ span: 5, offset: 5 }}>
                <Title level={3}>Expected arrival time - 09:35</Title>
                <Title level={4}>2023/08/27</Title>
                <Title level={4}>Seat No - #1A35, #1A36</Title>
                <Title level={5}>Moratuwa - Colombo Fort</Title>
            </Col>
        </Row>
        <Row>
            <Col xs={{ span: 24 }} sm={{ span: 16, offset: 4 }} className='rm-map-wrapper'>
                <LoadScript
                    googleMapsApiKey="AIzaSyCCEnAA_7wHCqwg7ObI8hT2PDBEtsejClc">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={12}
                    >
                        { /* You can add markers or other components here */}
                    </GoogleMap>
                </LoadScript>
            </Col>
        </Row>
    </>)

};
