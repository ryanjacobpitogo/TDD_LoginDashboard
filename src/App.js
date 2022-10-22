import { useState , useEffect} from "react";
import './App.css';

const Login = () => {

	const [records, setRecords] = useState([]);
	const headings = ['ID', 'Name', 'Username', 'Email', 'Phone', 'Action'];
	const [totalUsers, setTotalUsers] = useState(0);
	const [result, setResult] = useState('');
	const [page, setPage] = useState(false);
	const [currID, setCurrID] = useState(1);
	const [viewDetail, setViewDetail] = useState(false);

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

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const onChange = (evt) => {
		const value = evt.target.value;
		const name = evt.target.name;
		setUser({
			...user,
			[name]: value
		});
	};

	const sendLogin = async (user) => {
		console.log(user);

		const url = 'https://reqres.in/api/login';
		const params = {
			"email": user.email,
			"password": user.password
		}

		fetch(url, {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(params),
		})
		.then((response) => response.json())
		.then((data) => {
		  	if(data && data.token) {
		  		setResult(data.token);
				setPage(true);
		  	}else{
		  		setResult('Error login. Please verify.')
		  	}
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	};

	const handleUserLogin = () => {
		sendLogin(user);
	};

	const handleLogOut = () => {
		setPage(false);
		setResult('');
	}


	const listDetails = records.map(rec => 
		<tr>
			<td>{rec.id}</td>
			<td>{rec.name}</td>
			<td>{rec.username}</td>
			<td>{rec.email}</td>
			<td>{rec.phone}</td>
			<td>
				<button class="view-details-button" onClick = {() => {
					setCurrID(rec.id-1);
					setViewDetail(true);
					}
				}> View Details </button>
			</td> 
		</tr>
	);
	const listHeaders = headings.map(head =>
		<th> {head} </th>
	);
	
	function ViewDeets () {
		if(!viewDetail){
			return(
			<div>
				<h1 class="table-title">Users Dashboard</h1>
				<table>
					<tr>
					{listHeaders}
					</tr>
					{listDetails}
				</table>
				<h2 data-testid="total-users">Total Users: {totalUsers}</h2>
			</div>
			);
		}
		else{
			return(
				<div class="user-info-container">
					<div class="user-container-name">
						{records[currID].username}
					</div>
					<div class="user-container-image">
						<div>
							<img class="user-image" src=".\images\tdduser.png" alt="user img"/>
						</div>

					</div>
					<table class="user-info-table">
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
					<button class="back-button" onClick = {() => setViewDetail(false)}>Back to table</button>
				</div>
			);
		}
	}


	if(!page) {
		return(
			<div class="login-design">
				<div class="login-image-container">
					<img class="login-image" src=".\images\vector tdd.png" alt="vector img"/>
				</div>
				<div>
					<h1 class="login-title">
					WELCOME <br/> TO TDD!
					</h1>
					<p class="login-subtitle">Start your journey with us.</p>
					<div class="login-input">					
					<label htmlFor="income">Enter Email</label>
					<br />
					<input
						class="login-user-input" 
						type="text"
						onChange={onChange}
						data-testid="email"
						name="email"
					/>
					<br />
					<label htmlFor="tax">Enter Password</label>
					<br />
					<input 
						class="login-user-input"
						type="password"
						onChange={onChange}
						data-testid="password"
						name="password"
					/>
					<br/>
					<button
						class="login-button"
						onClick={handleUserLogin} 
						data-testid="send-user-login"
					>
						Login
					</button>
					</div>
				</div>
			</div>
		)
	}else{
		return(
			records ? (
				<>
					<div class="navigation">
						<div class="welcome-text">
							<p>
								Welcome, user <b class="username">{user.email}</b>.
								<br/>
								Token: <b>{result}</b>
							</p>
						</div>
						<button class="logout-button" onClick = {handleLogOut}>
							Logout
						</button>
					</div>
					<div class="table-container">
					<ViewDeets />
					</div>
				</>
			): (
				<p>Fetching...</p>
			)		
		);
	}
};

export default Login;