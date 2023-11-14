	document.addEventListener("DOMContentLoaded", function(event) { 
		prepareCode() ; 
	});

	function prepareCode() {
		const config = { attributes: true, childList: true, subtree: true };
		var index = 0
		var list = $(".example .container")		
		for (var i=0; i<list.length; i++) {
			if (!list[i].classList.contains('noCode') ) { 
				let example = document.createElement("pre")
				example.classList.add("saharian-debug-showcode")
				example.id = "saharian-debug-showcode-"+i
				list[i].setAttribute('data-saharian-debug-showcode-result',example.id)
				example.innerHTML = list[i].innerHTML.replace(/\</g,"&lt;").replace(/\t/g,"  ").trim()
				list[i].after(example)
				let observer = new MutationObserver(callback);
				observer.observe(list[i], config);
			}			
		}
	}
		
	function $(selector) {
		return document.querySelectorAll(selector)
	}
	

const callback = function(mutationsList, observer) {
	let container = mutationsList[0].target.closest('.container')
	if (!container.classList.contains('saharian-debug-dont-update')) {
		let result = container.attributes['data-saharian-debug-showcode-result'].value
		let example = document.getElementById(result)
		example.innerHTML = container.innerHTML.replace(/\</g,"&lt;").replace(/\t/g,"  ").trim()
	}
};

// Later, you can stop observing
// observer.disconnect();