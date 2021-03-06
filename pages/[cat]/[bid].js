import Link from 'next/link';
import {useRouter} from 'next/router';
import fetch from 'isomorphic-unfetch';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import {useState, useEffect} from 'react';

import utils from '../../server/utils';
import Api from '../../server/api';
import Navbar from '../../components/Navbar';
import CommentFormElement from '../../components/CommentFormElement';
import CommentList from '../../components/CommentList';

import {useAppContext, setAppContext} from '../../server/context';

const PostView = (props) => {
	
	const [coms, setComments] = useState(props.coms);
	const onSubmitHandler = async(e) => {
		e.preventDefault();
		
		//post enviando los datos.
		let data = {
			bid: e.target.bid.value,
			img: e.target.img.value,
			vid: e.target.vid.value,
			content: e.target.content.value
		}
		const response = await fetch('/api/new/com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		});
		const result = await response.json();
		if (result.success){
			setComments(oldcoms => [result.data, ...oldcoms]);
			//reset de form primitivo
			e.target.content.value = "";
		}
	}
	
	return (
		<body className="main">
			<div className="mainContainer mainContainerPost mainfixedView" id="mainContainer">
				<div className="navbar mainNavbar mainNavbarPost">
					<Navbar />
				</div>
				
				<div className="mainCatsBar toolsBar" id="mainCatsBar">
					<Link href="/">
						<a className="catElement catElementSelected"><img src="/assets/uicons/home.svg"></img></a>
					</Link>
					
					<div className="catElement" id="postActionFlag">
						<img src="/assets/uicons/flag.svg"></img>
						<span className="catElementTitle">Denunciar</span>
					</div>
					
					<div className="catElement" id="postActionFollow">
						<img src="/assets/uicons/eye.svg"></img>
						<span className="catElementTitle">Seguir</span>
					</div>
					
					<div className="catElement" id="postActionFav">
						<img src="/assets/uicons/star.svg"></img>
						<span className="catElementTitle">Favorito</span>
					</div>
					
					<div className="catElement" id="postActionHide">
						<img src="/assets/uicons/eye-off.svg"></img>
						<span className="catElementTitle">Ocultar</span>
					</div>
					
					<span style={{marginLeft: "auto"}}></span>
					
					<div className="catElement catIcon">
						<img src={(props.category) ? props.category.content.media.icon : "/assets/logo.png"}></img>
						<span>
							<Link href={(props.category) ? props.category.catid : "/"}>
								<a>{(props.category) ? props.category.content.name : "Unknown"}</a>
							</Link>
						</span>
					</div>
				</div>
				
				<div className="mainPostMetadata">
					<div className="metaElement op">OP</div>
					<div className="metaElement nick">{(props.box.user.jerarquia) ? props.box.user.jerarquia.nick : "Anonimo"}</div>
					<div className="metaElement">{(props.box.user.jerarquia) ? props.box.user.jerarquia.rango : "anon"}</div>
					<div className="metaElement type">
						-iconos-
					</div>
					<div className="metaElement date">{utils.timeSince(props.box.date.created)}</div>
				</div>
				
				<article className="mainPostContent" itemScope="itemscope" itemType="http://schema.org/NewsArticle">
					<div className="mainPostMediaContainer">
						<div className="mainPostImage media">
							<img alt="postImage" src={(props.box.img) ? props.box.img.preview : "/assets/logo.png"}></img>
						</div>
					</div>
					<header className="mainPostInfo">
						<h1 className="mainPostTitle" itemProp="name">{DOMPurify.sanitize((props.box.content) ? props.box.content.title : "Titulo")}</h1>
						<div className="mainPostBody" itemProp="articleBody">{parse(DOMPurify.sanitize((props.box.content) ? props.box.content.body : "Body"))}</div>
					</header>
				</article>
			</div>
			
			<div className="sideContainer sideContainerPost sideView">
				<div className="sideContainerBottom sideContainerBottomPost">
					
					<CommentFormElement box={props.box} onSubmit={onSubmitHandler}/>
					

					
					<CommentList box={props.box} coms={props.coms}/>
					
				</div>
				
			</div>
		</body>
	
	)
}

export async function getServerSideProps(context) {
	const empty = {props: {category: {}, box: {}, coms: []}};
	
	if (context.query.cat === "uploads"){
		return empty;
	} else {
		let response = await Api.getData(context.req, `/api/box/${context.query.cat}/${context.query.bid}`);
		if (response.success){
			return {
				props: {
					category: (response.data.category) ? response.data.category : null,
					box: response.data.box,
					coms: response.data.coms
				}
			}
		} else {
			return empty;
		}
	}
}

export default PostView;