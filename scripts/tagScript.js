#!/usr/bin/env node

/*
	For the docs, we want to only clone the latest patch for each major.minor pair. 
	The patch has bug fixes / typo fixes so we want only the latest patch for each major minor pair (and not every patch listed on the website)
*/
const tags = process.argv.slice(2)

const tagMap = createTagMap(tags);
const tagsToClone = getTagsToClone(tagMap);


// send output back to the terminal as a comma separated string
console.log(tagsToClone.join(","));

/* 
	create an Object where the keys are the major.minor pairs and the 
	value is an array of all patches for that major.minor pair
	for example:

	{
		"0.2": [
			"0"
		],
		"0.3": [
			"3",
			"2",
			"1",
			"0"
		]
	}
*/
function createTagMap(tags){
	let tagMap = {};

	tags.map(tag => {
		let ver = tag.split(".");
		let majorMinorKey = `${ver[0]}.${ver[1]}`;

		if(typeof tagMap[majorMinorKey]  === "undefined"){
			tagMap[majorMinorKey] = []
		}

		tagMap[majorMinorKey].push(ver[2]);
	});

	return tagMap;
}

/*
	Take the majorMinor map explained above and for each major minor pair we get the 
	latest (highest) patch number and append it to the major.minor pair to get the 
	latest patch for each major.minor pair.
*/
function getTagsToClone(tagMap){
	let finalTagArrayToClone = [];

	Object.keys(tagMap).forEach(majorMinor => {
		let sortedPatches = tagMap[majorMinor].sort((a,b) => {
			return parseInt(b) - parseInt(a);
		});

		finalTagArrayToClone.push(`"${majorMinor}.${sortedPatches[0]}"`)
	});

	return finalTagArrayToClone;
}
