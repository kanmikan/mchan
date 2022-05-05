import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';
import parse from 'html-react-parser';
import utils from '../server/utils';
import React, {useState, useEffect} from 'react';

import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const SlideshowElement = (props) => {
	
	/*
	const [data, setData] = useState(null);
	useEffect(() => {
		fetch('/api/slideshow/home')
		.then((res) => res.json())
		.then((data) => {
			setData(data.data[0]);
		});
	}, []);
	*/
	
	const slideImages = [];
	props.slidedata.forEach(function(item){
		slideImages.push({
			url: item,
			caption: ''
		});
	});
	
	return (
		<div className="slide-container">
			<Slide>
				{slideImages.map((slideImage, index)=> (
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