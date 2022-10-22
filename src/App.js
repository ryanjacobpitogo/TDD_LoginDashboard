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
				<button onClick = {() => {
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
				<div>
					<div>{records[currID].id}</div>
					<div>{records[currID].name}</div>
					<div>{`${records[currID].address.street} ${records[currID].address.suite} ${records[currID].address.city} ${records[currID].address.zipcode}`}</div>
					<div>{records[currID].company.name}</div>
					<button onClick = {() => setViewDetail(false)}>Back to table</button>
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
				<div class="login-container">
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
						<div>
							<p>
								Welcome, {user.email}.
								<br/>
								Token: {result}
							</p>
						</div>
						<button onClick = {handleLogOut}>
							Logout
						</button>
					</div>
					<div class="table-container">
					<h1>Table</h1>
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