import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/Common/Form";
import { loginFormControls } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/Auth/authSlice";
import { toast } from "sonner";
const initialFormData = {
  identifier: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      console.log(data.payload.user);

      if (data?.payload?.success) {
        toast.success(data.payload.message);
        setFormData(initialFormData);
        localStorage.setItem("user", JSON.stringify(data.payload.user));
      } else {
        toast.error(data?.payload?.message || "Login failed");
      }
    });
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <div className="text-center">
        <h1 className="text-3xl text-foreground font-bold tracking-tight">
          Login to your account
        </h1>
        <p className="mt-2">
          Don't have an account{" "}
          <Link
            className="ml-1 font-medium text-primary hover:underline"
            to={"/auth/register"}
          >
            Create Account
          </Link>{" "}
        </p>
      </div>

      <div className="w-2/3 flex flex-col items-center ">
        <CommonForm
          formControls={loginFormControls}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
          buttonText={"Login"}
        />
        <div>
          <button
            className="cursor-pointer text-red-500"
            onClick={() => navigate("/auth/change-password")}
          >
            Forgot password ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
