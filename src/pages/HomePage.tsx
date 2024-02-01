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
import LinksExternos from "../components/linksExternos/LinksExternos";
import TrackLoader from "../components/loadersButtons/TrackLoader";
import TrackButton from "../components/loadersButtons/TrackButton";
import TrackingInfo from "./TrackingInfo";
import TrackHistory from "../components/trackHistory/TrackHistory";

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

  // Função auxiliar para recuperar o histórico do localStorage
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
      updateHistory.splice(indexToDelete, 1); // Remove o item pelo índice

      localStorage.setItem("searchHistory", JSON.stringify(updateHistory));
      return updateHistory;
    });
  };

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const getTracks = async (): Promise<void> => {
    setError(null);
    const codePattern = /^[a-zA-Z]{1,2}\d{9}[a-zA-Z]{1,2}$/;
    if (!codigo.match(codePattern)) {
      toast.error(
        "O código digitado está incorreto. Insira um código válido no padrão 'NB123456789BR"
      );
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get<ApiData>(`${BASE_URL}user=${user}&token=${token}&codigo=${codigo}`);

      setApiData({ codigo, eventos: res.data.eventos });
      setLoading(false);

      const existingIndex = searchHistory.findIndex(
        (item) => item.codigo === codigo
      );
      if (existingIndex !== -1) {
        setSearchHistory((prevHistory) => {
          const updateHistory = [...prevHistory];
          updateHistory.splice(existingIndex, 1);
          return [
            {
              codigo,
              status: res.data.eventos[0]?.status || "Status não disponível",
            },
            ...updateHistory,
          ];
        });
      } else {
        setSearchHistory((prevHistory) => [
          {
            codigo,
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
        <span>
          <TrackInput
            placeholder={"Digite seu código"}
            value={codigo.toUpperCase()}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setCodigo(event.target.value)
            }
          />
        </span>
        <span>
          <TrackButtonV2
            onClick={handleSearch}
            disabled={!isCodigoValido}
            label="Rastrear"
            iconSvg={
              <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
            }
          />
        </span>
      </TrackCointainer>
      <LinksExternos />
      <TrackButton
        onClick={handleNavigate}
        label="Buscar CEP"
        style={{ fontSize: "16px" }}
        iconSvg={
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-112 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
        }
      />
      {error && <p style={{ color: "red", width: "70%" }}>{error}</p>}
      {loading ? (
        <TrackLoader />
      ) : apiData ? (
        <div style={{ margin: "10px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TrackButton
              onClick={handleReloadHomePage}
              label="Nova pesquisa"
              style={{ fontSize: "14px" }}
              iconSvg={
                <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
              }
            />
          </div>
          <TrackingInfo trackingData={apiData} />
        </div>
      ) : (
        searchHistory.length > 0 && (
          <div style={{ width: "100%" }}>
            <TrackHistory
              searchHistory={searchHistory}
              handleSearchFromHistory={handleSearchFromHistory}
              handleDeleteSearch={handleDeleteSearch}
            />
          </div>
        )
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
