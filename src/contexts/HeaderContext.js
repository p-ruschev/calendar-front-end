import { createContext, useContext, useState } from "react";
//import { useNavigate } from "react-router-dom";

//import * as authService from "../services/authService";
//import useLocalStorage from "../hooks/useLocalStorage";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [load, setLoad] = useState("load-bar-complete");
  const [searchResult, setSearchResult] = useState({});
  const [navStyleSearch, setNavStyleSearch] = useState("left-nav");

  const mobileSearch = (style) => {
    setNavStyleSearch(style);
  };
  const startLoading = () => {
    setLoad("load-bar-start");
  };
  const completeLoading = () => {
    setLoad("load-bar-complete");
    //   setTimeout(() => {
    //   }, 800)
  };

  const errorLoading = () => {
    setLoad("load-bar-error");
    setTimeout(() => {
      setLoad("load-bar-neutral");
    }, 3000);
  };

  const loadResult = (result) => {
    setSearchResult(result);
  };

  return (
    <HeaderContext.Provider
      value={{
        load,
        startLoading,
        completeLoading,
        errorLoading,
        searchResult,
        loadResult,
        navStyleSearch,
        mobileSearch,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const headerState = useContext(HeaderContext);

  return headerState;
};
