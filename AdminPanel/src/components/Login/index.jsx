import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { database } from "../../firebase";
import { ref, set } from "firebase/database";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "", deviceId: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const myFunction = () => {
		const x = document.getElementById("myInput");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://final-year-projet-backend.onrender.com/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			localStorage.setItem("deviceId", data.deviceId);

			const userId = res.userId;
			localStorage.setItem("userId", userId);

			if (userId && data.deviceId) {
				console.log("Updating Firebase with:", { userId, deviceId: data.deviceId });
				try {
					const firebaseRef = ref(database, `users/${userId}/deviceId`);
					await set(firebaseRef, data.deviceId);
					console.log("Firebase update successful");
				} catch (firebaseError) {
					console.error("Failed to update Firebase:", firebaseError);
				}
			}

			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
							id="myInput"
						/>
						<input
							type="checkbox"
							onClick={myFunction}
							className={styles.input}
						/> Show Password
						<input
							type="text"
							placeholder="Device ID"
							name="deviceId"
							onChange={handleChange}
							value={data.deviceId}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
