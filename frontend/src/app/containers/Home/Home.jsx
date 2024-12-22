import React from "react";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col, Button, Checkbox, Form, Input, Divider } from 'antd';
import logo from '../../assets/img/logo.png';


export function Home() {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className="rm-home">
      <Row className="rm-home__welcome">
        <Col xs={{ span: 24 }} sm={{ span: 16, offset: 4 }} >
          <div>
            <img src={logo} alt="" className="rm-home__logo" />
            <h1>Welcome to National Railway Corporation</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 6, offset: 9 }} >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>
            </Form.Item>
          </Form>
          <Divider>Single Sign On (SSO)</Divider>

          <p><Link to="/login">Sign in with Google</Link></p>

        </Col>
      </Row>
    </div>);
}
