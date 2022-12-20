import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import OrderContext from "../../context";

const schema = Yup.object({
  name: Yup.string()
    .min(3, "Must be more than 2 characters")
    .required("Required"),
  number: Yup.string()
    .matches("^01[0-2,5]{1}[0-9]{8}$", "Phone number is not valid")
    .required("Required"),
  street: Yup.string()
    .min(3, "Must be more than 2 characters")
    .required("Required"),
  city: Yup.string()
    .min(3, "Must be more than 2 characters")
    .required("Required"),
});

function CheckoutForm() {
  const ctx = useContext(OrderContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = () => ctx.showModal();

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="Name"
        name="name"
        {...register("name")}
      />
      {errors.name && (
        <p className="text-red-600 text-xs">{errors.name.message}</p>
      )}
      <input
        type="tel"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="Phone Number"
        name="number"
        {...register("number")}
      />
      {errors.number && (
        <p className="text-red-600 text-xs">{errors.number.message}</p>
      )}
      <input
        type="text"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="Street"
        name="street"
        {...register("street")}
      />
      {errors.street && (
        <p className="text-red-600 text-xs">{errors.street.message}</p>
      )}
      <input
        type="text"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="City"
        name="city"
        {...register("number")}
      />
      {errors.city && (
        <p className="text-red-600 text-xs">{errors.city.message}</p>
      )}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="bg-red-700 px-3 py-0.5 rounded-md font-bold"
          onClick={ctx.showModal}>
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-700 px-3 py-0.5 rounded-md font-bold">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
