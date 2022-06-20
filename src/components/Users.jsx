import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "../styledElements";
import { CardMedia } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {
  fetchUsersAction,
  fetchProfileAction,
} from "../reduxToolkit/slices/githubSlices";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const theRepos = useSelector((state) => state?.repos);
  const { users } = theRepos;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchProfileAction(selectedUser));
  }, [selectedUser, dispatch]);

  useEffect(() => {
    dispatch(fetchUsersAction(users));
  }, [users, dispatch]);

  const navigateToOverview = useCallback((login) => {
    navigate("/user/" + login);
  }, []);

  return (
    <>
      <h1>List of 100 GitHub users</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 900, margin: "50px" }}
        >
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Login</StyledTableCell>
                <StyledTableCell align="center">Profile link</StyledTableCell>
                <StyledTableCell align="center">Avatar</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <Tooltip
                  title="Double Click for details"
                  placement="bottom-start"
                >
                  <StyledTableRow
                    key={user.id}
                    onClick={() => {
                      {
                        selectedUser
                          ? navigateToOverview(user.login)
                          : setSelectedUser(user.login) &&
                            navigateToOverview(user.login);
                      }
                    }}
                  >
                    <StyledTableCell component="th" scope="row" align="center">
                      {user.login}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.html_url}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <CardMedia
                        component="img"
                        height="100"
                        image={user.avatar_url}
                        alt=""
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Users;
