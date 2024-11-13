import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import CreateTicket from './CreateTicket';
import ListTicketUser from './ListTicketUser';
import ViewTicketUser from './ViewTicketUser';
import TestChart from './TestChart';
import LoginNasabah from './LoginNasabah'
import LoginNonNasabah from './LoginNonNasabah'
import ListTicketNonNasabah from './ListTicketNonNasabah'
import EditTicketNonNasabah from './EditTicketNonNasabah'
import EditTicketSales from './EditTicketSales';
import ListTicketAdmin from './ListTicketAdmin'
import ViewTicketAdmin from './ViewTicketAdmin'
import ListTicketRmDanMgmt from './ListTicketRmDanMgmt';
import EditTicketRM from './EditTicketRM'
import EditTicketMGMT from './EditTicketMGMT';
import LoginSales from './LoginSales';
import ListTicketSales from './ListTicketSales';
import FollowLink from './FollowLink';
import HistoryTicketSales from './HistoryTicketSales';
import ViewHistoryTicketSales from './ViewHistoryTicketSales';
import HistoryTicketNonNasabah from './HistoryTicketNonNasabah';
import ViewHistoryTicketNonNasabah from './ViewHistoryTicketNonNasabah';
import HistoryTicketRm from './HistoryTicketRm';
import ViewHistoryTicketRm from './ViewHistoryTicketRm';
import HistoryTicketMgmt from './HistoryTicketMgmt';
import ViewHistoryTicketMgmt from './ViewHistoryTicketMgmt';
import ComingSoon from './ComingSoon';
import CreateTicketSales from './CreateTicketSales';

function App() {

  return (
    <div className="wrapper">      
        <Routes>
          <Route exac path="/" element={<ComingSoon />}></Route>
          <Route exac path="/login" element={<LoginNonNasabah />}></Route>
          <Route exac path="/saleslogin" element={<LoginSales />}></Route>
          <Route exac path="/createticket" element={<CreateTicket />}></Route>
          <Route exac path="/createticketsales" element={<CreateTicketSales />}></Route>
          <Route exac path="/viewticketuser" element={<ViewTicketUser />}></Route>
          <Route exac path="/listticketuser" element={<ListTicketUser />}></Route>
          <Route exac path="/editticketnonnasabah" element={<EditTicketNonNasabah />}></Route>
          <Route exac path="/editticketsales" element={<EditTicketSales />}></Route>
          <Route exac path="/editticketrm" element={<EditTicketRM />}></Route>
          <Route exac path="/editticketmgmt" element={<EditTicketMGMT />}></Route>
          <Route exac path="/listticketnonnasabah" element={<ListTicketNonNasabah />}></Route>
          <Route exac path="/listticketadmin" element={<ListTicketAdmin />}></Route>
          <Route exac path="/listticketsales" element={<ListTicketSales />}></Route>
          <Route exac path="/listticketrmdanmgmt" element={<ListTicketRmDanMgmt />}></Route>
          <Route exac path="/viewticketadmin" element={<ViewTicketAdmin />}></Route>
          <Route exac path="/testchart" element={<TestChart />}></Route>
          <Route exac path="/followlink/:token" element={<FollowLink />}></Route>
          <Route exac path="/historyticketsales" element={<HistoryTicketSales />}></Route>
          <Route exac path="/viewhistoryticketsales" element={<ViewHistoryTicketSales />}></Route>
          <Route exac path="/historyticketnonnasabah" element={<HistoryTicketNonNasabah />}></Route>
          <Route exac path="/viewhistoryticketnonnasabah" element={<ViewHistoryTicketNonNasabah />}></Route>
          <Route exac path="/historyticketrm" element={<HistoryTicketRm />}></Route>
          <Route exac path="/viewhistoryticketrm" element={<ViewHistoryTicketRm />}></Route>
          <Route exac path="/historyticketmgmt" element={<HistoryTicketMgmt />}></Route>
          <Route exac path="/viewhistoryticketmgmt" element={<ViewHistoryTicketMgmt />}></Route>
        </Routes>
    </div>
  );
}

export default App;