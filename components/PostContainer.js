import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';
import Api from '../server/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostElement from '../components/PostElement';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

const PostContainer = (props) => {
	const router = useRouter();
	let cat = (router.query.cat) ? router.query.cat : "home";
	const [posts, setPosts] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	
	//Carga inicial
	useEffect(() => {
		fetch(`${Api.HOST}/api/${cat}`)
		.then((res) => res.json())
		.then((data) => {
			setPosts(data.data.boxs);
			console.log(data.data.boxs.length);
			setHasMore((data.data.boxs.length < 41) ? false : true);
		});
	}, [router.asPath]);
	
	
	//Paginacion
	//TODO adaptar api a paginacion por categorias.
	const getMorePost = async function(){
		setHasMore(true);
		const res = await fetch(`${Api.HOST}/api/boxs/${posts.length}`);
		const newPosts = await res.json();
		console.log(newPosts);
		if (newPosts.data[0]){
			/*
			setPosts(function(post){
				setPosts((post) => [...posts, ...newPosts.data]);
			});
			*/
		} else {
			setHasMore(false);
		}
	};
	
	return (
			<InfiniteScroll 
				dataLength={(posts) ? posts.length : 0}
				next={getMorePost} 
				hasMore={hasMore}
				scrollThreshold={0.99}
				loader={
					<div className="newPostAlertContainer loadMoreContainer" id="loadMoreContainer">
						<div className="newPostAlert">
							<span>Cargando mas...</span>
						</div>
					</div>
				} 
				endMessage={
					<div className="newPostAlertContainer loadMoreContainer" id="loadMoreContainer">
						<div className="endListAlert">
							<span>Llegaste al final</span>
						</div>
					</div>
				}>
				
				<ul className="mainContents" id="mainContents">
					{
						(posts) && posts.map(function(box){
							return (
								<PostElement key={box.bid} data={box}></PostElement>
							)
						})
					}
				</ul>
					
			</InfiniteScroll>
	)
	
}

export default PostContainer;