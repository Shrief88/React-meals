import React, { useState, useEffect } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import MealItem from "./MealItem";
import CircularProgressIcons from "../UI/CircularProgress";
import FeedbackMessage from "../UI/FeedbackMessage";

function MealList() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        icon=<ErrorIcon color="error"/>
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
