function MealItem(props){
    return(
        <div className="flex justify-between border-b border-transparent pb-1 last:border-white">
            <div>
                <p className="text-black font-extrabold tracking-tighter text-sm">{props.name}</p>
                <p className="text-black text-xs italic">{props.description}</p>
                <p className="text-fireRed font-bold ">${props.price}</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
                <div className="flex gap-4 items-center">
                    <p className="text-black font-bold text-sm">Amount</p>
                    <input className="text-black border-transparent rounded-lg border w-9 h-5 text-sm pl-1" type="number" name="amount"/>
                </div>
                <button className="bg-red font-bold px-5 py-0.5 rounded-3xl w-fit text-sm">+Add</button>
            </div>
        </div>
    )
}

export default MealItem;