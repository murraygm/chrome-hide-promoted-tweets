// content.js

// Author: Murray Grigo-McMahon
// License: Free Public Domian (data used may be under additional restrictions)
// Project: A little extension that checks for ads in your twitter feed (every 5secs) and hides them
// version: 1.0
var totalAds = 0;


function clearPromoted () {
	var adElementsArr = document.querySelectorAll('[data-testid="placementTracking"]'), i;
	for (i = 0; i < adElementsArr.length; ++i) {
	  if(adElementsArr[i].style.display != "none"){
	  	adElementsArr[i].style.display = "none";
	    totalAds = totalAds+1;
	  }	  
	};
	//console.log(totalAds + ' ads found, ' + totalAds + ' ads hidden')
}

window.onload=function(){
    clearPromoted ()
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	clearPromoted ()
    }
  }
)

setInterval(function(){ clearPromoted(); }, 5000);