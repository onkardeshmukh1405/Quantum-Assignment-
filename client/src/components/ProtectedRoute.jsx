import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { BASE_URL } from "../api";
import { useEffect } from "react";

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/get-user-info-by-id`,
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      // dispatch(hideLoading());
      console.log(error);
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    // eslint-disable-next-line react/prop-types
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
