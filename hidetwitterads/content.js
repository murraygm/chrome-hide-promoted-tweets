// content.js

// Author: Murray Grigo-McMahon
// License: Free Public Domian (data used may be under additional restrictions)
// Project: A little extension that checks for ads in your twitter feed (every 5secs) and hides them
// version: 1.4
var totalAds = 0;
var intervalTracker = 0;

function clearPromoted () {
	targetSite = window.location.toString();
	if(targetSite.includes('twitter')){
		console.log('checking twitter feed');
		var adElementsArr = document.querySelectorAll('[data-testid="placementTracking"]'), i;
		for (i = 0; i < adElementsArr.length; ++i) {
		  if(adElementsArr[i].style.display != "none" && adElementsArr[i].firstChild.getAttribute("data-testid") != 'videoPlayer'){
		  	adElementsArr[i].style.display = "none";
		    totalAds = totalAds+1;
		    chrome.runtime.sendMessage({
			    action: 'updateIcon',
			    value: true,
			    count: totalAds
			});
		  }
		};
	} else if (targetSite.includes('linkedin')){
		console.log('checking linkedin feed');
		var LIads = document.getElementsByClassName('ad-banner-container');
		for (var l = 0; l < LIads.length; l++) {
			LIads[l].parentElement.removeChild(LIads[l]);
			totalAds = totalAds+1;
		    chrome.runtime.sendMessage({
			    action: 'updateIcon',
			    value: true,
			    count: totalAds
			});
		};

		//document.getElementsById("ember7765").style.display = 'none';
		var aTags = document.getElementsByTagName("span");
		for (var m = 0; m < aTags.length; m++) {
		  if (aTags[m].innerHTML.includes("Promoted") && aTags[m].classList.contains('feed-shared-actor__sub-description')) {
		  	console.log('found promoted linked post');
		    aTags[m].parentElement.parentElement.parentElement.parentElement.style.display = 'none';
		    var parentEl = aTags[m].parentElement.parentElement.parentElement.parentElement;
		    parentEl.parentNode.removeChild(parentEl);
		    totalAds = totalAds+1;
		    chrome.runtime.sendMessage({
			    action: 'updateIcon',
			    value: true,
			    count: totalAds
			});
		  }
		};
	}
	console.log(totalAds + ' ads found, ' + totalAds + ' ads hidden')
	intervalTracker = intervalTracker+1;

	if(intervalTracker == 8){
		if(keepChecking){
			clearInterval(keepChecking);
		}
		var keepCheckingAnyway = setInterval(function(){ clearPromoted(); }, 5000);
	}
}

window.onload=function(){
	chrome.runtime.sendMessage({
		    action: 'updateIcon',
		    value: false,
		    count: totalAds
		});
    clearPromoted ()
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	clearPromoted ()
    }
  }
)

var keepChecking = setInterval(function(){ clearPromoted(); }, 1000);


