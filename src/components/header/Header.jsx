import Cart from "./Cart";

function Header(){
    return(
        <div className="bg-red py-3 px-3 flex justify-around">
            <h1 className="font-extrabold text-3xl">ReactMeals</h1>
            <Cart/> 
        </div>
        
    )
}

export default Header;