import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import Message from "./Message";
import SongArtist from "./SongArtist";
import { SongLyric } from "./SongLyric";

const SongDetails = ({ search, lyric, bio }) => {
  if (!lyric || !bio) return null;

  return (
    <Fragment>
      {lyric.error || lyric.name === "AbortError" ? (
        <Message 
        msg={`Error: no existe la canción${search.song}`}
        bgColor="#dc3445"
        />
      ) : (
        <SongLyric />
      )}
      {bio.artists ? <SongArtist /> : <Message />}
    </Fragment>
  );
};

export default SongDetails;
