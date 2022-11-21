import { BsCart } from 'react-icons/bs';
import { OrderContext } from '../../App';
import { useContext } from 'react';

function Cart(){
    const ctx = useContext(OrderContext);
    const itemsCounter = ctx.orders.reduce((prev,cur)=>prev+Number(cur.amount),0)

    return(
        <div onClick={ctx.showModal} className=" bg-[#3D1505] rounded-2xl flex gap-3 items-center px-6 py-1 ">
            <BsCart />
            <p className="font-bold text-sm tracking-tight">Your Cart</p>
            <div className='bg-red-800 py-0.5 px-2 rounded-lg'>
                <p className='text-sm font-bold'>{itemsCounter}</p>
            </div>
            
        </div>
    )
}

export default Cart;