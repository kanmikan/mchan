import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';
import parse from 'html-react-parser'
import utils from '../server/utils';
import Api from '../server/api';

import React, {useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostElement from '../components/PostElement';

const PostContainer = (props) => {
	const [posts, setPosts] = useState(props.boxs);
	const [hasMore, setHasMore] = useState(true);
	
	const getMorePost = async function(){
		const res = await fetch(`${Api.HOST}/api/boxs/${posts.length}`);
		const newPosts = await res.json();
		
		setPosts(function(post){
			setPosts((post) => [...posts, ...newPosts.data]);
		});
		
	};
	
	return (
			<InfiniteScroll 
				dataLength={posts.length} 
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
				endMessage={<h4>Nothing more to show</h4>}>
				
				<ul className="mainContents" id="mainContents">
					{posts.map(function(box){
						return (
							<PostElement key={box.bid} data={box}></PostElement>
						)
					})}
				</ul>
					
			</InfiniteScroll>
	)
	
}

export default PostContainer;