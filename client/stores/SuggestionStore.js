import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

class SuggestionStore extends BaseStore {

  constructor() {
    super();
    this.subscribe( () => this._registerToActions.bind(this)); //PRO TIP: Arrow function is used to bind LoginStore class easily
    this._suggestions = [
      {title:'music', content:[]},
      {title:'book', content:[]},
      {title:'movie', content:[]}
    ]
  }


  //This establishes what to do when receiving different actions
  _registerToActions(action) {
    switch(action.type){
      case 'NEW_ALBUM_SUGGESTIONS':
        this._suggestions[0].content = action.albums.slice(0,3);
        this.emitChange();
        break;

      case 'NEW_BOOK_SUGGESTIONS':
        this._suggestions[1].content = action.books.slice(0,3);
        this.emitChange();
        break;

      case 'NEW_MOVIE_SUGGESTIONS':
        this._suggestions[2].content = action.movies.slice(0,3);
        this.emitChange();
        break;

      case 'CLEAR_SUGGESTIONS':
        this._suggestions =[
          {title:'music', content:[]},
          {title:'book', content:[]},
          {title:'movie', content:[]}
        ];
        this.emitChange();
        break;
        
      default:
        break;
    }
  }

  get allSuggestions(){
    return this._suggestions;
  }

}

export default new SuggestionStore(); //Export singleton instance












