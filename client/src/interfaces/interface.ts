type Artist = {
  id: string;
  name: string;
};

type Album = {
  id: string;
  name: string;
  releaseDate: string;
  images: { url: string; height: number; width: number }[];
};

export type Track = {
  album: Album;
  name: string | undefined;
  artists: Artist[];
  id: string;
};
