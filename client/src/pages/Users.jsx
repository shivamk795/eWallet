import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { UpdateUserVerifiedStatus, getAllUser } from "../apicalls/users";
import { Button, Table, message } from "antd";
import PageTitle from "../components/PageTitle";

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const updateStatus = async (record, isVerified) => {
    try {
      console.log(isVerified);
      dispatch(ShowLoading());
      const response = await UpdateUserVerifiedStatus({
        selectedUser: record._id,
        isVerified,
      });
      dispatch(HideLoading());
      if (response.error) {
        message.error(response.error);
      } else {
        getData();
        message.success(response.message);
      }
    } catch (e) {
      dispatch(HideLoading());
      message.error(e.error);
    }
  };
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const res = await getAllUser();

      dispatch(HideLoading());
      if (res.success) {
        setUsers(res.data);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      dispatch(HideLoading());
      message.error(e.message);
    }
  };
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      // key:"requestId"
    },
    {
      title: "Last Name",
      dataIndex: "lastName",

      // key:"requestId"
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      // key:"requestId"
    },
    {
      title: "Administrator",
      dataIndex: "isAdmin",
      render: (text, record) => {
        return text ? "Yes" : "No";
      },
      // key:"requestId"
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      render: (text, record) => {
        return text ? "Yes" : "No";
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {record.isVerified ? (
              <Button
                className="bg-danger text-cus5"
                onClick={() => updateStatus(record, false)}
              >
                Suspend
              </Button>
            ) : (
              <Button
                className="bg-success text-cus5"
                onClick={() => updateStatus(record, true)}
              >
                Activate
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <PageTitle title={"Users"} />
      <Table className="mt-2" columns={columns} dataSource={users} />
    </div>
  );
};

export default Users;
