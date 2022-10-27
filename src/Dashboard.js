import { useState, useEffect } from "react";
import "./App.css";
import Details from "./Details";

const Dashboard = ({
  user,
  setDashPage,
  currID, setCurrID,
  result, 
  setResult
}) => {
  //All local states used and passed
  const headings = ["ID", "Name", "Username", "Email", "Phone", "Action"];
  const [viewDetail, setViewDetail] = useState(false);
  const [records, setRecords] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  //Data fetching from API
	const fetchData = async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/users"
	  	).then((response) => response.json());
		//
	  	setRecords(response);
	  	setTotalUsers(response.length);
	};

	useEffect(()=>{
		fetchData();	
	},[]);

  //Map all table entries from people
  const listDetails = records.map((rec) => (
    <tr role = 'list' data-testid = 'dash_list'>
      <td role = 'listitem' data-testid='dash_name'>{rec.id}</td>
      <td role = 'listitem'>{rec.name}</td>
      <td role = 'listitem'>{rec.username}</td>
      <td role = 'listitem'>{rec.email}</td>
      <td role = 'listitem'>{rec.phone}</td>
      <td role = 'listitem'>
        <button
          className="view-details-button"
          onClick={() => {
            setCurrID(rec.id - 1);
            setViewDetail(!viewDetail);
          }}
        >
          {" "}
          View Details{" "}
        </button>
      </td>
    </tr>
  ));
        
  //Map headers
  const listHeaders = headings.map((head) => <th> {head} </th>);

  const handleLogOut = () => {
    setDashPage(false);
    setResult("");
  };
  
  //Conditional rendering in checking records, if records are available, render display
  return records ? (
    <div>
      <div className="navigation">
        <div className="welcome-text">
          <p data-testid="account">
            Welcome, user <b className="username">{user.email}</b>.
            <br />
            Token: <b>{result}</b>
          </p>
        </div>
        <button 
          className="logout-button"
          onClick={handleLogOut}
          data-testid="send-logout"
        >
          Logout
        </button>
      </div>
      <div>
        <div className="table-container" data-testid="user-dashboard">
        {/* If view details flag is false, display table. Otherwise, change state and display a specific index's view data*/}
        { !viewDetail ? 
            <div>
                <h1 className="table-title">Users Dashboard</h1>
                <table>
                <tr>{listHeaders}</tr>
                {listDetails}
                </table>
                <h2 data-testid="total-users">Total Users: {totalUsers}</h2>
            </div>
          :
          <Details records={records} currID={currID} viewDetail={viewDetail} setViewDetail={setViewDetail} setCurrID={setCurrID} />
        }
        </div>
      </div>
    </div>
  ) : 
  //if records are loading, print fetching prompt
  (
    <p>Fetching...</p>
  );
};

export default Dashboard;
