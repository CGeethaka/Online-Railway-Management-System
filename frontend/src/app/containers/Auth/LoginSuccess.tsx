import React, { useEffect } from "react";
import logo from '../../assets/img/logo.png';
import { Row, Col } from 'antd';


export function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);


  return <div className="rm-login-success">
    <Row gutter={[16, 16]} justify="center" align="middle" style={{ height: '100%' }}>
      <Col>
        <div>
          <img src={logo} alt="" className="rm-login-success__logo" />
          <p>Sign In Succssful.</p>
        </div>
      </Col>
    </Row>
  </div>;
}
