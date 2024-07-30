export const getMusicInfo = async (id: string) => {
  const res = await fetch(`http://localhost:5001/tracks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};
