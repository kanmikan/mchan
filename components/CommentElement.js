import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';
import utils from '../server/utils';

const CommentElement = (props) => (
	<li className="comment" id={props.com.cid}>
		<div className="commentAvatar unselect">
			<div className="anonIcon" style={{background: props.com.icon.split(",")[1]}}>
				<div className={"anonText " + props.com.icon.split(",")[5]} style={{color: props.com.icon.split(",")[2]}}>ANON</div>
			</div>
		</div>
		<div className="commentBody">
			<div className="commentMetadata">
				<div className="metadataInfo">
					<div className="metaElement op">OP</div>
					<div className="metaElement nick">Anonimo</div>
					<div className="metaElement">anon</div>
					<div className="metaElement cid pointer">{props.com.cid}</div>	
				</div>
				<div className="commentRightButtons">
					<div className="metaElement dateComment">{utils.timeSince(props.com.date.created)}</div>
					<div className="metaElement ficon pointer actionMod">
						<img className="svgIcon" src="/assets/uicons/more-vertical.svg" />
					</div>
				</div>
			</div>
			<div>
				<div className="metadataTagList">
					{props.com.content.extra.tags.map(function(tag){
						return (
							<Link href={"#" + tag} key={"#" + tag}>
								<a className="metaTag tag">&gt;&gt;{tag} {utils.isTagOp(tag, props.box, props.coms) ? "(OP)" : ""}</a>
							</Link>
						)
					})}
				</div>
			</div>
			<div className="commentContent">
				{(props.com.type.includes("image")) 
					? (<figure className="commentMedia media"><img alt="comment image" src={props.com.img.preview}></img></figure>)
					: (<></>)
				}
				<div className="contentBody">{parse(DOMPurify.sanitize(props.com.content.body))}</div>
			</div>
		</div>
	</li>
)

export default CommentElement;