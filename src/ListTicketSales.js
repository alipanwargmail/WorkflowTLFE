import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core/';
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


export default function ListTicketSales() {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [response, setResponse] = React.useState(null);

    const open = Boolean(anchorEl);
    const token = sessionStorage.getItem('token');

    const user = sessionStorage.getItem('user_id');
    const sales_id = sessionStorage.getItem('sales_id');    
    console.log(user)
    console.log(sales_id)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {

        axios.get(backendUrl+"/listticketbysales/"+sales_id, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'authorization': 'Bearer ' + token
            }
        }).then(response => {

            const { data } = response
            setResponse(data)
        })
    }, [sales_id, token])


    function handleViewTicketNonNasabah(id) {
        sessionStorage.setItem('editticket_id', id);
        window.location.href = "/editticketsales";
    }
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user_id");
        window.location.href = "/saleslogin";
    };
    const handleListTicket = () => {
        window.location.href = "/listticketsales";
    };
    const numberFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

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
                            <TableCell>ID</TableCell>
                            <TableCell>user_id</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Custcode</TableCell>
                            <TableCell>Custname</TableCell>
                            <TableCell align="right">Approve Limit</TableCell>
                            <TableCell align="right">Recommended Limit</TableCell>
                            <TableCell>Deskripsi Status</TableCell>
                            <TableCell>Waiting For</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {response ? response.map((row) => (
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
                                    <Button color="primary" variant="contained" onClick={() => handleViewTicketNonNasabah(row.id)}>View</Button>
                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}