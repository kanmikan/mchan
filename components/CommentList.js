import Link from 'next/link';
import Image from 'next/image';
import CommentElement from './CommentElement';
import Api from '../server/api';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';


const CommentList = (props) => {
	const [coms, setComs] = useState(props.coms);
	const [moreComs, setmoreComs] = useState((props.coms.length < 10) ? false : true);
	
	const router = useRouter();
	const bid = router.query.bid;
	
	const getMoreComs = async function(){
		const res = await fetch(`${Api.HOST}/api/coms/${bid}/${coms.length}/10`);
		const newComs = await res.json();
		if (newComs.data[0]){
			setmoreComs((newComs.data.length < 10 ? false : true));
			setComs(function(com){
				setComs((com) => [...coms, ...newComs.data]);
			});
		} else {
			setmoreComs(false);
		}
	};
	
	const loadAllgoDown = async function(e){
		const res = await fetch(`${Api.HOST}/api/coms/${bid}/${coms.length}/all`);
		const allComs = await res.json();
		setComs(function(com){
			setComs((com) => [...coms, ...allComs.data]);
		});
		window.scrollTo(0, document.getElementById("commentList").scrollHeight);
	}
	
	return (
	<>
		<div className="contentTitle">
			<div className="leftTools">
				<div className="catElement" id="goComment">
					<img src="/assets/uicons/message-square.svg"></img>
				</div>
				<div className="catElement" id="autoLoad">
					<img src="/assets/uicons/radio.svg"></img>
				</div>
			</div>
						
			<span>
				<span id="commentsTitle">Comentarios</span> (<span id="commentCounter">0</span>)
			</span>
						
			<div className="rightTools">
				<div className="catElement" id="postFiles">
					<img src="/assets/uicons/folder.svg"></img>
				</div>
				<div className="catElement" id="goDown" onClick={loadAllgoDown}>
					<img src="/assets/uicons/arrow-down.svg"></img>
				</div>
			</div>
		</div>
		
		<InfiniteScroll dataLength={(coms) ? coms.length : 0} next={getMoreComs} hasMore={moreComs} scrollThreshold={0.99}
			loader={
				<span>Cargando mas...</span>
			} 
			endMessage={
				<span></span>
			}>	
			<ul className="commentList" id="commentList">
				{
					(coms) && coms.map(function(com){
						return (<CommentElement box={props.box} com={com} key={com.cid} />)
					})
				}
			</ul>
		</InfiniteScroll>
	</>
	)
}

export default CommentList;