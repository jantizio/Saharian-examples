ARIAservices = (function () {

	document.addEventListener("DOMContentLoaded", function (event) {
		var elements = [...document.querySelectorAll(`[role]`)]
		for (var el of elements) {
			el.addEventListener('keydown', doKeydown, true)
			el.addEventListener('click', doClick, true)
		}
	});

	function doKeydown(event) {
		let focussable = {
			'radio': 'radiogroup',
			'tab': 'tablist',
			'option': 'list',
			'checkbox': 'check'
		}

		var role = event.target.attributes.role ? event.target.attributes.role.value : ""
		var containerRole = focussable[role] || ""
		if (containerRole) {
			var container = event.target.closest(`[role="${containerRole}"]`)
			if (container) {
				console.log("ci passiamo")
				var siblings = [...container.querySelectorAll(`[role="${role}"]`)]
				var index = siblings.indexOf(event.target)
				var stopPropagation = true

				console.log(event.key)
				if (!(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)) {
					switch (event.key) {
						case 'ArrowRight':
						case 'ArrowDown':
							siblings[(index + 1) % siblings.length].focus()
							siblings[(index + 1) % siblings.length].click()
							break
						case 'ArrowLeft':
						case 'ArrowUp':
							siblings[(siblings.length + index - 1) % siblings.length].focus()
							siblings[(siblings.length + index - 1) % siblings.length].click()
							break
						case 'Home':
							siblings[0].focus()
							siblings[0].click()
							break
						case 'End':
							siblings[siblings.length - 1].focus()
							siblings[siblings.length - 1].click()
							break
						case 'Enter':
						case ' ':
							event.target.focus()
							event.target.click()
							break;
						default:
							stopPropagation = false
							return;
					}
					if (stopPropagation) {
						event.stopPropagation()
						event.preventDefault()
						return false
					}
				}
				return false
			}
		}

	}

	function doClick(event) {
		let focussable = {
			'radio': 'radiogroup',
			'tab': 'tablist',
			'option': 'list',
			'checkbox': 'check'
		}

		var role = event.target.attributes.role ? event.target.attributes.role.value : ""
		console.log("ruolo: " + role);
		var containerRole = focussable[role] || ""
		console.log('Selected role:', containerRole);
		if (containerRole) {
			var container = event.target.closest(`[role="${containerRole}"]`)
			if (container) {
				var siblings = [...container.querySelectorAll(`[role="${role}"]`)]
				var index = siblings.indexOf(event.target)
				for (var sibling of siblings) {
					sibling.ariaChecked = false
					sibling.tabIndex = -1
					sibling.classList.remove('checked')
				}
			}
			event.target.ariaChecked = true
			event.target.tabIndex = 0
			if (!event.target.classList.contains('checked')) {
				event.target.classList.add('checked')
			} else {
				event.target.classList.remove('checked')
			}
			event.target.focus()
		}
	}
})();

