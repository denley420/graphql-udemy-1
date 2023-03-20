import React from 'react';

const LyricList = props => {
	return (
		<ul className='collection'>
			<li key='heading' className='collection-item' style={{ background: 'lightgray' }}>
				<span className=''>ID</span>
				<span className='right'>LYRIC</span>
			</li>
			{props.lyrics.map(lyric => (
				<li key={lyric.id} className='collection-item'>
					<span>{lyric.id}</span>
					<span className='right'>{lyric.content}</span>
				</li>
			))}
		</ul>
	);
};

export default LyricList;
