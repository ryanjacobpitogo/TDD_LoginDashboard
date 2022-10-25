import { useState } from "react";
import "./App.css";
import Details from "./Details";

const Dashboard = ({
  records,
  totalUsers,
  user,
  setDashPage,
  currID, setCurrID,
  result, 
  setResult
}) => {
  //All local states used and passed
  const headings = ["ID", "Name", "Username", "Email", "Phone", "Action"];
  const [viewDetail, setViewDetail] = useState(false);

  //Map all table entries from people
  const listDetails = records.map((rec) => (
    <tr>
      <td>{rec.id}</td>
      <td>{rec.name}</td>
      <td>{rec.username}</td>
      <td>{rec.email}</td>
      <td>{rec.phone}</td>
      <td>
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
    <>
      <div className="navigation">
        <div className="welcome-text">
          <p>
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
        <div className="table-container">
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
    </>
  ) : 
  //if records are loading, print fetching prompt
  (
    <p>Fetching...</p>
  );
};

export default Dashboard;
