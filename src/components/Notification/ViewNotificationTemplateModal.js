import React from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const ViewNotificationTemplateModal = ({ open, onClose, template }) => {
  if (!template) return null;

  return (
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Notification Template Details
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">{template.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Message Type
                </Typography>
                <Typography variant="body1">{template.type}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Subject
                </Typography>
                <Typography variant="body1">{template.subject}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Body
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-line",
                      maxHeight: 200,
                      overflowY: "auto",
                    }}
                >
                  {template.body}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
  );
};

export default ViewNotificationTemplateModal;