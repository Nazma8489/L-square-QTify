import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../Button/Button';
import './Modal.css';

const FeedbackModal = ({ open, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="feedback-modal-title"
      sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.85)' } }}
    >
      <Box className="qtify-feedback-box">
        {submitted ? (
          <>
            <h2 className="qtify-feedback-title">Thank You!</h2>
            <p className="qtify-feedback-note">Your feedback has been recorded.</p>
            <Button text="Close" onClick={handleClose} />
          </>
        ) : (
          <>
            <h2 className="qtify-feedback-title" id="feedback-modal-title">
              Feedback
            </h2>
            <form className="qtify-feedback-form" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                required
                fullWidth
                margin="normal"
                sx={inputSx}
                InputLabelProps={{ sx: labelSx }}
              />
              <TextField
                label="Email"
                type="email"
                required
                fullWidth
                margin="normal"
                sx={inputSx}
                InputLabelProps={{ sx: labelSx }}
              />
              <TextField
                label="How was your experience?"
                required
                multiline
                rows={4}
                fullWidth
                margin="normal"
                sx={inputSx}
                InputLabelProps={{ sx: labelSx }}
              />
              <div className="qtify-feedback-actions">
                <Button text="Submit" />
                <Button text="Cancel" variant="secondary" onClick={handleClose} />
              </div>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: 'var(--color-white)',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
    '&:hover fieldset': { borderColor: 'var(--color-primary)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' }
  },
  '& input': { color: 'var(--color-white)', fontFamily: 'Poppins, sans-serif' },
  '& textarea': { color: 'var(--color-white)', fontFamily: 'Poppins, sans-serif' }
};

const labelSx = {
  color: 'rgba(255, 255, 255, 0.7)',
  fontFamily: 'Poppins, sans-serif',
  '&.Mui-focused': { color: 'var(--color-primary)' }
};

export default FeedbackModal;