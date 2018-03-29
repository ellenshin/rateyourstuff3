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
  }
        
}
