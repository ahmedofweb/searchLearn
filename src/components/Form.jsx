import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setLocalError("Whoops, can't be empty…");
      setTimeout(() => setLocalError(''), 3000);
      return;
    }
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className={localError ? 'red-border' : 'border-form'}>
      <input
        type="text"
        placeholder="Enter a word..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <button type="submit">Search</button>
      {localError && <div className="error">{localError}</div>}
    </form>
  );
};

export default Form;
