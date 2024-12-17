document.addEventListener("DOMContentLoaded", function (event) {
	const elements = [...document.querySelectorAll(`[role]`)]
	for (const el of elements) {
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

	const role = event.target.attributes.role ? event.target.attributes.role.value : ""
	const containerRole = focussable[role] || ""
	if (!containerRole) return;
	const container = event.target.closest(`[role="${containerRole}"]`)
	if (!container) return;

	const siblings = [...container.querySelectorAll(`[role="${role}"]`)]
	const index = siblings.indexOf(event.target)
	let stopPropagation = true

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
				break
			default:
				stopPropagation = false
		}
		if (stopPropagation) {
			event.stopPropagation()
			event.preventDefault()
			return false
		}
	}
	return false
}

function doClick(event) {
	let focussable = {
		'radio': 'radiogroup',
		'tab': 'tablist',
		'option': 'list',
		'checkbox': 'check'
	}

	const role = event.target.attributes.role ? event.target.attributes.role.value : ""
	const containerRole = focussable[role] || ""
	if (!containerRole) return;

	const container = event.target.closest(`[role="${containerRole}"]`)
	if (container) {
		const siblings = [...container.querySelectorAll(`[role="${role}"]`)]
		for (const sibling of siblings) {
			const controlledElement = document.getElementById(sibling.getAttribute('aria-controls'))
			sibling.ariaSelected = false
			sibling.ariaChecked = false
			sibling.tabIndex = -1
			sibling.classList.remove('checked')
			if(controlledElement) controlledElement.tabIndex = -1
		}
	}
	const controlledElement = document.getElementById(event.target.getAttribute('aria-controls'))
	event.target.ariaSelected = true
	event.target.ariaChecked = true
	event.target.tabIndex = 0
	if(controlledElement) controlledElement.tabIndex = 0

	if (!event.target.classList.contains('checked')) {
		event.target.classList.add('checked')
	} else {
		event.target.classList.remove('checked')
	}
	event.target.focus()
}
