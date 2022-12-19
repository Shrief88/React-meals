import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/header/Header";
import MealList from "./components/mealList/MealList";
import Main from "./components/Main";
import Modal from "./components/modal/Modal";
import OrderContext from "./context";

function App() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://reactmeals-755d6-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      const loadedData = [];

      const keys = Object.keys(responseData);
      for (let i = 0; i < keys.length; i++) {
        loadedData.push({
          id: keys[i],
          name: responseData[keys[i]].name,
          price: responseData[keys[i]].price,
          description: responseData[keys[i]].description,
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
      setOrders((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, amount: Number(item.amount) + Number(amount) }
            : item
        )
      );
    } else {
      setOrders((prev) => [...prev, { id, amount, price }]);
    }
  };

  const addItemtoOrder = (id) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: Number(item.amount) + 1 } : item
      )
    );
  };

  const removerItemFromOrder = (id) => {
    const myItem = orders.find((item) => item.id === id);
    if (myItem.amount === 1) {
      setOrders((prev) => prev.filter((item) => item.id !== id));
    } else {
      setOrders((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, amount: Number(item.amount) - 1 } : item
        )
      );
    }
  };

  const [modal, setModal] = useState(false);

  const showModal = () => setModal((prev) => !prev);

  const provider = useMemo(
    () => ({
      orders,
      updateOrders,
      showModal,
      addItemtoOrder,
      removerItemFromOrder,
    }),
    [orders]
  );

  return (
    <div>
      <OrderContext.Provider value={provider}>
        <Header />
        <Main />
        {modal && <Modal />}
        <MealList meals={meals} isLoading={isLoading} httpError={httpError} />
      </OrderContext.Provider>
    </div>
  );
}

export default App;
