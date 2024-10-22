import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import AttendanceTable from "./AttendanceTable";
import attendanceService from "../../services/AttendanceService";
import employeeService from "../../services/EmployeeService";

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

const AttendancePage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [totalHoursWorked, setTotalHoursWorked] = useState(0);
  const [totalOvertime, setTotalOvertime] = useState(0);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = async () => {
    if (!employeeId || !startDate || !endDate) {
      alert("Please fill in all fields");
      return;
    }

    // Fetch attendance data
    const data = await attendanceService.fetchAttendance(
      employeeId,
      startDate,
      endDate
    );
    setAttendanceData(data);

    // Fetch employee details
    const employeeDetails = await employeeService.fetchEmployeeById(employeeId);
    setEmployee(employeeDetails);

    // Calculate total hours worked and overtime
    const totalHours = data.reduce(
      (sum, entry) => sum + (entry.hoursWorked || 0),
      0
    );
    const totalOvertime = data.reduce(
      (sum, entry) => sum + (entry.overtime || 0),
      0
    );

    setTotalHoursWorked(totalHours.toFixed(2));
    setTotalOvertime(totalOvertime.toFixed(2));
  };

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Convert to number
    setPage(0); // Reset to first page
  };

  return (
    <Card sx={{ margin: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Attendance Report
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Employee ID"
              name="employeeId"
              fullWidth
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              sx={compactFieldStyle}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Start Date"
              name="startDate"
              fullWidth
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={compactFieldStyle}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="End Date"
              name="endDate"
              fullWidth
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={compactFieldStyle}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {/* Button row aligned to the right */}
        <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>

        {/* Display employee name if available */}
        {employee && (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            <span style={{ fontWeight: "bold" }}>Employee:</span>{" "}
            {employee.lastName}, {employee.firstName}
          </Typography>
        )}

        {/* Display total hours worked and overtime */}
        {attendanceData.length > 0 && (
          <>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              <span style={{ fontWeight: "bold" }}>Total Hours Worked:</span>{" "}
              {totalHoursWorked}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>Total Overtime:</span>{" "}
              {totalOvertime}
            </Typography>

            {/* Pass pagination data to AttendanceTable */}
            <AttendanceTable
              data={attendanceData}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendancePage;
