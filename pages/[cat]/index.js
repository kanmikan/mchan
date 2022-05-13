import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Navbar from '../../components/Navbar';
import PostContainer from '../../components/PostContainer';
import SlideshowElement from '../../components/SlideshowElement';
import ActivityElement from '../../components/ActivityElement';

import Api from '../../server/api';
import {useRouter} from 'next/router';

const Category = (props) => {
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
				<PostContainer />
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
								<Link target="_blank" href="https://github.com/kanmikan/mchan"><a>Github</a></Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</body>
	
	)
}


//TODO: esto quedó inutilizado, mover el slidedata a su componente y eliminar lo demas.
export async function getServerSideProps(context) {
	let cat = context.query.cat;
	let homedata = await Api.getData(context.req, `/api/${cat}`);
	let slidedata = await Api.getData(context.req, `/api/slideshow/${cat}`);
	
	return {
		props: {
			boxs: homedata.data.boxs,
			cats: homedata.data.cats,
			slidedata: slidedata.data
		}
	};
}

export default Category;