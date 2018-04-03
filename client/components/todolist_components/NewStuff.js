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

function getSuggestions(value, category) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');
  
  switch(category.label) {
    case 'All':
      SuggestionService.searchAlbums(value);
      SuggestionService.searchBooks(value);
      SuggestionService.searchMovies(value);
      break;
    case 'Albums':
      SuggestionService.searchAlbums(value);
      break;
    case 'Books':
      SuggestionService.searchBooks(value);
      break;
    case 'Movies':
      SuggestionService.searchMovies(value);
      break;
    default:
      SuggestionService.searchAlbums(value);
      SuggestionService.searchBooks(value);
      SuggestionService.searchMovies(value);
      break;
  }
  // SuggestionService.searchAlbums(value);
  // SuggestionService.searchBooks(value);
  // SuggestionService.searchMovies(value);
  console.log(SuggestionStore.allSuggestions);

  return SuggestionStore.allSuggestions
  .filter(section => section.content.length > 0);
  //return people.filter(person => regex.test(getSuggestionValue(person)));
}

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
      selected: options[0]
    };    
    this.onChange = this.onChange.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested= this.onSuggestionsClearRequested.bind(this)
    this.createStuff = this.createStuff.bind(this);  
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this._onSelect = this._onSelect.bind(this);
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
    this.setState({
      suggestions: getSuggestions(value, this.state.selected)
    });
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
    //this.props.scrollToBottom();
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
    return (
      <div>
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