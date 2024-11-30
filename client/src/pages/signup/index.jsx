import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();
        console.log(email, username, password, type);
    
        try {
            const response = await axios.post("http://localhost:8080/auth/signup", {
                email,
                username,
                password,
                type,
            });
            console.log(response);
            if (response.status !== 200) {
                throw new Error('Signup failed. Please try again.');
            }
    
            setMessage('Authenticating your email....');
            navigate('/verify'); // Redirect to verify email page
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Learnify Sign Up</h1>
                <div className={styles.form_container}>
                    <div className={styles.left}>
                        <img className={styles.img} src="./images/left.jpeg" alt="signup" />
                    </div>
                    <div className={styles.right}>
                        <h2 className={styles.from_heading}>Create Account</h2>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
    
                        <select
                            className={styles.dropdown}
                            value={type}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
    
                        <button onClick={handleSignup}  className={styles.btn}>
                            Sign Up
                        </button>
    
                        <p className={styles.text}>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                        <p className={styles.text}>
                            {message && <span>{message}</span>}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
