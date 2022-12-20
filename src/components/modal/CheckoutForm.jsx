import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrderContext from "../../context";

function CheckoutForm() {
  const ctx = useContext(OrderContext);
  const formik = useFormik({
    initialValues: { name: "", number: "", street: "", city: "" },
    validationSchema: Yup.object({
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
    }),
    onSubmit: () => {
      ctx.showModal();
    },
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
      <input
        type="text"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="Name"
        name="name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name ? (
        <p className="text-red-600 text-xs">{formik.errors.name}</p>
      ) : null}
      <input
        type="tel"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="Phone Number"
        name="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.number && formik.errors.number ? (
        <p className="text-red-600 text-xs">{formik.errors.number}</p>
      ) : null}
      <input
        type="text"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="Street"
        name="street"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.street && formik.errors.street ? (
        <p className="text-red-600 text-xs">{formik.errors.street}</p>
      ) : null}
      <input
        type="text"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="City"
        name="city"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.city && formik.errors.city ? (
        <p className="text-red-600 text-xs">{formik.errors.city}</p>
      ) : null}

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
