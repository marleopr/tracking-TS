import { styled } from "styled-components";
import React from "react";
import {
  FaBan,
  FaBox,
  FaCheck,
  FaClipboardCheck,
  FaExclamationCircle,
  FaFlag,
  FaMoneyBill,
  FaTimesCircle,
  FaTrash,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface TrackHistoryProps {
  searchHistory: Array<{ codigo: string; status: string }>;
  handleSearchFromHistory: (codigo: string) => void;
  handleDeleteSearch: (index: number) => void;
}

const TrackHistory: React.FC<TrackHistoryProps> = ({
  searchHistory,
  handleSearchFromHistory,
  handleDeleteSearch,
}) => {
  const getIconForStatus = (status: string) => {
    const statusDict: Record<string, React.ReactNode> = {
      "Status não disponível": <FontAwesomeIcon icon={faCircleXmark} />,
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
      "A entrega não pode ser efetuada - Empresa sem expediente": <FaTimesCircle />,
      "Saída para entrega cancelada": <FaTimesCircle />,
      "Objeto entregue ao destinatário": <FaCheck />,
    };
    return statusDict[status] || <FaBox />;
  };

  return (
    <div>
      <h3>Histórico de Pesquisas:</h3>
      <HistoryContainer>
        {searchHistory.map((item, index) => (
          <ul key={index}>
            <div>
              <span onClick={() => handleSearchFromHistory(item.codigo)} onKeyDown={() => {}}>
                {getIconForStatus(item.status)} {item.codigo} -{" "}
                {item.status ? item.status : "Status não disponível"}
              </span>
              <StyledTrashIcon
                onClick={() => handleDeleteSearch(index)}
                aria-label="Excluir"
                title="Excluir"
                style={{ cursor: "pointer" }}
              />
            </div>
          </ul>
        ))}
      </HistoryContainer>
    </div>
  );
};

export default TrackHistory;

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f8fbfe;
  max-height: 25rem;
  overflow: auto;
  width: 100%;
  span {
    &:hover {
      cursor: pointer;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
    }
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: start;
    border-bottom: 1px solid #f1f1f1;
  }
  ul {
    margin: 10px 5px 0 5px;
    padding: 0;
  }
`;

const StyledTrashIcon = styled(FaTrash)`
  margin-left: 5px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: red;
  }
  &:active {
    color: #930000;
  }
`;