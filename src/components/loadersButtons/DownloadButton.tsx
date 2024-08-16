import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DownloadButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
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
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
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
        <button className="buttonDownload" onClick={handleInstallApp}>
          Baixe o App
        </button>
      )}
    </>
  );
};

export default DownloadButton;
