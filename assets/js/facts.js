const MY_FACTS = [
	'Likes video game music.',
	'Paid CHF 50.00 for the typeface used on this website.',
	'Been playing Minecraft since 2010.',
	'Used to make Let\'s play videos on YouTube.',
	'Silver Elite Master on competitive CSGO (shhh, I\'m still improving).',
	'Amateur Tetris player.',
	'Canadian citizen since 2012.',
	'Don\'t bother to using these to get my personal information.',
	'WHAT&#8253; You\'ve never played Tuber Simulator.'
]

function makeRandomMessage(id, parent_id) {
	let message = document.createElement('span');
	message.id = id;
	message.innerHTML = MY_FACTS[Math.floor(Math.random() * MY_FACTS.length)];
	document.getElementById(parent_id).appendChild(message)
}