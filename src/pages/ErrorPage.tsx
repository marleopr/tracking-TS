import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import errorPageImg from "../assets/errorPageImg.webp";
import pageNotFound from "../assets/pagina-nao-encontrada.png"
import TrackButton from "../components/loadersButtons/TrackButton";
import { goToHomePage } from "../routes/coordinator";
import { ArrowBackIcon } from "../components/loadersButtons/IconsSvg";

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

  return (
        <Main>
            <h1 style={{ color: 'white', textShadow: 'black' }}>Página não encontrada</h1>
            <img src={pageNotFound} alt="Page Not Found" style={{ width: '100px', marginBottom: '20px' }} />
             <TrackButton
        onClick={() => goToHomePage(navigate)}
        label="Voltar"
        iconSvg={ArrowBackIcon}
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