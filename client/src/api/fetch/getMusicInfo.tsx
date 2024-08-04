export const GetMusicInfo = async (id: string | undefined) => {
  const res = await fetch(`http://localhost:5001/detail/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const GetTrack = async (id: string | undefined) => {
  const res = await fetch(`http://localhost:5001/tracks/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const SearchApi = async (query: string, newOffset: number) => {
  const res = await fetch(
    `http://localhost:5001/search?q=${encodeURIComponent(
      query
    )}&type=track&offset=${newOffset}&limit=10`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.json();
};
