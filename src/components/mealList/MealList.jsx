import MealItem from "./MealItem"

function MealList(props){
    let content;
    if(props.isLoading){
        content = <p className="text-black text-center">Loading data...</p>;
    }else if(props.httpError){
        content = <p className="text-black text-center">{props.httpError}</p>;
    }else{
        content = props.meals.map(item=><MealItem key={item.id} {...item}/>)
    }
    
    return(
        <div>
            <div className='bg-white max-w-2xl m-auto px-10 py-2 mb-10 rounded-2xl flex flex-col gap-3'>
                {content}
            </div>
        </div>
        
    )
}

export default MealList;