import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import TransferFundsModel from "./TransferFundsModel";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { GettransactionsOfUser } from "../apicalls/transactions";
import moment from "moment";
import DepositModel from "./DepositModel";
const Transactions = () => {
  const [showTransferFunds, setShowTransferFunds] = useState(false);
  const [data, setData] = useState([]);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const user = useSelector((state) => state.users.user);
  const column = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        return record.sender._id === user._id ? "Debit" : "Credit";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "",
      render: (text, record) => {
        return record.sender._id === user._id ? (
          <div>
            <h1 className=" text-sm">
              {record.receiver.firstName} {record.receiver.lastName}
            </h1>
          </div>
        ) : (
          <div>
            <h1 className=" text-sm">
              {record.sender.firstName} {record.sender.lastName}
            </h1>
          </div>
        );
      },
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const res = await GettransactionsOfUser();
      console.log(res);
      if (res.success) {
        setData(res.data);
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
    <div className=" rounded-sm">
      <div className="flex justify-between items-center">
        <PageTitle title="Transactions" />
        <div className="flex gap-1">
          <button
            className="bg-cus1  rounded-xl p-2 hover:text-cus3 text-cus4"
            onClick={() => setShowDepositModal(true)}
          >
            Deposit
          </button>
          <button
            className="bg-cus1 rounded-xl p-2 hover:text-cus3 text-cus4"
            onClick={() => setShowTransferFunds(true)}
          >
            Transfer
          </button>
        </div>
      </div>
      <Table columns={column} dataSource={data} className="mt-2 border-black" />
      {showTransferFunds && (
        <TransferFundsModel
          showTransferFunds={showTransferFunds}
          setShowTransferFunds={setShowTransferFunds}
          reloadData={getData}
        />
      )}
      {showDepositModal && (
        <DepositModel
          showDepositModal={showDepositModal}
          setShowDepositModal={setShowDepositModal}
          reloadData={getData}
        />
      )}
    </div>
  );
};

export default Transactions;
