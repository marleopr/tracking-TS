import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import errorPageImg from "../assets/errorPageImg.webp";
import pageNotFound from "../assets/pagina-nao-encontrada.png"
import TrackButton from "../components/loadersButtons/TrackButton";
import { goToHomePage } from "../routes/coordinator";

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

  return (
        <Main>
            <h1 style={{ color: 'white', textShadow: 'black' }}>Página não encontrada</h1>
            <img src={pageNotFound} alt="Page Not Found" style={{ width: '100px', marginBottom: '20px' }} />
             <TrackButton
        onClick={() => goToHomePage(navigate)}
        label="Voltar"
        iconSvg={
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        }
      />
        </Main >

    )
};
export default ErrorPage;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50vh;
    background-image: url(${errorPageImg});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: radial-gradient(circle, rgba(33,33,33,1) 0%, rgba(1,21,34,1) 100%);
`