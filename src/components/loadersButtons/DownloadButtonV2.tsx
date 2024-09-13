import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DownloadButtonV2: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const isAppInstalled = localStorage.getItem("isAppInstalled");
    if (isAppInstalled) {
      setIsInstalled(true);
    } else {
      const handleBeforeInstallPrompt: EventListener = (event: Event) => {
        event.preventDefault();
        setDeferredPrompt(event as BeforeInstallPromptEvent);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
      };
    }
  }, []);

  const handleInstallApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          toast.success("Usuário aceitou a instalação");
          localStorage.setItem("isAppInstalled", "true");
          setIsInstalled(true);
        } else {
          toast.error("Usuário recusou a instalação");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      {!isInstalled && (
        <button className="buttonDownloadV2" onClick={handleInstallApp}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
            className="svgIconButtonDownloadV2"
          >
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
          </svg>
          <span className="icon2ButtonDownloadV2"></span>
        </button>
      )}
    </>
  );
};

export default DownloadButtonV2;
