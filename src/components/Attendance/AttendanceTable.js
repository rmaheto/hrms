import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const AttendanceTable = ({
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Begin</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Hours Worked</TableCell>
            <TableCell>Overtime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice for pagination
              .map((attendance) => (
                <TableRow key={attendance.id}>
                  <TableCell>{attendance.id}</TableCell>
                  <TableCell>{attendance.date}</TableCell>
                  <TableCell>{attendance.begin}</TableCell>
                  <TableCell>{attendance.end}</TableCell>
                  <TableCell>{attendance.hoursWorked?.toFixed(2)}</TableCell>
                  <TableCell>{attendance.overtime?.toFixed(2)}</TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No attendance data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Add TablePagination here */}
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};

export default AttendanceTable;
