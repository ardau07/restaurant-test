import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButton,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core';
import { Edit as EditIcon, DeleteForever as DeleteIcon } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';

import UserDialog from 'src/components/UserDialog';
import Loader from 'src/components/Loader';
import { getUsers, deleteUser, setUser } from 'src/store/actions/user';

import useStyles from './style';

const UsersList = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const snackbar = useSnackbar();
  const confirm = useConfirm();

  const dispatch = useDispatch();
  const { users, totalCount } = useSelector((state) => state.user);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    await dispatch(getUsers(page * rowsPerPage, rowsPerPage));
    setLoading(false);
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdateUser = (id) => () => {
    const user = users.find((item) => item.id === id);
    dispatch(setUser(user));
    setOpenDialog(true);
  };

  const handleDeleteUser = (id) => () => {
    confirm({
      description: 'Are you going to delete this user?',
    }).then(() => {
      dispatch(
        deleteUser(
          id,
          () => {
            snackbar.enqueueSnackbar('Delete a user successfully', { variant: 'success' });
            if (totalCount === page * rowsPerPage + 1 && page > 0) {
              setPage(page - 1);
            } else {
              fetchUsers();
            }
          },
          () => {
            snackbar.enqueueSnackbar('Delete a user failed', { variant: 'error' });
          }
        )
      );
    });
  };

  return (
    <>
      <Paper className={classes.paper}>
        {loading ? (
          <Loader />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 70 }}>#</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className={classes.textCapitalize}>{user.role}</TableCell>
                      <TableCell className={classes.noPadding}>
                        <IconButton onClick={handleUpdateUser(user.id)}>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={handleDeleteUser(user.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Paper>
      <UserDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
};

export default UsersList;
