import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DepositFunds } from "../apicalls/transactions";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

const DepositModel = ({
  showDepositModal,
  setShowDepositModal,
  reloadData,
}) => {
  const [amount, setAmount] = useState(10);
  const dispatch = useDispatch();
  const onFinish = () => {};
  const checkout = async () => {
    dispatch(ShowLoading());
    const res = await DepositFunds({ amount });
    dispatch(HideLoading());
    console.log(res);
    setShowDepositModal(false);
    window.location.replace(res.data);
  };
  return (
    <div>
      <Modal
        title={"Deposit"}
        open={showDepositModal}
        onCancel={() => setShowDepositModal(false)}
        footer={null}
      >
        <div className="flex-col gap-1">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Amount"
              name="receiver"
              className="w-full "
              rules={[{ required: true, message: "Please input amount" }]}
            >
              <Input onChange={(e) => setAmount(e.target.value)} />
            </Form.Item>
          </Form>
        </div>
        <p className="text-cus6 py-2">
          Kindly use same email as registered email on Checkout page.
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            type="primary"
            className="bg-cus1"
            onClick={() => {
              // setShowTransferFunds(false);
            }}
            htmlType="submit"
          >
            Cancel
          </Button>

          <Button
            type="primary"
            className="bg-cus1"
            htmlType="submit"
            onClick={checkout}
          >
            Deposit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DepositModel;
