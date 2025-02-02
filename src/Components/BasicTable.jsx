import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '../Redux/dataslice';
import { Grid } from '@mui/material';

function createData(userId, id, title, completed) {
  return { userId, id, title, completed };
}

export default function BasicTable() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.data.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos/');
        const formattedData = res.data.map(item =>
          createData(item.userId, item.id, item.title, item.completed)
        );
        dispatch(setData(formattedData));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: 0, md: 2 } }}>
        <TableContainer component={Paper} className="overflow-x-auto">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">User ID</TableCell>
                <TableCell align="right" className="font-bold">ID</TableCell>
                <TableCell align="right" className="font-bold">Title</TableCell>
                <TableCell align="right" className="font-bold">Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-100">
                  <TableCell component="th" scope="row">
                    {row.userId}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.completed ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
