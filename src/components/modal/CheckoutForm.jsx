import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import OrderContext from "../../context/context";
import CircularProgressIcons from "../UI/CircularProgress";
import FeedbackMessage from "../UI/FeedbackMessage";
import useFetch from "../../hooks/useFetch";

const schema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(3, "Must be more than 2 characters"),
  number: Yup.string()
    .required("Required")
    .matches("^01[0-2,5]{1}[0-9]{8}$", "Phone number is not valid"),
  street: Yup.string()
    .required("Required")
    .min(3, "Must be more than 2 characters"),

  city: Yup.string()
    .required("Required")
    .min(3, "Must be more than 2 characters"),
});

function CheckoutForm() {
  const ctx = useContext(OrderContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoading, isSuccessed, httpError, sendRequest } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    if (Object.keys(ctx.orders).length !== 0) {
      sendRequest({
        url: "https://reactmeals-755d6-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: JSON.stringify({
          user: data,
          orders: ctx.orders,
        }),
      });
    }
  };

  const closeForm = () => {
    ctx.showModal();
    if (isSuccessed) {
      ctx.setOrders([]);
    }
  };

  let feedbackMessage;
  if (isSubmitting) {
    if (Object.keys(ctx.orders).length === 0) {
      feedbackMessage = (
        <FeedbackMessage
          textColor="text-red-700"
          message="You should select your orders before submitting"
        />
      );
    } else if (isLoading) {
      feedbackMessage = (
        <FeedbackMessage
          textColor="text-black"
          icon=<CircularProgressIcons />
          message="Sending..."
        />
      );
    } else if (httpError) {
      feedbackMessage = (
        <FeedbackMessage
          textColor="text-red-700"
          icon=<ErrorIcon color="error" />
          message={httpError}
        />
      );
    } else {
      feedbackMessage = (
        <FeedbackMessage
          textColor="text-green-700"
          icon=<CheckCircleOutlineIcon color="success" />
          message="Success"
        />
      );
    }
  }

  return (
    <form
      className="flex flex-col gap-3 border-b py-3"
      onSubmit={handleSubmit(onSubmit)}>
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
        {...register("city")}
      />
      {errors.city && (
        <p className="text-red-600 text-xs">{errors.city.message}</p>
      )}

      {!isSubmitting && (
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
      )}
      {feedbackMessage}
      {isSubmitting && (
        <button
          type="button"
          className="bg-red-700 px-3 py-0.5  rounded-md font-bold w-20 m-auto text-lg"
          onClick={closeForm}>
          Close
        </button>
      )}
    </form>
  );
}

export default CheckoutForm;
