import { OrderContext } from '../../App';
import { useContext } from 'react';

function ModalItem(props){
    const ctx = useContext(OrderContext);

    const addItme = ()=> ctx.addItemtoOrder(props.id);

    const removeItem = ()=> ctx.removerItemFromOrder(props.id);

    return(
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
                    <div onClick={removeItem} className="px-3 py-[1] border border-teal-600 rounded-lg text-md text-black hover:bg-teal-200">
                        -
                    </div>
                    <div onClick={addItme} className="px-3 py-[1] border border-teal-600 rounded-lg text-md text-black hover:bg-teal-200">
                        +
                    </div>
                </div>

            </div>
        </div>
        
    )
}

export default ModalItem;   