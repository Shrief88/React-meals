import { useState,useContext } from "react";
import { OrderContext } from "../../App";


function MealItem(props){
    const [amount,setAmount] = useState(0);
    const ctx = useContext(OrderContext);

    const handleChange = (event) =>{
        setAmount(event.target.value)
    }

    const addItemToOrder = ()=>{
        ctx.updateOrders(props.name,amount);
    }

   
    return(
        <div className="flex justify-between border-b  pb-1 last:border-white">
            <div>
                <p className="text-black font-extrabold tracking-tighter text-sm">{props.name}</p>
                <p className="text-black text-xs italic">{props.description}</p>
                <p className="text-red-700 font-bold ">${props.price}</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
                <div className="flex gap-4 items-center">
                    <p className="text-black font-bold text-sm">Amount</p>
                    <input className="w-8 p-0  h-5 text-black text-sm rounded-lg pl-1" type="Number"  name={props.name}
                     value={amount} onChange={handleChange}/>
                </div>
                <button className="bg-red-900 font-bold px-5 py-0.5 rounded-3xl w-fit text-sm" onClick={addItemToOrder}>
                    +Add
                </button>
            </div>
        </div>
    )
}

export default MealItem;