import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
export default function SearchPicture(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClickSearchHandler = () => {
    props.search(searchTerm);
    props.loading(true);
    setSearchTerm('');
  };

  return (
    <div>
      <TextField
        sx={{ width: '20%' }}
        size='small'
        type='text'
        label='Search Term'
        onChange={onSearchHandler}
        value={searchTerm}
      />
      <Button style={{ height: '40px' }} variant='outlined' onClick={onClickSearchHandler}>
        Search!
      </Button>
    </div>
  );
}
