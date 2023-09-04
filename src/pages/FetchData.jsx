import React from "react";

import { useQuery } from "react-query";

const FetchData = () => {
  // Fetcher function
  const getFacts = async () => {
    try {
      const res = await fetch("http://localhost:8000/getAllUsers");
      return res.json();
    } catch (err) {
      console.log(err);
    }
  };
  // Using the hook
  const { data, error, isLoading } = useQuery("randomFacts", getFacts);

  // Error and Loading states
  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Random Fact:</h1>
      {/* <img src={data?.url} alt="" /> */}
      {JSON.stringify(data)}
    </div>
  );
};

export default FetchData;
