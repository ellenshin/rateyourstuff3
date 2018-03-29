import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {

  newAlbumSuggestions: (albums) => {
    AppDispatcher.dispatch({
      type: 'NEW_ALBUM_SUGGESTIONS',
      albums: albums
    });
  },

  newBookSuggestions: (books) => {
    AppDispatcher.dispatch({
      type: 'NEW_BOOK_SUGGESTIONS',
      books: books
    });
  },

  newMovieSuggestions: (movies) => {
    AppDispatcher.dispatch({
      type: 'NEW_MOVIE_SUGGESTIONS',
      movies: movies
    });
  },

  clearSuggestions: () => {
    AppDispatcher.dispatch({
      type: 'CLEAR_SUGGESTIONS'
    });
  }
        
}
