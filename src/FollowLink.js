import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Grid, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: '70ch',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        minWidth: '30ch',
    },
    historybutton: {
        margin: theme.spacing(1),
        minWidth: '70ch',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    tableContainer: {
        maxHeight: '20vh',
        overflow: 'auto',
    },
    tableHeader: {
        position: 'sticky',
        top: 0,
        zIndex: 1, // Ensures the header is above other elements
        backgroundColor: '#f5f5f5', // Customize the background color if needed
    },
}));


export default function FollowLink() {
    const { token } = useParams();
    const [message, setMessage] = useState('Checking token...');

    const classes = useStyles();
    useEffect(() => {
        const confirmEmail = async () => {
            try {
                console.log(`${backendUrl}/followlink/${token}`)
                const response = await axios.get(`${backendUrl}/followlink/${token}`);
                
                console.log(response.data['result'])
                if(response.data['result'] === "OK"){
                console.log(response.data['role'])
                if (response.data['role'] === "SALES") {
                    sessionStorage.setItem('token', response.data['token']);
                    sessionStorage.setItem('user_id', response.data['user_id']);
                    sessionStorage.setItem('role', response.data['role']);
                    sessionStorage.setItem('email', response.data['email_address']);
                    sessionStorage.setItem('user_name', response.data['user_name']);
                    sessionStorage.setItem('sales_id', response.data['sales_id']);
                    sessionStorage.setItem('editticket_id', response.data['ticketid']);
                    sessionStorage.setItem('refftoken', response.data['refftoken']);                    
                    window.location.href = "/workflowtlfe/editticketsales";
                    
                }
                else if (response.data['role'] === "HEADEQRETAIL") {
                    sessionStorage.setItem('token', response.data['token']);
                    sessionStorage.setItem('userid', response.data['userid']);
                    sessionStorage.setItem('role', response.data['role']);
                    sessionStorage.setItem('email', response.data['email']);
                    sessionStorage.setItem('username', response.data['username']);
                    sessionStorage.setItem('editticket_id', response.data['ticketid']);
                    sessionStorage.setItem('refftoken', response.data['refftoken']);
                    window.location.href = "/workflowtlfe/editticketnonnasabah";
                }
                else if (response.data['role'] === "RM") {
                    sessionStorage.setItem('token', response.data['token']);
                    sessionStorage.setItem('userid', response.data['userid']);
                    sessionStorage.setItem('role', response.data['role']);
                    sessionStorage.setItem('email', response.data['email']);
                    sessionStorage.setItem('username', response.data['username']);
                    sessionStorage.setItem('editticket_id', response.data['ticketid']);
                    sessionStorage.setItem('refftoken', response.data['refftoken']);
                    window.location.href = "/workflowtlfe/editticketrm";
                }
                else if (response.data['role'] === "MGMT"){
                    sessionStorage.setItem('token', response.data['token']);
                    sessionStorage.setItem('userid', response.data['userid']);
                    sessionStorage.setItem('role', response.data['role']);
                    sessionStorage.setItem('email', response.data['email']);
                    sessionStorage.setItem('username', response.data['username']);
                    sessionStorage.setItem('editticket_id', response.data['ticketid']);
                    sessionStorage.setItem('refftoken', response.data['refftoken']);
                    window.location.href = "/workflowtlfe/editticketmgmt";
                }}

                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error confirming email');
            }
        };

        confirmEmail();
    }, [token]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
            </AppBar>
            <Grid item xs={12}>
          <Box component="span" display="block" border={1}>
            <div>
              <TextField
                id="filled-message"
                label="Message"
                value={message}
                variant="filled"                
              />
            </div>
          </Box>
        </Grid>

        </div >
    );
}
