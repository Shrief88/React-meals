import './App.css'
import Header from './components/header/Header'
import MealList from './components/mealList/MealList'
import Main from './components/Main'
import Modal from './components/modal/Modal'
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

  const [modal,setModal] = useState(false);

  const updateOrders = (name,amount) =>{
      setOrders(prev=>prev.map(item=>item.name === name ? {...item,amount:amount}:item))
  }

  const showModal = ()=> setModal(prev=>!prev);
  
  return (
    <div>
      <OrderContext.Provider value={{orders : orders, updateOrders : updateOrders, showModal:showModal}}>
        <Header/>
        <Main/>
        {modal && <Modal/>}
        <MealList/>
      </OrderContext.Provider>
      
    </div>
  )
}

export default App
