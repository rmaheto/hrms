import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  entity = null,
  entityName = "this item",
  getDisplayText = () => ""
}) => {
  if (!entity) return null;

  // Define a handler to wrap the delete action
  const handleDelete = async () => {
    await onConfirm(); // Wait for delete action to complete
    onClose(); // Close the modal
  };

  return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            {`Are you sure you want to delete ${entityName}? ${getDisplayText(entity)}`}
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default DeleteConfirmationModal;