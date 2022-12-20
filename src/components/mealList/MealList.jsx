import React, { useState, useEffect } from "react";
import MealItem from "./MealItem";

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
    content = <p className="text-black text-center">Loading data...</p>;
  } else if (httpError) {
    content = <p className="text-black text-center">{httpError}</p>;
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
