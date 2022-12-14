import React, { useContext } from "react";
import OrderContext from "../../context/context";

function ModalItem(props) {
  const ctx = useContext(OrderContext);

  const addItem = (id) => {
    ctx.setOrders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: Number(item.amount) + 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    const myItem = ctx.orders.find((item) => item.id === id);
    if (myItem.amount === 1) {
      ctx.setOrders((prev) => prev.filter((item) => item.id !== id));
    } else {
      ctx.setOrders((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, amount: Number(item.amount) - 1 } : item
        )
      );
    }
  };

  return (
    <div className="border-b  pb-3">
      <p className="text-black font-bold mb-1">{props.name}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-8">
          <p className="text-red-900 font-bold">{props.price}</p>
          <div className="px-1 py-0.5 border border-teal-600 rounded-lg text-sm text-black">
            <p>x{props.amount}</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div
            onClick={() => removeItem(props.id)}
            className="px-3 py-[1] border border-teal-600 rounded-lg text-md text-black hover:bg-teal-200">
            -
          </div>
          <div
            onClick={() => addItem(props.id)}
            className="px-3 py-[1] border border-teal-600 rounded-lg text-md text-black hover:bg-teal-200">
            +
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalItem;
