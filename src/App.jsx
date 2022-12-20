import "./App.css";
import React, { useState, useMemo } from "react";
import Header from "./components/header/Header";
import MealList from "./components/mealList/MealList";
import Main from "./components/Main";
import Modal from "./components/modal/Modal";
import OrderContext from "./context";

function App() {
  const [orders, setOrders] = useState([]);

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

  const addOneItemtoOrder = (id) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: Number(item.amount) + 1 } : item
      )
    );
  };

  const removeOneItemFromOrder = (id) => {
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
      addOneItemtoOrder,
      removeOneItemFromOrder,
      showModal,
    }),
    [orders]
  );

  return (
    <div>
      <OrderContext.Provider value={provider}>
        <Header />
        <Main />
        {modal && <Modal />}
        <MealList />
      </OrderContext.Provider>
    </div>
  );
}

export default App;
