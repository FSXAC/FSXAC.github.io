const MY_FACTS = [
	'Likes video game music.',
	'Paid CHF 50.00 for the typeface used on this website.',
	'Been playing Minecraft since 2010.',
	'Used to make Let\'s play videos on YouTube.',
	'Silver Elite Master on competitive CSGO (shhh, I\'m still improving).',
	'Amateur Tetris player.',
	'Canadian citizen since 2012.',
	'Don\'t bother to using these to get my personal information.',
	'WHAT&#8253; You\'ve never played Tuber Simulator.',
	'Minesweeper personal record: 5 seconds on beginner, 49 seconds on medium',
	'Average <a href="https://www.humanbenchmark.com/users/5d1edd1dbfa20b00011fc1bc">reaction time</a> of 208ms',
	'Average typing speed 94 WPM.',
	'Built UBC Macleod building in Minecraft.',
	'Favorite Minecraft texture packs: Summerfield, Soartex Fanver, and Faithful.',
	'Inspired by Minecraft splash texts.',
	'20 GOTO 10',
	'$(\'#muchen\').hide();'
]

function makeRandomMessage(id, parent_id) {
	let message = document.createElement('span');
	message.id = id;
	let i = Math.floor(Math.random() * MY_FACTS.length);
	message.innerHTML = '<sup>#' + i + '</sup> ' + MY_FACTS[i];
	document.getElementById(parent_id).appendChild(message)
}