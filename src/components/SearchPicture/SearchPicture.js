import React, { useState } from 'react';

export default function SearchPicture(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClickSearchHandler = () => {
    props.search(searchTerm);
    setSearchTerm('');
  };

  return (
    <div>
      <input type='text' onChange={onSearchHandler} value={searchTerm} />
      <button onClick={onClickSearchHandler}>Search!</button>
    </div>
  );
}
