import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerFormControls } from "../../config";
import CommonForm from "../../components/Common/Form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/Auth/authSlice";
const initialFormData = {
  userName: "",
  email: "",
  password: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await dispatch(registerUser(formData));
      if (response?.payload?.success) {
        setFormData(initialFormData);
        navigate("/auth/login");
      }
    } catch (error) {}
  }
  return (
    <div className=" flex flex-col items-center gap-10 w-full">
      <div className="text-center">
        <h1 className="text-3xl text-foreground font-bold tracking-tight">
          Login to you account
        </h1>
        <p className="mt-2">
          Already have an account{" "}
          <Link
            className="ml-1 font-medium text-primary hover:underline"
            to={"/auth/Login"}
          >
            Login
          </Link>{" "}
        </p>
      </div>

      <div className="w-2/3">
        <CommonForm
          formControls={registerFormControls}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
          buttonText={"Sign Up"}
        />
      </div>
    </div>
  );
};

export default Register;
