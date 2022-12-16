import './App.css'
import Header from './components/header/Header'
import MealList from './components/mealList/MealList'
import Main from './components/Main'
import Modal from './components/modal/Modal'
import React, { useState } from 'react'
import { useEffect } from 'react'


export const OrderContext = React.createContext();

function App() {
  const[meals,setMeals] = useState([]);
  const[isLoading,setIsLoading] = useState(false);
  const[orders,setOrders] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      setIsLoading(true);
      const response = await fetch('https://reactmeals-755d6-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();
      let loadedData = [];
      for(const key in responseData){
        loadedData.push({
          id:key,
          name:responseData[key].name,
          price:responseData[key].price,
          description:responseData[key].description
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    }
    fetchData();
  },[])
  
 
  const updateOrders = (id,amount) =>{
    setOrders(prev=>prev.map(item=>item.id === id ? {...item,amount:Number(item.amount+Number(amount))}:item))
  }

  const addItemtoOrder = (id)=>{
    setOrders(prev=>prev.map(item=>item.id === id ? {...item,amount:Number(item.amount+1)}:item))
  }

  const removerItemFromOrder = (id)=>{
    setOrders(prev=>prev.map(item=>item.id === id ? {...item,amount:Number(item.amount-1)}:item))
  }

  const [modal,setModal] = useState(false);

  const showModal = ()=> setModal(prev=>!prev);
  
  return (
    <div>
      <OrderContext.Provider value={
        {orders : orders, updateOrders : updateOrders, showModal:showModal,addItemtoOrder:addItemtoOrder,removerItemFromOrder:removerItemFromOrder}}>
        <Header/>
        <Main/>
        {modal && <Modal/>}
        <MealList meals={meals} isLoading={isLoading}/>
      </OrderContext.Provider>
      
    </div>
  )
}

export default App
