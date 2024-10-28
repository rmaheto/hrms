import React, {useEffect, useState} from "react";
import {Card, CardContent, Typography, Button, TextField} from "@mui/material";
import NotificationTemplateTable from "./NotificationTemplateTable";
import NotificationTemplateModal from "./NotificationTemplateModal";
import ViewNotificationTemplateModal from "./ViewNotificationTemplateModal";
import DeleteConfirmationModal
  from "../GlobalComponents/DeleteConfirmationModal"
import notificationService from "../../services/NotificationService";

const NotificationTemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalStates, setModalStates] = useState({
    addOrEditTemplateModal: false,
    viewTemplateModal: false,
    deleteTemplateModal: false,
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await notificationService.fetchTemplates();
      setTemplates(response);
      setFilteredTemplates(response);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = templates.filter(template =>
        template.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredTemplates(filtered);
  };

  const handleAddTemplate = () => {
    setIsEditing(false);
    setSelectedTemplate(null);
    setModalStates({
      addOrEditTemplateModal: true,
      viewTemplateModal: false,
      deleteTemplateModal: false,
    });
  };

  const handleEditTemplate = (template) => {
    setIsEditing(true);
    setSelectedTemplate(template);
    setModalStates({
      addOrEditTemplateModal: true,
      viewTemplateModal: false,
      deleteTemplateModal: false,
    });
  };

  const handleViewTemplate = (template) => {
    setSelectedTemplate(template);
    setModalStates({
      addOrEditTemplateModal: false,
      viewTemplateModal: true,
      deleteTemplateModal: false,
    });
  };

  const handleDeleteTemplate = (template) => {
    setSelectedTemplate(template);
    setModalStates({
      addOrEditTemplateModal: false,
      viewTemplateModal: false,
      deleteTemplateModal: true,
    });
  };

  const handleModalClose = (modalType) => {
    setModalStates((prev) => ({
      ...prev,
      [modalType]: false,
    }));
    if (modalType === "addOrEditTemplateModal") {
      setSelectedTemplate(null);
      setIsEditing(false);
    }
  };

  const handleSaveTemplate = async (templateData) => {
    try {
      if (isEditing) {
        await notificationService.updateTemplate(templateData.id, templateData);
      } else {
        await notificationService.saveTemplate(templateData);
      }
      fetchTemplates();
      handleModalClose();
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <Card sx={{margin: 4}}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Notification Templates
          </Typography>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px"
          }}>
            <TextField
                size="small"
                label="Search templates..."
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                style={{width: "40%"}}
            />
            <Button variant="contained" color="primary"
                    onClick={handleAddTemplate}>
              Add Template
            </Button>
          </div>

          <NotificationTemplateTable
              templates={filteredTemplates}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onViewTemplate={handleViewTemplate}
              onEditTemplate={handleEditTemplate}
              onDeleteTemplate={handleDeleteTemplate}
          />
        </CardContent>

        <NotificationTemplateModal
            open={modalStates.addOrEditTemplateModal}
            onClose={() => handleModalClose("addOrEditTemplateModal")}
            onSave={handleSaveTemplate}
            isEditing={isEditing}
            template={selectedTemplate}
        />

        <ViewNotificationTemplateModal
            template={selectedTemplate}
            open={modalStates.viewTemplateModal}
            onClose={() => handleModalClose("viewTemplateModal")}
        />

        <DeleteConfirmationModal
            open={modalStates.deleteTemplateModal}
            onClose={() => handleModalClose("deleteTemplateModal")}
            onConfirm={handleDeleteTemplate}
            entity={selectedTemplate}
            entityName="notification message "
            getDisplayText={(template) => `${template.name} , `}
        />
      </Card>
  );
};

export default NotificationTemplatesPage;