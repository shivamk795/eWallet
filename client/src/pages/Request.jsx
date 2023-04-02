import React, { useEffect } from "react";
import { Button, Table, Tabs, message } from "antd";
import PageTitle from "../components/PageTitle";
import { useState } from "react";
import {
  GetAllRequestsByUser,
  updateRequestStatus,
} from "../apicalls/requests";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import RequestModel from "./RequestModel";
import moment from "moment";
import { setReloadUser } from "../redux/usersSlice";
const { TabPane } = Tabs;

const Request = () => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showNewRequestModel, setShowNewRequestModel] = useState(false);
  const updateStatus = async (record, status) => {
    try {
      if (status === "accepted" && record.amount > user.balance) {
        message.error("You don't have enough balance");
        return;
      } else {
        dispatch(ShowLoading());
        const res = await updateRequestStatus({
          ...record,
          status,
        });
        dispatch(HideLoading());
        if (res.success) {
          message.success(res.message);
          getData();
          dispatch(setReloadUser(true));
        } else {
          message.error(res.message);
        }
      }
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  };
  const columns = [
    {
      title: "Request Id",
      dataIndex: "_id",
      // key:"requestId"
    },
    {
      title: "Sender",
      dataIndex: "sender",
      render: (sender) => {
        return sender.firstName + " " + sender.lastName;
      },
      // key:"requestId"
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      render: (receiver) => {
        return receiver.firstName + " " + receiver.lastName;
      },
      // key:"requestId"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      // key:"requestId"
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD/MM/YYYY hh:mm A");
      },
      // key:"requestId"
    },
    {
      title: "Status",
      dataIndex: "status",
      // key:"requestId"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        if (record.status === "pending" && record.receiver._id === user._id) {
          return (
            <div className="flex gap-1">
              <h1
                className="text-sm underline cursor-pointer hover:text-cus3"
                onClick={() => updateStatus(record, "accepted")}
              >
                Accept
              </h1>
              <h1
                className="text-sm underline cursor-pointer hover:text-cus3"
                onClick={() => updateStatus(record, "rejected")}
              >
                Reject
              </h1>
            </div>
          );
        }
      },
      // key:"requestId"
    },
  ];
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const res = await GetAllRequestsByUser();
      console.log(res);
      if (res.success) {
        const sendData = res.data.filter(
          (item) => item.sender._id === user._id
        );
        const receiverData = res.data.filter(
          (item) => item.receiver._id === user._id
        );
        console.log(sendData);
        setData({ send: sendData, received: receiverData });
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title={"Requests"} />
        <Button
          className="bg-cus1 text-cus5"
          onClick={() => setShowNewRequestModel(true)}
        >
          Request Funds
        </Button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Send" key="1">
          <Table columns={columns} dataSource={data.send} />
        </TabPane>
        <TabPane tab="Recieved" key="2">
          <Table columns={columns} dataSource={data.received} />
        </TabPane>
      </Tabs>
      {showNewRequestModel && (
        <RequestModel
          showNewRequestModel={showNewRequestModel}
          setShowNewRequestModel={setShowNewRequestModel}
          reloadData={getData}
        />
      )}
    </div>
  );
};

export default Request;
