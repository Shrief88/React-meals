import { BsCart } from 'react-icons/bs';
import { useContext, useState, useEffect } from 'react';
import { OrderContext } from '../../App';

function Cart() {
  const ctx = useContext(OrderContext);
  const itemsCounter = ctx.orders.reduce((prev, cur) => prev + Number(cur.amount), 0);
  const [addAnimation, setAddAnimation] = useState(false);

  const animation = addAnimation ? 'animate-pump' : '';

  useEffect(() => {
    if (itemsCounter === 0) {
      return;
    }
    setAddAnimation(true);
    const timer = setTimeout(() => {
      setAddAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [itemsCounter]);

  return (
    <div onClick={ctx.showModal} className={`bg-[#3D1505] rounded-2xl flex gap-3 items-center px-6 py-1 ${animation}`}>
      <BsCart />
      <p className="font-bold text-sm tracking-tight">Your Cart</p>
      <div className="bg-red-800 py-0.5 px-2 rounded-lg">
        <p className="text-sm font-bold">{itemsCounter}</p>
      </div>

    </div>
  );
}

export default Cart;
