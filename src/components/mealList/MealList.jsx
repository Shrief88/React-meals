import MealItem from "./MealItem"

function MealList(props){
    const meals = props.meals.map(item=><MealItem key={item.id} {...item}/>)
    return(
        <div>
            <div className='bg-white max-w-2xl m-auto px-10 py-2 mb-10 rounded-2xl flex flex-col gap-3'>
                {props.isLoading && <p className="text-black">Loading data...</p>}
                {!props.isLoading && meals}
            </div>
        </div>
        
    )
}

export default MealList;