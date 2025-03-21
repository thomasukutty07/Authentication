import React from "react";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  handleSubmit,
  buttonText,
}) => {
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-3">
        {formControls.map((control) => (
          <div className="grid w-full gap-1.5" key={control.name}>
            {/* Properly set htmlFor to match the input id */}
            <label htmlFor={control.name}>{control.label}</label>

            <input
              id={control.name}
              name={control.name}
              type={control.type}
              placeholder={control.placeholder}
              value={formData[control.name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [control.name]: e.target.value })
              }
              className="border p-2 rounded "
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-3 p-2 w-fit mb-3 cursor-pointer bg-blue-500 text-white rounded"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default CommonForm;
