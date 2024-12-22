import React, { useState } from 'react';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Popconfirm
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

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

export function UserProfile() {

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <Row className="rm-register">
        <Col xs={{ span: 24 }} sm={{ span: 8, offset: 8 }}>
          <Divider orientation="left" style={{ margin: "0 0 30px" }}>Update User Profile</Divider>
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
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="password"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm New Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
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

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Popconfirm
                title="Are you sure you want to delete your account. This cannot be undone."
                open={open}
                onConfirm={handleOk}
                onCancel={handleCancel}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <Button danger type="primary" onClick={showPopconfirm} style={{ margin: "0 20px" }}>
                  Delete user account
                </Button>
              </Popconfirm>
            </Form.Item>
          </Form>
        </Col>
      </Row >
    </>
  )

};
