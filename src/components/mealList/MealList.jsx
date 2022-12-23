import React, { useState, useEffect } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import MealItem from "./MealItem";
import CircularProgressIcons from "../UI/CircularProgress";
import FeedbackMessage from "../UI/FeedbackMessage";
import useFetch from "../../hooks/useFetch";

function MealList() {
  const [meals, setMeals] = useState([]);
  const transformData = (data) => {
    const transformedData = [];
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      transformedData.push({
        id: keys[i],
        name: data[keys[i]].name,
        price: data[keys[i]].price,
        description: data[keys[i]].description,
      });
    }
    setMeals(transformedData);
  };

  const { isLoading, httpError, sendRequest: fetchTasks } = useFetch();

  useEffect(() => {
    fetchTasks(
      {
        url: "https://reactmeals-755d6-default-rtdb.firebaseio.com/meals.json",
      },
      transformData
    );
  }, [fetchTasks]);

  let content;
  if (isLoading) {
    content = (
      <FeedbackMessage
        textColor="text-black"
        icon=<CircularProgressIcons />
        message="Loading data..."
        position="justify-center"
      />
    );
  } else if (httpError) {
    content = (
      <FeedbackMessage
        textColor="text-red-700"
        icon=<ErrorIcon color="error" />
        message={httpError}
        position="justify-center"
      />
    );
  } else {
    content = meals.map((item) => <MealItem key={item.id} {...item} />);
  }

  return (
    <div>
      <div className="bg-white max-w-2xl m-auto px-10 py-2 mb-10 rounded-2xl flex flex-col gap-3">
        {content}
      </div>
    </div>
  );
}

export default MealList;
