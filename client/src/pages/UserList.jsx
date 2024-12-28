import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "antd";
import moment from "moment";
import { BASE_URL } from "../api";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const getUsersData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/user/get-all-users`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "DOB",
      dataIndex: "DOB",
    },
    {
      title: "Role",
      dataIndex: "Role",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
  ];

  return (
    <div className="container">
      <div className="title">
        <h1 className="page-header">UsersList</h1>
        <div
          className=""
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          <Link to="/login">
            <Button className="primary-button my-2 mx-2 p-2" htmlType="submit">
              Logout
            </Button>
          </Link>
        </div>
      </div>

      <hr />
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default UserList;
