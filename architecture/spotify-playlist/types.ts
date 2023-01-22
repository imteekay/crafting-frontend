// Song Data
interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumPhoto: string;
  songUrl: string;
}

// Playlist: a list of songs
type Playlist = Song[];

// Data from the Backend API
interface Data {
  playlist: Playlist;
  page: number;
  perPage: number;
  pageCount: number;
  totalCount: number;
  previous: string | null;
  next: string | null;
}

// Normalized Song state
type PlaylistById = Record<string, Song>;

// Frontend State
interface State {
  currentSongId: number;
  playlist: {
    byId: PlaylistById;
    allSongsIds: number[];
  };
}

interface State {
  currentSongId: number;
  playlist: Playlist;
}
