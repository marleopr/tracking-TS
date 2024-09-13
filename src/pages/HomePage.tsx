import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, token, user } from "../constants/BASE_URL";
import { useNavigate } from "react-router-dom";
import { goToBuscaCep } from "../routes/coordinator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import TrackInput from "../components/loadersButtons/TrackInput";
import TrackButtonV2 from "../components/loadersButtons/TrackButtonV2";
import TrackLoader from "../components/loadersButtons/TrackLoader";
import TrackButton from "../components/loadersButtons/TrackButton";
import TrackingInfo from "./TrackingInfo";
import TrackHistory from "../components/trackHistory/TrackHistory";
import { Box } from "@mui/material";
import ModalCarriers from "../components/ModalCarriers";
import {
  NewSearchIcon,
  SearchIcon,
  TruckIcon,
} from "../components/loadersButtons/IconsSvg";

interface ApiData {
  codigo: string;
  eventos: Evento[];
}
interface Evento {
  status: string;
  subStatus: string[];
  local: string;
  data: string;
  hora: string;
}
interface SearchHistoryItem {
  codigo: string;
  status: string;
}

const HomePage: React.FC = () => {
  const [apiData, setApiData] = useState<{
    codigo: string;
    eventos: Evento[];
  } | null>(null);
  const [codigo, setCodigo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    goToBuscaCep(navigate);
  };

  const getSearchHistoryFromLocalStorage = (): SearchHistoryItem[] => {
    const savedHistory = localStorage.getItem("searchHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  };
  const [searchHistory, setSearchHistory] = useState(
    getSearchHistoryFromLocalStorage
  );

  const handleDeleteSearch = (indexToDelete: number): void => {
    setSearchHistory((prevHistory) => {
      const updateHistory = [...prevHistory];
      updateHistory.splice(indexToDelete, 1);
      localStorage.setItem("searchHistory", JSON.stringify(updateHistory));
      return updateHistory;
    });
  };

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const getTracks = async (): Promise<void> => {
    setError(null);
    const codigoSemEspacos = codigo.replace(/\s+/g, "");
    const codePattern = /^[a-zA-Z]{1,2}\d{9}[a-zA-Z]{1,2}$/;
    if (!RegExp(codePattern).exec(codigoSemEspacos)) {
      toast.error(
        "O código digitado está incorreto. Insira um código válido no padrão 'NB123456789BR"
      );
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get<ApiData>(
        `${BASE_URL}user=${user}&token=${token}&codigo=${codigoSemEspacos}`
      );

      setApiData({ codigo, eventos: res.data.eventos });
      setLoading(false);

      const existingIndex = searchHistory.findIndex(
        (item) => item.codigo === codigoSemEspacos
      );
      if (existingIndex !== -1) {
        setSearchHistory((prevHistory) => {
          const updateHistory = [...prevHistory];
          updateHistory.splice(existingIndex, 1);
          return [
            {
              codigo: codigoSemEspacos,
              status: res.data.eventos[0]?.status || "Status não disponível",
            },
            ...updateHistory,
          ];
        });
      } else {
        setSearchHistory((prevHistory) => [
          {
            codigo: codigoSemEspacos,
            status: res.data.eventos[0]?.status || "Status não disponível",
          },
          ...prevHistory,
        ]);
      }

      if (res.data.eventos.length === 0) {
        toast.error("Status não disponível");
      } else {
        toast.success("Encomenda rastreada!");
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        "Ocorreu um erro ao buscar o código de rastreamento. Por favor tente novamente mais tarde."
      );
    }
  };

  const handleSearch = async (): Promise<void> => {
    await getTracks();
  };

  useEffect(() => {
    if (buttonClicked) {
      handleSearch();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  const handleSearchFromHistory = (codigo: string): void => {
    setCodigo(codigo);
    setError(null);
    setApiData(null);
    setButtonClicked(true);
  };

  const handleReloadHomePage = (): void => {
    window.location.reload();
  };

  const isCodigoValido = codigo.trim() !== "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ToastContainer />
      <TrackCointainer>
        <TrackButton
          onClick={handleNavigate}
          label="Buscar CEP"
          style={{ minHeight: "40px" }}
          iconSvg={SearchIcon}
        />
        <Box alignItems="center" margin="10px">
          {apiData ? (
            <TrackButton
              onClick={handleReloadHomePage}
              label="Nova pesquisa"
              style={{ minHeight: "40px" }}
              iconSvg={NewSearchIcon}
            />
          ) : (
            <Box display="flex" alignItems="center" gap={2} margin="10px">
              <TrackInput
                placeholder={"Digite seu código"}
                value={codigo.toUpperCase()}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCodigo(event.target.value)
                }
              />
              <TrackButtonV2
                onClick={handleSearch}
                disabled={!isCodigoValido}
                label="Rastrear"
                iconSvg={TruckIcon}
              />
            </Box>
          )}
        </Box>
      </TrackCointainer>
      <ModalCarriers />
      {error && <p style={{ color: "red", width: "70%" }}>{error}</p>}
      {loading ? (
        <TrackLoader />
      ) : (
        apiData && (
          <div style={{ margin: "10px" }}>
            <TrackingInfo trackingData={apiData} />
          </div>
        )
      )}

      {searchHistory.length > 0 && (
        <div style={{ width: "100%" }}>
          <TrackHistory
            searchHistory={searchHistory}
            handleSearchFromHistory={handleSearchFromHistory}
            handleDeleteSearch={handleDeleteSearch}
          />
        </div>
      )}
    </div>
  );
};
export default HomePage;

export const TrackCointainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    margin: 5px;
  }
`;
