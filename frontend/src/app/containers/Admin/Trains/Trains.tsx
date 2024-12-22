import { Tabs, Row, Col } from 'antd';
import React from 'react';
import { TrainList } from './TrainList';
import { TrainForm } from '../../../components/TrainForm';

export function Trains() {
  return (
    <div className="rm-common-wrapper">
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col span={16}>
          <TrainList />
        </Col>
      </Row>
    </div>
  );
} 
