import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apicalls/users";
import { Form, Row, Col, Input, Button, ConfigProvider, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (val) => {
    try {
      dispatch(ShowLoading());
      const res = await loginUser(val);
      dispatch(HideLoading());
      if (res.success) {
        message.success(res.message);
        localStorage.setItem("token", res.data);
        // navigate("/");
        window.location.href = "/";
      } else {
        message.error(res.message);
      }
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  };

  return (
    <div className="bg-cus3 flex items-center justify-center h-screen">
      <div className=" bg-cus5 shadow-2xl p-5 w-96 rounded-lg ">
        <div className="flex item-center justify-between my-6 ">
          <h1 className="text-2xl text">Fast Pay- Login</h1>
        </div>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Email" name="email">
                <Input placeholder="Email" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Password" name="password">
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
              <Button
                className="bg-cus1 text-cus4 h-9 w-screen"
                htmlType="submit"
              >
                Login
              </Button>
            </ConfigProvider>
          </div>
          <h1
            className="text-sm underline my-2 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Not a member? Register
          </h1>
        </Form>
      </div>
    </div>
  );
};

export default Login;
