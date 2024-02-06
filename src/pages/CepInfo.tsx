import React from "react";
import {
  FaBuilding,
  FaCity,
  FaGlobeAmericas,
  FaHome,
  FaIdCardAlt,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import TrackPrint from "../components/loadersButtons/TrackPrint";

interface CepInfoProps {
  cepData: {
    cep: string;
    logradouro: string | null;
    localidade: string;
    uf: string;
    complemento: string | null;
    bairro: string | null;
    ddd: string;
    ibge: string;
    siafi: string;
    erro?: string;
  } | null;
}

const CepInfo: React.FC<CepInfoProps> = ({ cepData }) => {
  if (!cepData || cepData.erro) {
    return (
      <div>
        <h3>Dados do CEP não encontrados</h3>
        <p>O CEP digitado não foi encontrado ou é inválido.</p>
      </div>
    );
  }

  console.log(cepData);

  const handleTrackPrint = () => {
    window.print();
  };

  return (
    <div>
      <h3>Dados do CEP {cepData.cep}</h3>
      <div className="card">
        <div className="tools">
          <div className="circle">
            <span className="red box"></span>
          </div>
          <div className="circle">
            <span className="yellow box"></span>
          </div>
          <div className="circle">
            <span className="green box"></span>
          </div>
        </div>
        <div className="card__content"></div>
        <div style={{ textAlign: "start" }}>
          <p>
            <FaMapMarkerAlt /> <strong>Logradouro:</strong>{" "}
            {cepData.logradouro || "N/D"}
          </p>
          <p>
            <FaCity /> <strong>Cidade:</strong> {cepData.localidade} -{" "}
            {cepData.uf}
          </p>
          <p>
            <FaHome /> <strong>complemento:</strong>{" "}
            {cepData.complemento || "N/D"}
          </p>
          <p>
            <FaBuilding /> <strong>Bairro:</strong> {cepData.bairro || "N/D"}
          </p>
          <p>
            <FaPhone /> <strong>DDD:</strong> {cepData.ddd}
          </p>
          <p>
            <FaGlobeAmericas /> <strong>IBGE:</strong> {cepData.ibge}
          </p>
          <p>
            <FaIdCardAlt /> <strong>Código do município (SIAFI):</strong>{" "}
            {cepData.siafi}
          </p>
        </div>
        <h6>Powered by API ViaCEP</h6>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TrackPrint handleTrackPrint={handleTrackPrint} />
      </div>
    </div>
  );
};

export default CepInfo;
