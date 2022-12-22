import "./App.css";
import React, { useState, useMemo } from "react";
import Header from "./components/header/Header";
import MealList from "./components/mealList/MealList";
import Main from "./components/Main";
import Modal from "./components/modal/Modal";
import OrderContext from "./context/context";

function App() {
  const [orders, setOrders] = useState([]);

  const [modal, setModal] = useState(false);

  const showModal = () => setModal((prev) => !prev);

  const provider = useMemo(
    () => ({
      orders,
      setOrders,
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
