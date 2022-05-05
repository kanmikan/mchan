import Link from 'next/link';

const Navbar = () => (
	<nav className="navbar">
		<Link href="/">
			<a className="navbarHome">
				<img className="logo" src="/assets/logo.png"/>
				<span className="text">Mchan</span>
			</a>
		</Link>
				
		<ul className="navbarmenu">
			<li>
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</li>
				
			<li className="dropdown">
				<div className="notifCountContainer">
					<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
					</svg>
					<span className="notifCount">0</span>
				</div>
			</li>		
						
			<Link href="/new">
				<li>
					<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
					</svg>
				</li>
			</Link>
						
			<li>
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				</svg>
			</li>
		</ul>
	</nav>
)

export default Navbar;