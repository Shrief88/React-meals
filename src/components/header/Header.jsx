import Cart from "./Cart";
import mealImage from '../../assets/meals.jpg'

function Header(){
    return(
        <>
            <div className="bg-red py-3 px-3 flex justify-around">
                <h1 className="font-extrabold text-3xl">ReactMeals</h1>
                <Cart/> 
            </div>
            <div className=" h-72 z-0 overflow-hidden" >
                <img src={mealImage} className="w-full h-full object-cover -translate-y-16 -rotate-3"/>
            </div>
        </>
        
    )
}

export default Header;