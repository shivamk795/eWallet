import React, { useEffect } from "react";
import { message } from "antd";
import { getUserInfo } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReloadUser, setUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoutes = (props) => {
  const { user, reloadUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) dispatch(setUser(response.data));
      else {
        message.error(response.message);
        navigate("/login");
      }
      dispatch(setReloadUser(false));
    } catch (error) {
      dispatch(HideLoading());
      navigate("/login");
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (reloadUser) getData();
  }, [reloadUser]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!user) getData();
    } else {
      navigate("/login");
    } // eslint-disable-next-line
  }, [navigate]);
  return (
    user && (
      <div>
        <DefaultLayout>{props.children}</DefaultLayout>
      </div>
    )
  );
};

export default ProtectedRoutes;
