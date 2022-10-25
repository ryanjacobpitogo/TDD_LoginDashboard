import { useState , useEffect} from "react";
import './App.css';
import Dashboard from './Dashboard'

const Login = () => {
	//All local states used and passed
	const [records, setRecords] = useState([]);
	const [result, setResult] = useState('');
	const [totalUsers, setTotalUsers] = useState(0);
	const [dashPage, setDashPage] = useState(false);
	const [currID, setCurrID] = useState(1);
	const [user, setUser] = useState({
		email: '',
		password: ''
	});

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

	//On change value for dynamic text rendering
	const onChange = (evt) => {
		const value = evt.target.value;
		const name = evt.target.name;
		setUser({
			...user,
			[name]: value
		});
	};

	//console prompt for login
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
				setDashPage(true);
		  	}else{
		  		setResult('Error login. Please verify.')
		  	}
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	};

	//Handlers for buttons
	const handleUserLogin = () => {
		sendLogin(user);
	};


	//Conditional rendering for Log-in and Dashboard
	//Checks if dashboard page is rendered (boolean)
	return !dashPage ? (
			<div className="login-design">
				<div className="login-image-container">
					<img className="login-image" src=".\images\vector tdd.png" alt="vector img"/>
				</div>
				<div>
					<h1 className="login-title">
					WELCOME <br/> TO TDD!
					</h1>
					<p className="login-subtitle">Start your journey with us.</p>
					<div className="login-input">					
					<label htmlFor="income">Enter Email</label>
					<br />
					<input
						className="login-user-input" 
						type="text"
						onChange={onChange}
						data-testid="email"
						name="email"
					/>
					<br />
					<label htmlFor="tax">Enter Password</label>
					<br />
					<input 
						className="login-user-input"
						type="password"
						onChange={onChange}
						data-testid="password"
						name="password"
					/>
					<br/>
					<button
						className="login-button"
						onClick={handleUserLogin} 
						data-testid="send-user-login"
					>
						Login
					</button>
					</div>
				</div>
			</div>
		)
	 :
	 //Launches the dashboard file
	<Dashboard records={records} totalUsers={totalUsers} user={user} setDashPage={setDashPage} currID={currID} setCurrID={setCurrID} result={result} setResult={setResult}/>
};

export default Login;