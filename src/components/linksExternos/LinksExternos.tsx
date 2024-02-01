import React from "react";
import styled from "styled-components";

interface Transportadora {
  nome: string;
  url: string;
  logoUrl: string;
}

const transportadoras: Transportadora[] = [
    {
      nome: "AsapLog",
      url: "https://rastreio.asaplog.com.br/",
      logoUrl:
        "https://app.asaplog.com.br/assets/logo-829fb93e482117687bd49fb7f5cf2b8f.png",
    },
    {
      nome: "Azul",
      url: "https://www.azulcargoexpress.com.br/Rastreio/Rastreio",
      logoUrl:
        "https://melhorrastreio.com.br/files/azul-cargo-express.b4f85de7.svg",
    },
    {
      nome: "Braspress",
      url: "https://www.braspress.com/rastreie-sua-encomenda/",
      logoUrl: "https://melhorrastreio.com.br/files/melhorenvio.3b490f17.svg",
    },
    {
      nome: "BuscoLog",
      url: "https://www.buscolog.com.br/rastreamento/",
      logoUrl: "https://melhorrastreio.com.br/files/buslog.8c89e02f.svg",
    },
    {
      nome: "DHL",
      url: "https://www.dhl.com/br-pt/home/tracking.html",
      logoUrl:
        "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
    },
    {
      nome: "FedEx",
      url: "https://www.fedex.com/fedextrack/",
      logoUrl:
        "https://logodownload.org/wp-content/uploads/2014/07/fedex-logo-2.png",
    },
    {
      nome: "JadLog",
      url: "https://jadlog.com.br/tracking",
      logoUrl: "https://melhorrastreio.com.br/files/jadlog.e67d781e.svg",
    },
    {
      nome: "Jamef",
      url: "https://www.jamef.com.br/#acompanhamento-da-carga",
      logoUrl:
        "https://www.jamef.com.br/static/media/nova-logo-jamef.e5bdb98e.svg",
    },
    {
      nome: "Kangu",
      url: "https://www.kangu.com.br/rastreio/",
      logoUrl:
        "https://www.kangu.com.br/wp-content/uploads/2021/07/logo-completo-kangu-1653x615-1.png",
    },
    {
      nome: "Latam",
      url: "https://www.latamcargo.com/pt/trackshipment",
      logoUrl:
        "https://melhorrastreio.com.br/files/latam-airlines.95faa23b.svg",
    },
    {
      nome: "Loggi",
      url: "https://www.loggi.com/rastreador/",
      logoUrl: "https://melhorrastreio.com.br/files/loggi.b39c8df1.svg",
    },
    {
      nome: "Mandaê",
      url: "https://rastreae.com.br/busca",
      logoUrl:
        "https://www.mandae.com.br/wp-content/uploads/2021/12/tagline_principal.png",
    },
    {
      nome: "Sequoia",
      url: "https://sfx.sequoialog.com.br/rastreamento/pedido",
      logoUrl:
        "https://reclamacoes.net.br/wp-content/uploads/sequoia-telefone-de-contato.png",
    },
    {
      nome: "Total Express",
      url: "https://totalexpress.com.br/rastrear-um-produto/",
      logoUrl:
        "https://logodownload.org/wp-content/uploads/2019/09/total-express-logo-2.png",
    },
    {
      nome: "TNT Express",
      url: "https://www.tnt.com/express/pt_br/site/ferramentas-de-remessas/rastreamento.html",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/TNT_Express_Logo.svg/1920px-TNT_Express_Logo.svg.png",
    },
  ];

const LinksExternos: React.FC = () => {
  
  return (
    <Main>
      {transportadoras.map((transportadora, index) => (
        <a
          key={index}
          href={transportadora.url}
        //   alt={transportadora.nome}
          title={transportadora.nome}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Logo
            className="nomeDaClassDaFoto"
            src={transportadora.logoUrl}
            alt={transportadora.nome}
          />
        </a>
      ))}
    </Main>
  );
};
export default LinksExternos;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  width: 100%;
`;
const Logo = styled.img`
  /* display: inline-block;  */
  margin: 10px;
  width: 50px;
  height: 20px;
  &:hover {
    -moz-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;
