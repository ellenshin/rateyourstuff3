import Constants from '../constants'
import axios from 'axios'
import SuggestionActions from '../actions/SuggestionActions';
import SuggestionStore from '../stores/SuggestionStore';

class SuggestionService {

	searchAlbums(keyword) {
		axios.get(Constants.LAST_FM_SEARCH_ALBUMS+keyword+Constants.LAST_FM_API)
  		.then(function (response) {
    		SuggestionActions.newAlbumSuggestions(response.data.results.albummatches.album);
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
  			}
    		SuggestionActions.newBookSuggestions(books);
    		//console.log(books);
  		})
  		.catch(function (error) {
    		console.log(error);
  		});
	}
}

export default new SuggestionService();