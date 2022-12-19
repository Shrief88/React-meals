import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import MealList from './components/mealList/MealList';
import Main from './components/Main';
import Modal from './components/modal/Modal';
import { OrderContext } from './context';

function App() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch('https://reactmeals-755d6-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseData = await response.json();
      const loadedData = [];
      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    };

    fetchData().catch((e) => {
      setIsLoading(false);
      setHttpError(e.message);
    });
  }, []);

  const updateOrders = (id, amount, price) => {
    if (orders.find((item) => item.id === id)) {
      setOrders((prev) => prev.map((item) => (item.id === id ? { ...item, amount: Number(item.amount + Number(amount)) } : item)));
    } else {
      setOrders((prev) => [...prev, { id, amount, price }]);
    }
  };

  const addItemtoOrder = (id) => {
    setOrders((prev) => prev.map((item) => (item.id === id ? { ...item, amount: Number(item.amount) + 1 } : item)));
  };

  const removerItemFromOrder = (id) => {
    setOrders((prev) => prev.map((item) => (item.id === id ? { ...item, amount: Number(item.amount) - 1 } : item)));
  };

  const [modal, setModal] = useState(false);

  const showModal = () => setModal((prev) => !prev);

  return (
    <div>
      <OrderContext.Provider value={
        {
          orders, updateOrders, showModal, addItemtoOrder, removerItemFromOrder,
        }
}
      >
        <Header />
        <Main />
        {modal && <Modal />}
        <MealList meals={meals} isLoading={isLoading} httpError={httpError} />
      </OrderContext.Provider>
    </div>
  );
}

export default App;
