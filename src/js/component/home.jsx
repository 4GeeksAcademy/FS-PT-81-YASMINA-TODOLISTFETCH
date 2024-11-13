import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";


//create your first component
const Home = () => {

	const url = 'https://playground.4geeks.com/todo';
	const [username, setUsername] = useState('frqmx');
	const [task, setTask] = useState('');
	const [userData, setUserData] = useState({});




	const getDataAsync = async () => {
		try {
			const resp = await fetch(url + '/users/' + username);
			if (resp.status==404) return createUser('something went wrong')
			if (!resp.ok) throw new Error('something went wrong')
			const data = await resp.json();
			setUserData(data)
		} catch (error) {
			console.error(error)

		}

	}

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const resp = await fetch(url + '/todos/' + username, {
				method: 'POST',
				headers: {
					'content-Type': 'application/json'
				},
				body: JSON.stringify({
					label: task,
					is_done: false
				})
			});

			if (!resp.ok) throw new Error('something went wrong adding task')
			const data = await resp.json();
			getDataAsync();
			setTask('')
		} catch (error) {
			console.error(error);

		}

	}
	const createUser = async () => {
		try {
			const resp = await fetch(url + '/users/' + username, {
				method: 'POST',
				headers: {
					'content-Type': 'application/json'
				},

			});

			if (!resp.ok) throw new Error('something went wrong adding task');
			getDataAsync();
		} catch (error) {
			console.error(error);

		}


	}
	const handleDelete = async (todo_id) => {
		try {
			const resp = await fetch(url + '/todos/' + todo_id, {
				method: 'DELETE',
			});
			if (!resp.ok) throw new Error('something went wrong adding task');
			getDataAsync();
		} catch (error) {
			console.error(error);

		}
	}


	useEffect(() => {
		getDataAsync()
	}, [])

	return (
		<div className="container">
			<div className="flower-headding">
				<h1 className="tools" >TOOLS</h1>
				<img className="flower" src="https://img.freepik.com/fotos-premium/primer-plano-flores-rosadas-contra-fondo-blanco_1048944-20536012.jpg?w=1380" alt="flores" />

				<div className="wrapper">
					<form onSubmit={handleSubmit}>
						<input className="placetool" type="text" onChange={e => setTask(e.target.value)} 
						value={task} placeholder="Add a new tool" 
						/>
					</form>
					<ul>
					{userData.todos?.map(el => <li className="text-item" key={el.id}>{el.label} 
						-------------<span className="imcross" onClick={() => handleDelete(el.id)}><ImCross /></span>
					 </li>	)}				 
					</ul>
				</div>
			</div>
		</div>
	);
};



export default Home;
