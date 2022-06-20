import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { StyledButton, StyledGoBackButton } from "../styledElements";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UserProfile = () => {
  const theRepos = useSelector((state) => state?.repos);
  const { profile } = theRepos;
  const navigate = useNavigate();

  function formatDate(dateStr) {
    const date = new Date(Date.parse(dateStr));
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    return formattedDate;
  }

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          marginBottom: "20px",
        }}
      >
        <CardMedia
          component="img"
          image={profile?.avatar_url}
          alt=""
          sx={{
            maxWidth: 350,
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Followers</TableCell>
              <TableCell align="center">Following</TableCell>
              <TableCell align="center">Created at</TableCell>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Blog</TableCell>
              <TableCell align="center">Bio</TableCell>
              <TableCell align="center">View Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={profile?.login}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {profile?.name} {profile?.login}
              </TableCell>
              <TableCell align="center">{profile?.followers}</TableCell>
              <TableCell align="center">{profile?.following}</TableCell>
              <TableCell align="center">
                {formatDate(profile?.created_at)}
              </TableCell>
              <TableCell align="center">{profile?.company}</TableCell>
              <TableCell align="center">{profile?.email}</TableCell>
              <TableCell align="center">{profile?.location}</TableCell>
              <TableCell align="center">{profile?.blog}</TableCell>
              <TableCell align="center">{profile?.bio}</TableCell>
              <TableCell align="center">
                <StyledButton target="_blank" href={profile?.html_url}>
                  View Profile
                </StyledButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <StyledGoBackButton
        onClick={() => {
          navigate("/");
        }}
      >
        Go back
      </StyledGoBackButton>
    </>
  );
};

export default UserProfile;
