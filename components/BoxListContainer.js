import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';
import Api from '../server/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import BoxElement from '../components/BoxElement';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

const BoxListContainer = (props) => {
	const router = useRouter();
	const cat = (router.query.cat) ? router.query.cat : "home";
	
	const [posts, setPosts] = useState((props.ssr) ? props.data.boxs : []);
	const [hasMore, setHasMore] = useState(false);
	
	//actualizar datos al cambiar el path en el cliente.
	useEffect(() => {
		fetch(`${Api.HOST}/api/boxs/${cat}`)
		.then((res) => res.json())
		.then((data) => {
			setPosts(data.data);
			setHasMore((data.data.length < 41) ? false : true);
		});
	}, [router.asPath]);
	
	//paginacion
	//TODO adaptar api a paginacion por categorias.
	const getMorePost = async function(){
		const res = await fetch(`${Api.HOST}/api/boxs/${cat}/${posts.length}`);
		const newPosts = await res.json();
		if (newPosts.data[0]){
			setHasMore((newPosts.data.length < 21 ? false : true));
			setPosts(function(post){
				setPosts((post) => [...posts, ...newPosts.data]);
			});
		} else {
			setHasMore(false);
		}
	};
	
	return (
		<InfiniteScroll dataLength={(posts) ? posts.length : 0} next={getMorePost} hasMore={hasMore} scrollThreshold={0.99}
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
						return (<BoxElement key={box.bid} data={box}></BoxElement>)
					})
				}
			</ul>
		</InfiniteScroll>
	)
	
}

export default BoxListContainer;