(function() {
	var lastUsed = [];
	document.addEventListener('focus', focusHandler, true);
	document.addEventListener('click', clickHandler);
	
	function focusHandler(event) {
		if(!isMatch(event.target, 'textarea, input[type=text]')) return;
		var idx = lastUsed.indexOf(event.target);
		if(idx >= 0) lastUsed.splice(idx, 1);
		lastUsed.unshift(event.target);
	}
		
	function clickHandler(event) {
		// make sure the element clicked is an input and belongs to a keypad
		if(!isMatch(event.target, 'input[type=button][data-keypad-target], [data-keypad-target] input[type=button]')) return;
		
		// find the keypad
		var elementWithTarget = event.target.getAttribute('data-keypad-target') ?
			event.target : closest(event.target, '[data-keypad-target]');
		if(!elementWithTarget) return;

		var targetInput = findTarget(elementWithTarget.getAttribute('data-keypad-target'));
		replaceSelection(targetInput, event.target.value);
	}
	
	function findTarget(selector) {
		var targetElement = document.querySelector(selector);
		if(isMatch(targetElement, 'textarea, input[type=text]')) return targetElement;
		
		// the target is not an element one could write to, we need to query for writable elements
		var elements = targetElement.querySelectorAll('textarea, input[type=text]');
		if(elements.length === 0) return null;
		
		// we need to check if any of these elements
		elements = Array.prototype.slice.call(elements);
		var foundAsLastUsed = lastUsed.filter(function(e) {return elements.indexOf(e) >= 0;});
		return foundAsLastUsed.length ? foundAsLastUsed[0] : elements[0];
	}
	
	function replaceSelection(element, text) {
		var start = element.selectionStart;
		var end = element.selectionEnd;
		var oldValue = element.value;
		element.value = oldValue.substring(0, start) + text + oldValue.substring(end);
		element.focus();
		element.setSelectionRange(start + text.length, start + text.length);
	}
	
	function isMatch(element, selector) {
		var func = element.matches || element.webkitMatchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector;
		return func.call(element, selector);
	}
	
	function closest(element, selector) {
		if(element.closest) return element.closest(selector);
		
		var ancestor = element.parentNode;
		while(ancestor) {
			if(isMatch(ancestor, selector)) return ancestor;
			ancestor = ancestor.parentNode;
		}
	}
})();

(function(){
	document.addEventListener('change', changeHandler);
	function changeHandler(event) {
		if(!isMatch(event.target, 'select[data-keypad]')) return;
		var targetKeypad = document.querySelector(event.target.getAttribute('data-keypad'));
		if(!targetKeypad) return;
		targetKeypad.innerHTML = '';
		var newKeys = event.target.options[event.target.selectedIndex].getAttribute('data-keys');
		newKeys = newKeys.split(',');
		newKeys = newKeys.map(addButton.bind(targetKeypad));
	}
	
	function addButton(text) {
		if(!text)return;
		var button = document.createElement('input');
		button.type = 'button';
		button.value = text;
		this.appendChild(button);
	}
	
	function isMatch(element, selector) {
		var func = element.matches || element.webkitMatchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector;
		return func.call(element, selector);
	}
	
	// initialise for all elements
	window.addEventListener('load', function(){
		Array.prototype.map.call(document.querySelectorAll('select[data-keypad]'), function(e){changeHandler({target:e});});
	});
})();
