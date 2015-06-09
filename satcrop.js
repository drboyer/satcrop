$(document).ready(function(){
	var currMoment = moment().utc().subtract(3, 'hours');
	var baseURL = "http://www.ssec.wisc.edu/data/1min/goes-14/";
	var numImgs = 30;
	var images = new Array();

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
		imgObj = new Image();
		imgObj.src = fullURL;
		images.push(imgObj);

		currMoment.add(1, 'minutes');		
	}

	/*$.each(images, function(i, img) {
		$('#imageblock').append(img);
	});*/
	var i = 0;
	setInterval(function(){
		$('#imageblock').html(images[i]);
		i++;
		if(i >= images.length) {
			i = 0;
		}
	}, 100);
});