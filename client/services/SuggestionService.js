import Constants from '../constants'
import axios from 'axios'
import SuggestionActions from '../actions/SuggestionActions';
import SuggestionStore from '../stores/SuggestionStore';

class SuggestionService {

	searchAlbums(keyword) {
		axios.get(Constants.LAST_FM_SEARCH_ALBUMS+keyword+Constants.LAST_FM_API)
  		.then(function (response) {
  			let albums = response.data.results.albummatches.album;
    		SuggestionActions.newAlbumSuggestions(albums);
    		for (var i = 0; i < albums.length; i++) {
    			albums[i].imageUrl = albums[i].image[1]['#text'];
    			albums[i].suggestionType = "album";
    			albums[i].made_by = albums[i].artist;
    		}
  		})
  		.catch(function (error) {
    		console.log(error);
  		});

	}

	searchBooks(keyword) {
		axios.get(Constants.GOOGLE_SEARCH_BOOKS+keyword+Constants.GOOGLE_BOOKS_API)
  		.then(function (response) {
  			let items = response.data.items;
  			let books = [];
  			for (var i = 0; i < items.length; i++) {
  				books.push(items[i].volumeInfo);
  				books[i].name = books[i].title;
  				books[i].imageUrl = books[i].imageLinks.smallThumbnail;
  				books[i].suggestionType = "book";
  				books[i].made_by = books[i].authors.join(", ");
  				console.log(books[i].authors.join(", "))
  			}
    		SuggestionActions.newBookSuggestions(books);
    		//console.log(books);
  		})
  		.catch(function (error) {
    		console.log(error);
  		});
	}

	searchMovies(keyword) {
		axios.get(Constants.OMDB_API+keyword)
  		.then(function (response) {
    		let movies = response.data.Search;
    		for (var i = 0; i < movies.length; i++) {
    			movies[i].name = movies[i].Title;
    			movies[i].imageUrl = movies[i].Poster;
    			movies[i].suggestionType = "movie";
    			movies[i].made_by = movies[i].Year;
    		}
    		SuggestionActions.newMovieSuggestions(movies);
  		})
  		.catch(function (error) {
    		console.log(error);
  		});
	}
}

export default new SuggestionService();