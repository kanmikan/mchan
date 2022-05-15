import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Navbar from '../../components/Navbar';
import BoxListContainer from '../../components/BoxListContainer';
import SlideshowElement from '../../components/SlideshowElement';
import ActivityElement from '../../components/ActivityElement';

import Api from '../../server/api';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

const Category = (props) => {
	
	const router = useRouter();
	const cat = (router.query.cat) ? router.query.cat : "home";
	const [data, setData] = useState(props.data);
	
	useEffect(() => {
		fetch(`${Api.HOST}/api/cat/${cat}`)
		.then((res) => res.json())
		.then((data) => {
			setData(data.data);
		});		
	}, [router.asPath]);
	
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
					{data.cats.map(function(cat){
						return (
							<Link href={"/" + cat.catid} key={cat.catid}>
								<a className={`catElement ${(data.category && data.category.catid === cat.catid) ? "catElementSelected" : ""}`}>&gt;{cat.catid}</a>
							</Link>
						)
					})}
				</div>
				<BoxListContainer ssr={false} data={null} />
			</div>
			<div className="sideContainer">
				<div className="sideContainerBottom" id="sideContainerBottom">
					<div className="categoryInfoContainer containerMain">
						<div className="categoryInfoContainer">
							<div className="categoryInfoImage">
								<img src={data.category.content.media.icon} />
							</div>
							<div className="categoryInfoDescription">
								<h1>{data.category.content.name}</h1>
								<h2>{data.category.content.description}</h2>
							</div>
						</div>
						<div className="categoryInfoButtons">
							<div className="mainButton catElementSelected categoryInfoButton categoryHide " data-catid="rss">
								<span>Ocultar de la home</span>
							</div>
						</div>
					</div>
				
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

//obtiene
export async function getServerSideProps(context) {
	let cat = context.query.cat;
	let catdata = await Api.getData(context.req, `/api/cat/${cat}`);
	
	return {
		props: {
			data: catdata.data
		}
	};
}

export default Category;