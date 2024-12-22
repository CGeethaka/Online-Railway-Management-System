import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


export function Registration() {

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="94">+94</Option>
      </Select>
    </Form.Item>
  );

  const [open, setOpen] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };



  return (
    <>
      <Modal
        open={open}
        title="User Registration Agreement"
        footer={null}
        onCancel={handleCancel}
      >
        <h2>Terms of Service</h2>
        <p>Welcome to National Railway Corporation's website. Please read the following terms and conditions before registering:</p>
        <ol>
          <li>By registering, users agree to abide by all railway regulations and guidelines.</li>
          <li>Users are responsible for maintaining the confidentiality of their account information.</li>
          <li>The National Railway Corporation reserves the right to modify the terms of service at any time. Users will be notified of any changes.</li>
          <li>Any misuse of the website or violation of its terms can result in account termination.</li>
          <li>The data provided during registration will be used according to our Privacy Policy.</li>
          <li>For any disputes arising out of the use of this website, users agree to arbitration under the laws of the website's operating country.</li>
        </ol>
      </Modal>
      <Row className="rm-register">
        <Col xs={{ span: 24 }} sm={{ span: 8, offset: 8 }}>
          <Divider orientation="left">Register</Divider>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              prefix: '94',
            }}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail',
                },
                {
                  required: true,
                  message: 'Please input your E-mail',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                // { required: true, message: 'Please input your phone number!' },
                { pattern: /^\d{10}$/, message: 'Invalid phone number!' }]}
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Please accept agreement')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="" onClick={showModal}>agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row ></>
  );
}
