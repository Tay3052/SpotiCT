import React from "react";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Detail Page</h1>
      <p>Track ID: {id}</p>
    </div>
  );
};
