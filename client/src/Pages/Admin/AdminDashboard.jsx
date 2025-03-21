import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addImage,
  deleteImage,
  fetchImages,
} from "../../../store/Shop/imageSlice";
import { checkAuth, logoutUser } from "../../../store/Auth/authSlice";
import { toast } from "sonner";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { imageList } = useSelector((state) => state.image);

  function handleChange(event) {
    const file = event.target.files[0];
    if (file) {
      dispatch(addImage(file)).then((data) => {
        if (data?.payload?.success) {
          toast(data?.payload?.message);
          dispatch(fetchImages());
        }
      });
    }
  }
  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(checkAuth());
        toast(data?.payload?.message);
      }
    });
  }

  function handleEdit() {}
  function handleDelete(id) {
    console.log(id);

    dispatch(deleteImage(id)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast(data?.payload?.message);
        dispatch(fetchImages());
      }
    });
  }
  useEffect(() => {
    dispatch(fetchImages());
  }, []);

  return (
    <div>
      <div className="flex w-full items-center justify-between px-10 py-3">
        <input type="file" onChange={handleChange} className="border" />
        <button className="cursor-pointer" onClick={handleLogout}>Logout user</button>
      </div>
      {imageList && imageList.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {imageList.map((image) => (
            <div key={image._id} className="border p-2 rounded-md">
              <img src={image.url} alt="uploaded" className="w-full h-auto" />
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleEdit()}
                  className="border mt-4 p-3 rounded-2xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(image._id)}
                  className="border mt-4 p-3 rounded-2xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No images uploaded yet...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
