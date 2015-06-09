$(document).ready(function(){
	var currMoment = moment().utc().subtract(1, 'hours');
	var baseURL = "http://www.ssec.wisc.edu/data/1min/goes-14/";
	var numImgs = 30;
	var imgURLs = new Array();   // the urls to preload
	var loadedImgs = new Array();    // the preloaded images

	$('#dateblock').html(currMoment.format("MMM Do YY HH:mm UTC"));

	// define the variable used in the loop only once
	var dateURLFragment, prevhr, filenameTime, imgFilename, fullURL, imgObj;

	// for the number of images desired, get the required date params and load that image
	for(var i = 1; i <= numImgs; i++)
	{
		// set all the date variables
		dateURLFragment = currMoment.format("YYYY/MM/DD");
		prevhr = currMoment.format('HH');
		filenameTime = currMoment.format('YYYY_DDD_HHmm');


		imgFilename = "goes14_1_"+filenameTime+".gif";
		fullURL = baseURL+dateURLFragment+"/"+prevhr+"/"+imgFilename;
		imgURLs.push(fullURL);

		currMoment.add(1, 'minutes');		
	}

	// Preload all the images and start the animation
	$.Prefetch(imgURLs, { simultaneous: 1,
		onImageLoaded: function(imgSrc) {
			loadedImgs.push(imgSrc);
		},
		onAllLoaded: function() {
			doAnimation(loadedImgs);
		}
	});
});

// sets up the image loop
// TODO: Eventually we should have a way to stop this as well!
function doAnimation(images) {
	var i = 0;
	setInterval(function(){
		$('#imageblock').html('<img src="'+images[i]+'" />');
		i++;
		if(i >= images.length) {
			i = 0;
		}
	}, 100);
}