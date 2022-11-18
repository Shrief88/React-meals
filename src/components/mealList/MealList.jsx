import MealItem from "./MealItem"
import data from '../../data'

function MealList(){
    const meals = data.map(item=><MealItem key={item.id} {...item}/>)
    return(
        <div>
            <div className='bg-white max-w-2xl m-auto px-10 py-2 mb-10 rounded-2xl flex flex-col gap-3'>
                {meals}
            </div>
        </div>
        
    )
}

export default MealList;