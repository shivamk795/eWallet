import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../apicalls/users";
import {
  Select,
  Form,
  Row,
  Col,
  Input,
  Button,
  ConfigProvider,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

const { TextArea } = Input;
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (val) => {
    try {
      dispatch(ShowLoading());
      const res = await registerUser(val);
      dispatch(HideLoading());
      if (res.success) {
        message.success(res.message);
        navigate("/login");
      } else {
        message.error(res.message);
      }
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  };
  return (
    <div className="bg-cus3 flex items-center justify-center h-screen ">
      <div className="m-14 ">
        <div className="flex item-center justify-between my-6">
          <h1 className="text-2xl text">Fast Pay- Registration</h1>
          <h1
            className="text-sm underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already a member? Login
          </h1>
        </div>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="First Name" name="firstName">
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Last Name" name="lastName">
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Email" name="email">
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Mobile" name="phoneNumber">
                <Input placeholder="Mobile" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Identification Type" name="identificationType">
                <Select
                  placeholder="Identification Type"
                  options={[
                    { value: "NATIONAL ID", label: "NATIONAL ID" },
                    { value: "PASSPORT", label: "PASSPORT" },
                    { value: "DRIVING LICENSE", label: "DRIVING LICENSE" },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Identification Number"
                name="identificationNumber"
              >
                <Input placeholder="Identification Number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Address" name="address">
                <TextArea
                  placeholder="Address"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Password" name="password">
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Confirm Password" name="confirmPassword">
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#def2f1",
                },
              }}
            >
              <Button className="bg-cus1 text-cus4 w-20 h-9" htmlType="submit">
                Register
              </Button>
            </ConfigProvider>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
