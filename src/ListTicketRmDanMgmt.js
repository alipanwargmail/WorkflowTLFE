import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core/';
//import TableContainer from '@material-ui/core/TableContainer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
/*
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
*/

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));


export default function ListTicketRmDanMgmt() {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [rows, setRows] = React.useState([]);
    const open = Boolean(anchorEl);
    const token = sessionStorage.getItem('token');

    //const user = JSON.parse(sessionStorage.getItem('user'));
    const user_id = sessionStorage.getItem('userid');
    const user = sessionStorage.getItem('userid');
    const role = sessionStorage.getItem('role')
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {

        axios.get(backendUrl+"/ticketsbyrole/"+role, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'authorization': 'Bearer ' + token
            }
        }).then(response => {

            const { data } = response
            setRows(data)
        })
    }, [user_id, token])


    function handleViewTicketRmDanMgmt(id) {
        console.log("handleViewTicketRmDanMgmt "+id+" "+role)
        sessionStorage.setItem('editticket_id', id);
        if(role === "RM"){
            window.location.href = "/workflowtlfe/editticketrm";
        }
        else{
            window.location.href = "/workflowtlfe/editticketmgmt";
        }
    }
    
    function handleEditTicketUser(id) {
        
        swal({
            title: "Are you sure?",
            text: "you will cancel ticket number #"+id,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              console.log(id)
              console.log(token)
              sessionStorage.setItem('editticket_id', id);
              //window.location.href = "/editticketuser";
              axios.delete(backendUrl+"/tickets/" + id, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*',
                      'authorization': 'Bearer ' + token
                  }
              }).then(response => {
      
                  const { data } = response
                  console.log(data)                  
                  window.location.href = "/workflowtlfe/listticketrmdanmgmt";
      
              })
      
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/workflowtlfe/login";
    };
    const handleListTicket = () => {
        window.location.href = "/workflowtlfe/listticketrmdanmgmt";
    };
    const numberFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        console.log(property)
        console.log(order)
        setOrderBy(property);
        };
        const stableSort = (array, comparator) => {
            const stabilizedThis = array.map((el, index) => [el, index]);
            stabilizedThis.sort((a, b) => {
              const order = comparator(a[0], b[0]);
              if (order !== 0) return order;
              return a[1] - b[1];
            });
            return stabilizedThis.map((el) => el[0]);
        };
        
        const descendingComparator = (a, b, orderBy) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];
          
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                console.log('number')
              return bValue - aValue; // Simple numerical comparison
            }
          
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                console.log('string')
              return bValue.localeCompare(aValue); // String comparison
            }
          
            // Handle cases where types might be mixed, though this is uncommon
            return 0;
        };
    
        const getComparator = (order, orderBy) => {
            return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
        };      
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        List Ticket ({user})
                    </Typography>
                    <div>
                        <IconButton onClick={handleMenu} color="inherit">
                            <Avatar src={user.avatar} />
                        </IconButton>                        
                        <Button color="inherit" onClick={handleListTicket}>List Ticket</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        <Menu id="menu-appbar"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >                            
                            <MenuItem onClick={handleListTicket}>List Ticket</MenuItem>
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'id'}
                                    direction={orderBy === 'id' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'id')}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'user_id'}
                                    direction={orderBy === 'user_id' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'user_id')}
                                >
                                    user_id
                                </TableSortLabel>                                
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'email'}
                                    direction={orderBy === 'email' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'email')}
                                >
                                    Email
                                </TableSortLabel>                                
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'custcode'}
                                    direction={orderBy === 'custcode' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'custcode')}
                                >
                                    Custcode
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'custname'}
                                    direction={orderBy === 'custname' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'custname')}
                                >
                                    Custname
                                </TableSortLabel>                                
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'tradinglimit'}
                                    direction={orderBy === 'tradinglimit' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'ApproveLimit')}
                                >
                                    Approve Limit
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'recommended_limit'}
                                    direction={orderBy === 'recommended_limit' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'recommended_limit')}
                                >
                                    Recommended Limit
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'deskripsi'}
                                    direction={orderBy === 'deskripsi' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'deskripsi')}
                                >
                                    Deskripsi Status
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'waiting_for'}
                                    direction={orderBy === 'waiting_for' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'waiting_for')}
                                >
                                    Waiting For
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'created_at'}
                                    direction={orderBy === 'created_at' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'created_at')}
                                >
                                    Created At
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                    Action
                            </TableCell>                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {stableSort(rows, getComparator(order, orderBy)).map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.user_id}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.custcode}</TableCell>
                                <TableCell>{row.custname}</TableCell>
                                <TableCell align="right">{numberFormatter.format(row.tradinglimit)}</TableCell>
                                <TableCell align="right">{numberFormatter.format(row.recommended_limit)}</TableCell>
                                <TableCell>{row.deskripsi}</TableCell>
                                <TableCell>{row.waiting_for}</TableCell>
                                <TableCell>{row.created_at}</TableCell>
                                <TableCell>
                                    <Button color="primary" variant="contained" onClick={() => handleViewTicketRmDanMgmt(row.id)}>View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}