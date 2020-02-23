import React from 'react'

const Suggestions = (props) => {
  if(props.suggestions.length === 0) {
    return null;
  } 
    const options = props.suggestions.map(result => (
    <li onClick={props.suggestionSelected} key={result.id.value} >
      {`${result.name.first} ${result.name.last}`}
    </li>
  ));
  return <ul>{options}</ul>
}

export default Suggestions;