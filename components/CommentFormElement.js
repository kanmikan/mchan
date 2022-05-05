import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';
import parse from 'html-react-parser';
import utils from '../server/utils';

const CommentFormElement = (props) => (
	<form className="commentWriteBox" id="commentForm" onSubmit={props.onSubmit}>
		<input type="hidden" name="bid" value={props.box.bid} />
		<input type="hidden" name="img" id="cimg" value="" />
		<input type="hidden" name="vid" id="cvid" value="" />
		
		<div className="closeButton" id="closeCommentBox">
			<span aria-hidden="true">x</span>
		</div>
	
		<div style={{display: "flex"}}>
			<div id="commentAttachPreview" className="commentAttachPreview hidden">
				<div id="attachImageClose" className="attachImageClose">x</div>
				<img id="attachImage" className="attachImage" src="/assets/logo.png"></img>
			</div>
			<div style={{width: "100%"}}>
				
				<input className="hidden" name="file" type="file" id="cfile" accept="image/gif, image/jpeg, image/jpg, image/png, video/webm, video/mp4" />
				<textarea className="commentArea" name="content" id="commentTextarea" maxLength="3000" placeholder="Escribe un comentario o arrastra una imagen..."></textarea>
				<div className="commentTools">
					<div className="horizontalTools">
						
						<div className="commentButton" onClick={selectFile}>
							<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
								<polyline points="17 8 12 3 7 8"></polyline>
								<line x1="12" y1="3" x2="12" y2="15"></line>
							</svg>
						</div>
						
						<input className="field hidden" style={{width: "100%"}} type="text" name="curl" id="curl" placeholder="Pega un link de youtube, video o imagen..." />
						<div className="commentButton" onClick={selectLink} id="linkButton">
							<img id="clinkUnselect" src="/assets/uicons/link.svg"></img>
							<img id="clinkSelect" className="hidden" src="/assets/uicons/check.svg"></img>
						</div>
						
					</div>
					<button className="commentButton commentSend" id="commentSend">
						<span id="commentButtonText">Comentar</span>
						<i id="sendComIcon" className="fas fa-circle-notch fa-spin hidden"></i>
					</button>
				</div>
			
			</div>
		</div>
	</form>
)

async function selectFile(e){
	console.log("file!");
	document.getElementById("cfile").click();
}

async function selectLink(e){
	console.log("Link!");
	document.getElementById("curl").classList.toggle("hidden");
}

export default CommentFormElement;