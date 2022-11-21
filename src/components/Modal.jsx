import { OrderContext } from '../App';
import { useContext } from 'react';
import { Button } from 'flowbite-react';

function Modal(){
    const ctx = useContext(OrderContext);
    const itemsPrice = ctx.orders.reduce((prev,cur)=>prev+(Number(cur.price)*Number(cur.amount)),0);

    return(
        <div  className='w-full h-full fixed left-0 right-0 top-0 bottom-0 bg-[#00000080] flex justify-center items-center'>
            <div className='bg-white w-full max-w-lg flex flex-col px-5 py-8 rounded-3xl gap-3'>
                <div className='flex justify-between'>
                    <p className='text-black font-extrabold text-xl'>Total Amount</p>
                    <p className='text-black font-extrabold text-xl'>${itemsPrice}</p>
                </div>
                <div className='flex justify-end gap-2'>
                    <Button color="failure" onClick={ctx.showModal}>Close</Button>
                    <Button color="success">Order</Button>
                </div>
                
            </div>
        </div>
    )
}

export default Modal;