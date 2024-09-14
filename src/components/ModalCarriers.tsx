import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LinksExternos from "./linksExternos/LinksExternos";
import TrackButton from "./loadersButtons/TrackButton";
import { TruckIcon } from "./loadersButtons/IconsSvg";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #3cb371",
  boxShadow: 24,
  p: 4,
};

export default function ModalCarriers() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <TrackButton 
      onClick={handleOpen}
      label="Transportadoras"
      iconSvg={TruckIcon}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Escolha a sua transportadora
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <LinksExternos />
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
