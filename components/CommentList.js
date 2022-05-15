import Link from 'next/link';
import Image from 'next/image';
import CommentElement from './CommentElement';
import Api from '../server/api';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

const CommentList = (props) => {
	const [coms, setComs] = useState([]);
	const router = useRouter();
	const bid = router.query.bid;
	
	useEffect(() => {
		fetch(`${Api.HOST}/api/coms/${bid}`)
		.then((res) => res.json())
		.then((data) => {
			setComs(data.data);
		});
	}, []);
	
	return (
		<ul className="commentList" id="commentList">
			{coms.map(function(com){
				return (
					<CommentElement box={props.box} com={com} key={com.cid} />
				)
			})}
		</ul>
	)
}

export default CommentList;