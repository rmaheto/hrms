import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import notificationService from "../../services/NotificationService";

const compactFieldStyle = {
  marginBottom: 1,
  "& .MuiInputBase-root": {
    height: 40,
  },
  "& .MuiInputLabel-root": {
    fontSize: 14,
  },
  "& .MuiInputBase-input": {
    fontSize: 14,
    padding: "8px",
  },
};

const NotificationTemplateModal = ({ open, onClose, onSave, isEditing, template }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    messageType: "",
    subject: "",
    body: "",
  });
  const [messageTypes, setMessageTypes] = useState([]);

  useEffect(() => {
    // Load message types without modifying form data in edit mode
    const fetchMessageTypes = async () => {
      try {
        const types = await notificationService.fetchMessageTypes();
        setMessageTypes(types);
      } catch (error) {
        console.error("Error fetching message types:", error);
      }
    };

    fetchMessageTypes();

    if (isEditing && template) {
      setFormData({
        id: template.id,
        name: template.name,
        messageType: template.type,
        subject: template.subject,
        body: template.body,
      });
    } else {
      setFormData({
        id: null,
        name: "",
        messageType: "",
        subject: "",
        body: "",
      });
    }
  }, [isEditing, template]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? "Edit Template" : "Add Template"}</DialogTitle>
        <DialogContent>
          <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={compactFieldStyle}
          />
          <TextField
              select
              label="Message Type"
              name="messageType"
              value={formData.messageType}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={compactFieldStyle}
          >
            {messageTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
            ))}
          </TextField>
          <TextField
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={compactFieldStyle}
          />
          <TextField
              label="Body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              sx={{ ...compactFieldStyle, "& .MuiInputBase-root": { height: "auto" } }} // Overrides height for textarea
          />
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <Button onClick={onClose} color="secondary" variant="outlined" sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
  );
};

export default NotificationTemplateModal;