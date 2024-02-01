import React from "react";
import { Box } from "@chakra-ui/react";
import {
  FaTruck,
  FaFlag,
  FaCheck,
  FaBox,
  FaExclamationCircle,
  FaTimesCircle,
  FaChevronCircleUp,
  FaClipboardCheck,
  FaMoneyBill,
  FaBan,
  FaUndo,
} from "react-icons/fa";
import logoCorreios from "../assets/correios.svg";
import StatusBar from "../components/loadersButtons/StatusBar";
import TrackPrint from "../components/loadersButtons/TrackPrint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface TrackingInfoProps {
  trackingData: {
    codigo: string;
    eventos: Array<{
      status: string;
      subStatus: string[];
      local: string;
      data: string;
      hora: string;
    }>;
  };
}

const getIconForStatus = (status: string) => {
  const statusDict: Record<string, React.ReactNode> = {
    "Objeto postado": <FaBox />,
    "Objeto recebido pelos Correios do Brasil": <FaFlag />,
    "Encaminhado para fiscalização aduaneira": <FaClipboardCheck />,
    "Aguardando pagamento": <FaMoneyBill />,
    "Destinatário recusou o objeto": <FaBan />,
    "Devolução autorizada pela Receita Federal": <FaUndo />,
    "Objeto devolvido ao país de origem": <FaUndo />,
    "Fiscalização aduaneira finalizada": <FaCheck />,
    "Objeto encaminhado": <FaTruck />,
    "Objeto saiu para entrega ao destinatário": <FaExclamationCircle />,
    "Saída para entrega cancelada": <FaTimesCircle />,
    "Objeto entregue ao destinatário": <FaCheck />,
  };
  return statusDict[status] || <FaBox />;
};

const TrackingInfo: React.FC<TrackingInfoProps> = ({ trackingData }) => {
  if (!trackingData) {
    return null;
  }

  if (trackingData.eventos.length === 0) {
    return (
      <div>
        <h3>Dados de rastreamento para: {trackingData.codigo}</h3>
        <FontAwesomeIcon icon={faCircleXmark} />
        <p>Status não disponível.</p>
      </div>
    );
  }

  const handleTrackPrint = () => {
    window.print();
  };
  const handleScrollPage = () => {
    window.scrollTo(0, 0);
  };

  const lastEvent = trackingData.eventos[0]; // Obtém o último evento

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h3>Dados de rastreamento para: {trackingData.codigo}</h3>
        <a
          href={"https://rastreamento.correios.com.br/app/index.php"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logoCorreios}
            style={{
              display: "inline-block",
              margin: "5px",
              width: "100px",
              height: "50px",
            }}
            alt="Correios"
            title="Correios"
          />
        </a>
        <div>
          <StatusBar evento={lastEvent} />
        </div>
        {trackingData.eventos.map((evento, index) => {
          // Separa a origem e o destino a partir do array subStatus
          const [origem, destino] = evento.subStatus.map(
            (sub) => sub.split(": ")[1]
          );

          return (
            <div key={index} className="card">
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
              <Box mb="4" fontSize="2xl">
                {getIconForStatus(evento.status)}{" "}
                {/* Ícone correspondente ao status */}
                {evento.status}
              </Box>
              <p>
                <strong>Local:</strong> {evento.local}
              </p>
              <p>
                <strong>Data:</strong> {evento.data} às {evento.hora}
              </p>
              <p>
                <strong>Origem:</strong> {origem}
              </p>
              {destino && (
                <p>
                  <strong>Destino:</strong> {destino}
                </p>
              )}
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TrackPrint handleTrackPrint={handleTrackPrint} />
          <FaChevronCircleUp
            onClick={handleScrollPage}
            style={{ cursor: "pointer" }}
            size={30}
          />
        </div>
      </div>
    </div>
  );
};

export default TrackingInfo;
