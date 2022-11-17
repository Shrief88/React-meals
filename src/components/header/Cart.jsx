import { BsCart } from 'react-icons/bs';

function Cart(){
    return(
        <div className=" bg-brown rounded-2xl flex gap-3 items-center px-6 py-1 ">
            <BsCart />
            <p className="font-bold text-sm tracking-tight">Your Cart</p>
            <div className='bg-red py-0.5 px-2 rounded-lg'>
                <p className='text-sm font-bold'>0</p>
            </div>
            
        </div>
    )
}

export default Cart;