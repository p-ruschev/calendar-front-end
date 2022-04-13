import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      //read from local storage to check if there is item identified by the key
      let item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setItem = (value) => {
    //TODO add implementation for functions instead of single value as argument of the
    //setItem function
    try {
      // save to localStorage
      // save to state
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };
  return [state, setItem];
};

export default useLocalStorage;
