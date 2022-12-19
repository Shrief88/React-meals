import { useContext, useState } from 'react';
import { OrderContext } from '../../App';
import ModalItem from './ModalItem';
import CheckoutForm from './CheckoutForm';

function Modal() {
  const [showForm, setShowForm] = useState(false);

  const ctx = useContext(OrderContext);
  const itemsPrice = ctx.orders.reduce((prev, cur) => prev + (Number(cur.price) * Number(cur.amount)), 0).toFixed(2);

  const orders = ctx.orders.map((order) => {
    if (order.amount != 0) {
      return <ModalItem key={order.id} {...order} />;
    }
  });

  const showCheckoutForm = () => {
    setShowForm(true);
  };

  return (
    <div className="w-full h-full fixed left-0 right-0 top-0 bottom-0 bg-[#00000080] flex justify-center items-center">
      <div className="bg-white w-full max-w-lg flex flex-col p-5 rounded-3xl gap-5">
        {orders}
        {showForm && <CheckoutForm />}
        <div className="flex justify-between">
          <p className="text-black font-extrabold text-xl">Total Amount</p>
          <p className="text-black font-extrabold text-xl">
            $
            {itemsPrice}
          </p>
        </div>
        {!showForm && (
          <div className="flex justify-end gap-2">
            <button className="bg-red-700 px-3 py-0.5 rounded-md font-bold" onClick={ctx.showModal}>Close</button>
            <button className="bg-green-700 px-3 py-0.5 rounded-md font-bold" onClick={showCheckoutForm}>Order</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Modal;
