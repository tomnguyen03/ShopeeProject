import React from "react";
import "./category.css";
import { useForm, Controller } from "react-hook-form";
import { axios } from "axios";
import { AuthStr, HOST } from "../../data";

export default function FormAddCategory() {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const handleLogin = async (data) => {
    const body = {
      name: data.name,
    };
    axios
      .post(
        HOST + "/admin/categories",
        { name: "Nước hoa" },
        { headers: { Authorization: AuthStr } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="wrapped">
      <div className="title">ADD CATEGORY</div>
      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        <div className="formControl">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                type="name"
                name="name"
                placeholder="Name"
                onChange={field.onChange}
                value={getValues("name")}
              ></input>
            )}
          />
        </div>
        <div className="button">
          <button type="submit">ADD</button>
        </div>
      </form>
    </div>
  );
}
