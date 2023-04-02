import React, { useEffect, useState } from "react";
import { Form, Modal, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { TransferFunds, VerifyAccount } from "../apicalls/transactions";
import { setReloadUser } from "../redux/usersSlice";

const { TextArea } = Input;

const TransferFundsModel = ({
  showTransferFunds,
  setShowTransferFunds,
  reloadData,
}) => {
  const user = useSelector((state) => state.users.user);
  const [isVerified, setIsVerified] = useState(null);
  const [account, setAccount] = useState();
  const [amount, setAmount] = useState(0);
  //   const [form] = Form.useForm();
  const dispatch = useDispatch();
  const verifyAccount = async (values) => {
    try {
      const acc = account;

      dispatch(ShowLoading());
      const res = await VerifyAccount({
        receiver: acc,
      });
      console.log(res);
      dispatch(HideLoading());
      if (res.success) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    } catch (err) {
      setIsVerified(false);
      dispatch(HideLoading());
      console.log(err);
    }
  };
  console.log(user.balance);
  const onFinish = async (values) => {
    try {
      console.log("called");
      dispatch(ShowLoading());
      const payload = {
        ...values,
        reference: values.reference || "no ref",
        sender: user._id,
        status: "success",
      };
      const res = await TransferFunds(payload);
      if (res.success) {
        reloadData();
        setShowTransferFunds(false);
        message.success(res.message);
        dispatch(setReloadUser(true));
      } else {
        message.error(res.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(HideLoading());
    }
  };
  return (
    <div>
      <Modal
        title="Transfer Funds"
        open={showTransferFunds}
        onCancel={() => {
          setShowTransferFunds(false);
        }}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <div className="flex gap-2 items-center">
            <Form.Item
              label="Account number"
              name="receiver"
              className="w-full "
            >
              <Input onChange={(e) => setAccount(e.target.value)} />
            </Form.Item>

            <Button type="primary" className="bg-cus1" onClick={verifyAccount}>
              Verify
            </Button>
          </div>
          {isVerified === true && (
            <div className="bg-success text-cus5 p-2 rounded-sm">
              <h1 className="text-sm">Account Verified</h1>
            </div>
          )}
          {isVerified === false && (
            <div className="bg-cus6 text-cus5 p-2 rounded-sm">
              <h1 className="text-sm">Invalid Account</h1>
            </div>
          )}
          <Form.Item
            label="Amount"
            name="amount"
            className="w-full"
            rules={[
              { max: user?.balance, message: "Insufficient balance" },
              // { min: 5, message: "Insufficient balance" },
              { required: true, message: "Please input Amount" },
            ]}
          >
            <Input onChange={(e) => setAmount(e.target.value)} />
          </Form.Item>
          {amount > user.balance && (
            <div className="bg-cus6 text-cus5 p-2 rounded-sm">
              <h1 className="text-sm">Insufficient balance</h1>
            </div>
          )}
          <Form.Item label="Reference" name="reference" className="w-full ">
            <TextArea rows={4} placeholder="Description" maxLength={6} />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button
              type="primary"
              className="bg-cus1"
              onClick={() => {
                setShowTransferFunds(false);
              }}
              htmlType="submit"
            >
              Cancel
            </Button>
            {isVerified && amount <= user.balance && (
              <Button
                type="primary"
                className="bg-cus1"
                // onClick={verifyAccount}
                htmlType="submit"
              >
                Transfer
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TransferFundsModel;
