import { Link } from "react-router-dom";

export const Navbar = () => {

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		navigate("/register");                    
	  };

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/login" onClick={handleLogout}>
						<button className="btn btn-danger">Cerrar sesión</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};