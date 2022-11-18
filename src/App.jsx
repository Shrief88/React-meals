import './App.css'
import Header from './components/header/Header'
import MealList from './components/mealList/MealList'
import Main from './components/Main'
import React, { useState } from 'react'


export const OrderContext = React.createContext();

function App() {

  const [orders,setOrders] = useState([
    {name : 'Sushi', amount : 0},
    {name : 'Schnitzel', amount :0},
    {name :'Barbecue Burger', amount:0},
    {name : 'Green Bowl', amount:0}
  ])

  const updateOrders = (name,amount) =>{
      setOrders(prev=>prev.map(item=>item.name === name ? {...item,amount:amount}:item))
  }
  
  
  
  return (
    <div>
      <OrderContext.Provider value={{orders : orders, updateOrders : updateOrders}}>
        <Header/>
        <Main/>
        <MealList/>
      </OrderContext.Provider>
      
    </div>
  )
}

export default App
