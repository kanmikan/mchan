import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Navbar from '../components/Navbar';
import BoxListContainer from '../components/BoxListContainer';
import SlideshowElement from '../components/SlideshowElement';
import ActivityElement from '../components/ActivityElement';

import Api from '../server/api';

const Index = (props) => {
	return (
		<body className="main">
			<div className="mainContainer" id="mainContainer">
				<div className="navbar mainNavbar">
					<Navbar />
				</div>
				<div className="mainCatsBar" id="mainCatsBar" style={{padding: "10px 5px 5px 5px"}}>
					<Link href="/">
						<a className="catElement catElementSelected"><img src="/assets/uicons/home.svg"></img></a>
					</Link>
					{props.cats.map(function(cat){
						return (
							<Link href={"/" + cat.catid} key={cat.catid}>
								<a className="catElement">&gt;{cat.catid}</a>
							</Link>
						)
					})}
				</div>
				<BoxListContainer ssr={true} data={props}/>
			</div>
			<div className="sideContainer">
				<div className="sideContainerBottom" id="sideContainerBottom">
					<div className="slideshowContainer" id="slidecontainer">
						<SlideshowElement />
					</div>
					<div className="activityContainer">
						<div className="sideTitle">Actividad Reciente</div>
						
						<ActivityElement />
						
						<div className="activityContainer">
							<div className="sideTitle sideInfo version">Usando como base -VERSION-</div>
							<div className="sideTitle sideInfo">
								<Link href="info/reglas"><a>Reglas</a></Link>
								- 
								<Link href="info/welcome"><a>Acerca de</a></Link>
								- 
								<Link target="_blank" href="https://github.com/kanmikan/c-chan"><a>Github</a></Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</body>
	
	)
}

export async function getServerSideProps({req}) {
	let homedata = await Api.getData(req, "/api/home");
	
	return {
		props: {
			boxs: homedata.data.boxs,
			cats: homedata.data.cats
		}
	};
}

export default Index;