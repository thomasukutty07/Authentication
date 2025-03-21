import React, { useEffect, useState } from "react";
import CommonForm from "../../components/Common/Form";
import { changePasswordControl, checkUserEmailOrUserName } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserExists, forgotPassword } from "../../../store/Auth/authSlice";
import { toast } from "sonner";
const initialFormDataForEmailAndUserName = {
  identifier: "",
};

const initialFormDataForChangePassword = {
  identifier: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePassword = () => {
  const [formDataEmailUsername, setFormDataEmailUsername] = useState(
    initialFormDataForEmailAndUserName
  );
  const [formDataChangePassword, setFormDataChangePassword] = useState(
    initialFormDataForChangePassword
  );
  const [isValid, setIsValid] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(checkUserExists(formDataEmailUsername)).then((data) => {
      if (data?.payload?.success) {
        const identifier = data?.payload?.user?.email;

        if (!identifier) {
          return;
        }

        setUserInfo({ identifier });
        setFormDataChangePassword((prev) => ({ ...prev, identifier }));
        setFormDataEmailUsername(initialFormDataForEmailAndUserName);
        setIsValid(true);
      }
    });
  }

  function handleChangePassword(e) {
    e.preventDefault();
    if (!formDataChangePassword.identifier) {
      return;
    }
    dispatch(forgotPassword(formDataChangePassword)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        setFormDataChangePassword(initialFormDataForChangePassword);
        navigate("/auth/login");
      } else {
        toast.error(data?.payload);
      }
    });
  }

  useEffect(() => {}, [userInfo]);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      {isValid ? (
        <div>
          <div className="mb-3">
            <h1 className="text-3xl text-foreground font-bold tracking-tight">
              Forgot your password
            </h1>
          </div>
          <CommonForm
            formControls={changePasswordControl}
            formData={formDataChangePassword}
            setFormData={setFormDataChangePassword}
            handleSubmit={handleChangePassword}
            buttonText={"Change password"}
          />
          <div className="text-center">
            <button onClick={()=>navigate("/auth/login")} className="text-center text-blue-500">Login</button>
          </div>
        </div>
      ) : (
        <div className="text-center w-1/2">
          <h1 className="text-3xl text-foreground font-bold tracking-tight">
            Forgot your password
          </h1>
          <div className="w-full">
            <div className="flex flex-col items-center">
              <CommonForm
                formControls={checkUserEmailOrUserName}
                formData={formDataEmailUsername}
                setFormData={setFormDataEmailUsername}
                handleSubmit={handleSubmit}
                buttonText={"Submit"}
              />
              <div>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="text-blue-500 cursor-pointer"
                >
                  Login?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
