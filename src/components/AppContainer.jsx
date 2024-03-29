import { useState } from 'react';
import CountDown from './CountDown.jsx';

function AppContainer() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <input
        className="time-input"
        type="datetime-local"
        value={inputValue}
        onChange={handleInputChange}
      />
      <CountDown deadline={inputValue} />
    </>
  );
}

export default AppContainer;
