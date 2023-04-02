import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";

const Home = () => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  return (
    <div className="">
      <PageTitle title={`Hello, ${user.firstName} ${user.lastName}`} />
      <div className="bg-cus2 uppercase card rounded-md flex flex-col gap-2 text-cus1 p-2 mt-3 w-[60%]">
        <div className="flex py-1 justify-between">
          <h1 className="text-lg">Account Number</h1>
          <h1 className="text-lg">{user._id}</h1>
        </div>
        <div className="flex pt-1 justify-between">
          <h1 className="text-lg">Balance</h1>
          <h1 className="text-lg">{user.balance}$</h1>
        </div>
      </div>
      <div className=" card uppercase rounded-md flex flex-col gap-2 text-cus1 p-2 mt-3 w-[60%]">
        <div className="flex py-1 justify-between">
          <h1 className="text-lg">First Name</h1>
          <h1 className="text-lg">{user.firstName}</h1>
        </div>
        <div className="flex pt-1 justify-between">
          <h1 className="text-lg">Last Name</h1>
          <h1 className="text-lg">{user.lastName}</h1>
        </div>
        <div className="flex pt-1 justify-between">
          <h1 className="text-lg">Email</h1>
          <h1 className="text-lg">{user.email}</h1>
        </div>
        <div className="flex pt-1 justify-between">
          <h1 className="text-lg">Mobile</h1>
          <h1 className="text-lg">{user.phoneNumber}</h1>
        </div>
        <div className="flex pt-1 justify-between">
          <h1 className="text-lg">Identification Type</h1>
          <h1 className="text-lg">{user.identificationType}</h1>
        </div>
        <div className="flex pt-1 justify-between">
          <h1 className="text-lg">Identification Number</h1>
          <h1 className="text-lg">{user.identificationNumber}</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
