import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';
import parse from 'html-react-parser';
import utils from '../server/utils';
import Api from '../server/api';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

const SlideshowElement = (props) => {
	
	const router = useRouter();
	let cat = (router.query.cat) ? router.query.cat : "home";
	const [data, setData] = useState([]);
	
	useEffect(() => {
		fetch(`${Api.HOST}/api/slideshow/${cat}`)
		.then((res) => res.json())
		.then((data) => {
			
			let slideImages = [];
			data.data.map(function(item){
				slideImages.push({
					url: item,
					caption: ''
				});
			});
			//console.log(slideImages);
			setData(slideImages);
		});
	}, [router.asPath]);
	
	return (
		<div className="slide-container">
			<Slide>
				{data.map((slideImage, index)=> (
					<div className="each-slide" style={{"height": "200px"}} key={index}>
						<div style={{
							"backgroundImage": `url(${slideImage.url})`, 
							"height": "100%", 
							"backgroundSize": "contain",
							"backgroundPosition": "center",
							"backgroundRepeat": "no-repeat"
							}}>
							<span>{slideImage.caption}</span>
						</div>
					</div>
				))} 
			</Slide>
		</div>
	)
}

export default SlideshowElement;