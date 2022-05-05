import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';
import parse from 'html-react-parser';

import CommentElement from './CommentElement';

const CommentList = (props) => {
	return (
		<ul className="commentList" id="commentList">
			{props.coms.map(function(com){
				return (
					<CommentElement box={props.box} com={com} key={com.cid} />
				)
			})}
		</ul>
	)
}

export default CommentList;