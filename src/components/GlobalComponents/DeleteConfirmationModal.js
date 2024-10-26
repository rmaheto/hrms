import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  entity = null,
  entityName = "this item",
  getDisplayText = () => ""
}) => {
  if (!entity) return null;

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
          <Button onClick={onConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default DeleteConfirmationModal;