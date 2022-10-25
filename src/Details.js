import "./App.css";

const Details = ({ records, currID, viewDetail, setViewDetail, setCurrID}) => {
  //Return view data display and back button with logic to change viewDetail state
  return (
    <div className="user-info-container">
      <div className="user-container-name">{records[currID].username}</div>
      <div className="user-container-image">
        <div>
          <img
            className="user-image"
            src=".\images\tdduser.png"
            alt="user img"
          />
        </div>
      </div>
      <table className="user-info-table">
        <tr>
          <td>User ID:</td>
          <td>{records[currID].id}</td>
        </tr>
        <tr>
          <td>User Name:</td>
          <td>{records[currID].name}</td>
        </tr>
        <tr>
          <td>User Address:</td>
          <td>{`${records[currID].address.street} ${records[currID].address.suite}
                    ${records[currID].address.city} ${records[currID].address.zipcode}`}</td>
        </tr>
        <tr>
          <td>User Company:</td>
          <td>{records[currID].company.name}</td>
        </tr>
      </table>
      <button className="back-button" onClick={() => setViewDetail(!viewDetail)}>
        Back to table
      </button>
    </div>
  );
}

export default Details;
