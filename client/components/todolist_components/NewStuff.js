import React from 'react';
import TodoService from '../../services/TodoService'
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import SuggestionService from '../../services/SuggestionService'
import SuggestionStore from '../../stores/SuggestionStore'
import SuggestionAction from '../../actions/SuggestionActions'
import Dropdown from 'react-dropdown'


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// function getSuggestions(value, category) {
//   const escapedValue = escapeRegexCharacters(value.trim());
  
//   if (escapedValue === '') {
//     return [];
//   }

//   const regex = new RegExp('\\b' + escapedValue, 'i');

//   // var album_p = new Promise( (resolve, reject) => {
//   //   SuggestionService.searchAlbums(value);
//   // } );

//   // var book_p = new Promise( (resolve, reject) => {
//   //   SuggestionService.searchBooks(value);
//   // } );

//   // var movie_p = new Promise( (resolve, reject) => {
//   //   SuggestionService.searchMovies(value);
//   // } );

//   switch(category.label) {
//     case 'All':
//       Promise.all([SuggestionService.searchAlbums(value),
//         SuggestionService.searchBooks(value),
//         SuggestionService.searchMovies(value)])
//       .then(
//         console.log(SuggestionStore.allSuggestions);

//         return SuggestionStore.allSuggestions
//         .filter(section => section.content.length > 0);
//       )
//       break;
//     case 'Albums':
//       SuggestionService.searchAlbums(value);
//       break;
//     case 'Books':
//       SuggestionService.searchBooks(value);
//       break;
//     case 'Movies':
//       SuggestionService.searchMovies(value);
//       break;
//     default:
//       SuggestionService.searchAlbums(value);
//       SuggestionService.searchBooks(value);
//       SuggestionService.searchMovies(value);
//       break;
//   }

//   return SuggestionStore.allSuggestions
//   .filter(section => section.content.length > 0);
//  // return people.filter(person => regex.test(getSuggestionValue(person)));
// }

function getSuggestionValue(suggestion) {
  return `${suggestion.name}`;
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.content;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.name}`;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);
  //const imageUrl = suggestion.image[1]['#text'];
  //console.log(imageUrl);
  return (
    <span className={'suggestion-content'}>
    <img src={suggestion.imageUrl} height='35px'> 
     </img>
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;

            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
  );
}

const options = [
  'All', 'Albums', 'Books', 'Movies'
]

class NewStuff extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      selected: options[0],
      isLoading: false
    };    
    this.onChange = this.onChange.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested= this.onSuggestionsClearRequested.bind(this)
    this.createStuff = this.createStuff.bind(this);  
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this.lastRequestId = null;
  }

  _onSelect (option) {
    this.setState({selected: option})
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  onChange(event, { newValue, method }) {
    this.setState({
      value: newValue
    });
    this.scrollToBottom();
  };
  
  onSuggestionsFetchRequested({ value }) {
    // this.setState({
    //   suggestions: getSuggestions(value, this.state.selected)
    // });
    this.loadSuggestions(value);
  };

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
    SuggestionAction.clearSuggestions();
  };

  createStuff(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    //TODO: Add form validation

    //console.log("PARAMS", this.state.newTodoName, this.props.list._id, this.props.index);
    TodoService.createTag(suggestion, this.props.list._id, this.props.index);
    this.setState( {
      value: '',
      suggestions: []
    });
    
  }

  loadSuggestions(value) {
    // Cancel the previous request
    if (this.lastRequestId !== null) {
      //clearTimeout(this.lastRequestId);
    }
    
    this.setState({
      isLoading: true
    });
    
    switch(this.state.selected.label) {
    case 'All':
    this.lastRequestId =
      Promise.all([SuggestionService.searchAlbums(value),
        SuggestionService.searchBooks(value),
        SuggestionService.searchMovies(value)])
      .then(
        result => this.setState({
        isLoading: false,
        suggestions: SuggestionStore.allSuggestions.filter(section => section.content.length > 0)
      }));
      break;
    case 'Albums':
    this.lastRequestId =
      SuggestionService.searchAlbums(value)
      .then(
        result => this.setState({
        isLoading: false,
        suggestions: SuggestionStore.allSuggestions.filter(section => section.content.length > 0)
      }));
      break;
    case 'Books':
    this.lastRequestId =
      SuggestionService.searchBooks(value)
      .then(
        result => this.setState({
        isLoading: false,
        suggestions: SuggestionStore.allSuggestions.filter(section => section.content.length > 0)
      }));
      break;
    case 'Movies':
    this.lastRequestId =
      SuggestionService.searchMovies(value)
      .then(
        result => this.setState({
        isLoading: false,
        suggestions: SuggestionStore.allSuggestions.filter(section => section.content.length > 0)
      }));
    break;
    default:
    this.lastRequestId =
      Promise.all([SuggestionService.searchAlbums(value),
        SuggestionService.searchBooks(value),
        SuggestionService.searchMovies(value)])
      .then(
        result => this.setState({
        isLoading: false,
        suggestions: SuggestionStore.allSuggestions.filter(section => section.content.length > 0)
      }));
    break;
  }

    // Fake request
    //this.lastRequestId =
    // setTimeout(() => {
    //   this.setState({
    //     isLoading: false,
    //     suggestions: getSuggestions(value, this.state.selected)
    //   });
    // }, 1000);
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    console.log("scrolled")
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type something...",
      value,
      onChange: this.onChange
    };
    const defaultOption = this.state.selected;
    const status = (this.state.isLoading ? 'Loading...' : 'Type to load suggestions');

    return (
      <div>
      <div className="status">
          <strong>Status:</strong> {status}
      </div>
      <Autosuggest
        style={{float:"left"}}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        multiSection={true}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        onSuggestionSelected={this.createStuff} />
        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
        </div>
    );
  }
}

export default NewStuff;