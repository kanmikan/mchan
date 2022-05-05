import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';
import parse from 'html-react-parser';
import utils from '../server/utils';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

const ActivityElement = (props) => {
	const router = useRouter();
	const [data, setData] = useState([]);
	
	useEffect(() => {
		fetch("/api/activity/home")
		.then((res) => res.json())
		.then((data) => {
			setData(data.data);
		});
	}, []);
	
	return (
		<ul id="activityList">
			{data.map((com, index)=> (
				<li className="comment activity" key={"act_" + index} data-bid={com.bid} data-cid={com.cid} 
					onClick={function(e){
						router.push(`/tema/${com.bid}#${com.cid}`)
					}}>
					<div className="commentAvatar">
						<div className="anonIcon activityIcon" style={{"background": com.icon.split(",")[1]}}>
							<div className={`anonText ${com.icon.split(",")[5]} activityIcon`} style={{"color": com.icon.split(",")[2]}}>
								{(com.icon.split(",")[4]) ? com.icon.split(",")[4] : "ANON"}
							</div>
						</div>
					</div>
					<div>
						<div className="activityTitle">{com.user.jerarquia.nick} ha comentado:</div>
						{com.type.includes("image") &&
							<div className="commentMedia"><img src={com.img.preview}></img></div>
							|| com.type.includes("video") &&
								<div className="commentMedia actMediaExpand"><img src={com.media.preview}></img></div>
						}
						
						<div>{(com.content.body.length > 350) ? com.content.body.substr(0, 350) + "..." : com.content.body}</div>
					</div>
				</li>
			))}
		</ul>
	)
}

export default ActivityElement;