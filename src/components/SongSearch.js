import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import SongDetails from "./SongDetails";
import SongForm from "./SongForm";

//variables de estado:artista, info, canción, loader(visibilidad)

const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);

  // Se va a ejecutar cuando el valor de search cambie
  useEffect(() => {
    if (search === null) return; //evitar renderizado innecesario

    const fetchData = async () => {
      const { artist, song } = search;

      let artistUrl = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
      let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

      console.log(artistUrl, songUrl);
      setLoading(true);
      const [artistRes, songRes] = await Promise.all([
        helpHttp().get(artistUrl),
        helpHttp().get(songUrl),
      ]);
      console.log(artistRes, songRes);
      setBio(artistRes);
      setLyric(songRes);
      setLoading(false);
    };
    fetchData();
  }, [search]);

  const handleSearch = (data) => {
    console.log(data);
    setSearch(data);
  };

  return (
    <div>
      <h1>buscador</h1>
      {loading && <Loader />}
      <SongForm handleSearch={handleSearch} />
      {/* cuando search tenga datos y loading esté em falso/renderiza SongDetails */}
      {search && !loading &&(
          <SongDetails search={search} lyric={lyric} bio={bio} />
      )}
      
    </div>
  );
};

export default SongSearch;
