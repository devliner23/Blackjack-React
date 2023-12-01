import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface ModalComponentProps {
    open: boolean;
    handleClose: () => void;
  }

const ModalComponent: React.FC<ModalComponentProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Rules of Blackjack
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Place a bet in the betting areas marked on the table. You and fellow players are dealt two cards each whilst the dealer is dealt one face up. If your first 2 cards add up to 21 (an Ace and a card valued 10), that’s Blackjack! If they have any other total, decide whether you wish to ‘draw’ or ‘stay’. You can continue to draw cards until you are happy with your hand.


        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
