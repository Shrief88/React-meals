import React, { useContext } from "react";
import OrderContext from "../../context";

function CheckoutForm() {
  const ctx = useContext(OrderContext);

  return (
    <form className="flex flex-col gap-2">
      <input
        type="text"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="Name"
      />
      <input
        type="text"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="Street"
      />
      <input
        type="text"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="City"
      />
      <input
        type="text"
        className="text-black w-full border rounded-lg border-gray-400 p-2 pr-12 text-md "
        placeholder="Postal Code"
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="bg-red-700 px-3 py-0.5 rounded-md font-bold"
          onClick={ctx.showModal}>
          Cancel
        </button>
        <button
          type="button"
          className="bg-green-700 px-3 py-0.5 rounded-md font-bold">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
