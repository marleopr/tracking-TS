import { NavigateFunction } from "react-router-dom";

export const goToHomePage = (navigate: NavigateFunction) => {
  navigate("/");
};

export const goToBuscaCep = (navigate: NavigateFunction) => {
  navigate("/buscacep");
};
