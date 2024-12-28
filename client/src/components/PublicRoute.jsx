import { Navigate } from "react-router-dom";

const PublicRoute = (props) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return props.children;
    // eslint-disable-next-line react/prop-types
  }
};

export default PublicRoute;
