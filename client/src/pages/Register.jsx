import { Form, Input, Button, DatePicker } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../api";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const date = `${values.DOB.$D}/${values.DOB.$M + 1}/${values.DOB.$y}`;
    values.DOB = date;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/register`,
        values
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="DOB"
            label="Select Date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker format="DD-MM-YYYY" style={{ width: "366.4px" }} />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            Register
          </Button>

          <Link to="/login" className="anchor mt-2">
            Click here to login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
