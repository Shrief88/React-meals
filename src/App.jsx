import './App.css'
import Header from './components/header/Header'
import MealList from './components/mealList/MealList'
import Main from './components/Main'
import React, { useState } from 'react'
import data from './data'


export const OrderContext = React.createContext();

function App() {

  const[orders,setOrders] = useState(data.map(item=>{
    return{
      name :item.name,
      price : item.price,
      amount : 0
    }
   }))

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
