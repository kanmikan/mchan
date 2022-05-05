import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';
import parse from 'html-react-parser';
import utils from '../server/utils';

const PostElement = (props) => (
	<li>
		<Link href={`/${props.data.cat}/${props.data.bid}`}>
			<a className="post" style={{background: `url(${props.data.img.preview}) center, url(/assets/placeholder.png)`, backgroundSize: "cover"}}>
				<div className="icons">
					{typeIcons(props.data.type, props.data.flag, props.data.date)}
				</div>
				<div className="data">
					<h1 className="title">{props.data.content.title}</h1>
					<h1 className="info txtpreview">
						{splitPreview(props.data.content.body)}
					</h1>
					<h1 className="info">
						{props.data.content.comments} Comentarios - Hace {utils.timeSince(props.data.date.created, 1)}
					</h1>
				</div>
			</a>
		</Link>
	</li>
)

function typeIcons(type, flag, date){
	let icons = "";
	if (type.includes("image") && !type.includes("post")){
		icons += `<Image alt="Imagen" className="imgIcon" src="/assets/uicons/image.svg" />`;
	}
	if (type.includes("video")){
		icons += `<Image alt="Video" className="imgIcon" src="/assets/uicons/film.svg" />`;
	}
	if (flag.includes("sync")){
		icons += `<Image alt="Video Sincronizado" className="imgIcon" src="/assets/uicons/refresh-cw.svg" />`;
	}
	if (type.includes("post")){
		icons += `<Image alt="Post Multimedia" className="imgIcon" src="/assets/uicons/file-text.svg" />`;
	}
	if (type.includes("poll")){
		icons += `<Image alt="Encuestas" className="imgIcon" src="/assets/uicons/bar-chart-2.svg" />`;
	}
	if (type.includes("idunico")){
		icons += `<Image alt="IDUnico" className="imgIcon" src="/assets/uicons/user.svg" />`;
	}
	if (type.includes("dice")){
		icons += `<Image alt="Dados" className="imgIcon" src="/assets/uicons/dice.svg" />`;
	}
	if (date.sticky > 0){
		icons += `<Image alt="BookMark" className="imgIcon" src="/assets/uicons/bookmark.svg" />`;
	}
	if (date.csticky > 0){
		icons += `<Image alt="Paperclip" className="imgIcon" src="/assets/uicons/paperclip.svg" />`;
	}
	return parse(icons);
}

function splitPreview(contentBody){
	let cbody = contentBody.replace(/<\/?[^>]+(>|$)/g, " ");
	return (cbody.length > 50) ? cbody.substr(0, 50) + "..." : cbody;
}

export default PostElement;