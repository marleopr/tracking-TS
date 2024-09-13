import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToHomePage } from "../routes/coordinator";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import TrackButton from "../components/loadersButtons/TrackButton";
import styled from "styled-components";
import TrackInput from "../components/loadersButtons/TrackInput";
import TrackButtonV2 from "../components/loadersButtons/TrackButtonV2";
import TrackLoader from "../components/loadersButtons/TrackLoader";
import CepHistory from "../components/cepHistory/CepHistory";
import CepInfo from "./CepInfo";
import { Box } from "@mui/material";
import {
  ArrowBackIcon,
  NewSearchIcon,
  SearchIcon,
} from "../components/loadersButtons/IconsSvg";

interface CepData {
  cep: string;
  localidade: string;
  logradouro: string | null;
  uf: string;
  complemento: string | null;
  bairro: string | null;
  ddd: string;
  ibge: string;
  siafi: string;
  erro: string;
}

const BuscaCep: React.FC = () => {
  const [cepData, setCepData] = useState<CepData | null>(null);
  const [codigoCep, setCodigoCep] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const navigate = useNavigate();

  const getCepHistoryFromLocalStorage = (): CepData[] => {
    const savedCepHistory = localStorage.getItem("cepHistory");
    return savedCepHistory ? JSON.parse(savedCepHistory) : [];
  };
  const [cepHistory, setCepHistory] = useState<CepData[]>(
    getCepHistoryFromLocalStorage
  );

  const handleDeleteCep = (indexToDeleteCep: number): void => {
    setCepHistory((prevCepHistory) => {
      const updateCepHistory = [...prevCepHistory];
      updateCepHistory.splice(indexToDeleteCep, 1);
      localStorage.setItem("cepHistory", JSON.stringify(updateCepHistory));
      return updateCepHistory;
    });
  };

  useEffect(() => {
    localStorage.setItem("cepHistory", JSON.stringify(cepHistory));
  }, [cepHistory]);

  const getCep = async (): Promise<void> => {
    try {
      const res = await axios.get<CepData>(
        `https://viacep.com.br/ws/${codigoCep}/json/`
      );
      if (res.data.erro) {
        setCepData(null);
        setLoading(false);
        toast.error("O CEP digitado não foi encontrado ou é inválido.");
      } else {
        setCepData(res.data);
        setLoading(false);
        toast.success("CEP encontrado!");

        if (!cepHistory.some((item) => item.cep === res.data.cep)) {
          setCepHistory((prevCepHistory) => [res.data, ...prevCepHistory]);
        }
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao buscar o CEP. Por favor, tente novamente."
      );
    }
  };

  const handleGetCep = async (): Promise<void> => {
    await getCep();
  };

  useEffect(() => {
    if (buttonClicked) {
      handleGetCep();
      setButtonClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonClicked]);

  const handleCepFromHistory = (codigoCep: string): void => {
    setCodigoCep(codigoCep);
    setCepData(null);
    setButtonClicked(true);
  };

  const handleReloadBuscaCepPage = (): void => {
    window.location.reload();
  };

  const isCodigoValido = codigoCep.trim() !== "";

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
      <CepCointainer>
        <TrackButton
          onClick={() => goToHomePage(navigate)}
          label="Voltar"
          style={{ minHeight: "40px" }}
          iconSvg={ArrowBackIcon}
        />
        <Box alignItems="center" margin="10px">
          {cepData ? (
            <TrackButton
              onClick={handleReloadBuscaCepPage}
              label="Nova pesquisa"
              style={{ minHeight: "40px" }}
              iconSvg={NewSearchIcon}
            />
          ) : (
            <Box display="flex" alignItems="center" gap={2} margin="10px">
              <TrackInput
                placeholder="Digite o CEP aqui"
                value={codigoCep}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCodigoCep(event.target.value)
                }
              />
              <TrackButtonV2
                onClick={handleGetCep}
                disabled={!isCodigoValido}
                label="Buscar"
                iconSvg={SearchIcon}
              />
            </Box>
          )}
        </Box>
      </CepCointainer>
      {loading && <TrackLoader />}

      {!loading && cepData && (
        <div>
          <CepInfo cepData={cepData} />
        </div>
      )}
      {!loading && !cepData && cepHistory.length > 0 && (
        <HistoricCepDiv>
          <CepHistory
            cepHistory={cepHistory}
            handleCepFromHistory={handleCepFromHistory}
            handleDeleteCep={handleDeleteCep}
          />
        </HistoricCepDiv>
      )}
    </div>
  );
};

export default BuscaCep;

export const CepCointainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    margin: 10px;
  }
`;
export const HistoricCepDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  span {
    &:hover {
      cursor: pointer;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
    }
  }
`;
