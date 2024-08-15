import React from 'react';
import TextField from '@mui/material/TextField';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { inputRef, onChange, ...other } = props;

  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <TextField
      {...other}
      onChange={handleChange}
      inputRef={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      InputProps={{
        inputComponent: NumberFormatCustomInput,
      }}
    />
  );
});

function NumberFormatCustomInput(props) {
  const { inputRef, onChange, ...other } = props;

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <input
      {...other}
      ref={inputRef}
      onChange={handleChange}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
    />
  );
}

export default NumberFormatCustom;
