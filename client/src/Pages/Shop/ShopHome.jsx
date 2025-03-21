import React from "react";
import { checkAuth, logoutUser } from "../../../store/Auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
const ShopHome = () => {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(checkAuth());
        toast(data?.payload?.message);
      }
    });
  }
  return (
    <div className="flex w-full items-center justify-between px-10">
      <ul className="flex items-center gap-3">
        <li>Home</li>
        <li>About</li>
        <li>Products</li>
        <li>Contact</li>
      </ul>
      <div>
        <button onClick={handleLogout} className="cursor-pointer">
          Log out
        </button>
      </div>
    </div>
  );
};

export default ShopHome;
