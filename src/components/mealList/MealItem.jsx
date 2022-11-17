function MealItem(){
    return(
        <div className="flex justify-between px-10 py-2">
            <div>
                <p className="text-black font-extrabold tracking-tighter text-sm">Sushi</p>
                <p className="text-black text-xs italic">Finest fish and veggies</p>
                <p className="text-fireRed font-bold ">$22.99</p>
            </div>
            <div className="flex flex-col gap-2">
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