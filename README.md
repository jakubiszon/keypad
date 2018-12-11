# keypad
a micro library used to implement buttons for special characters

## how to use
There is no javascript to run. You only need to include `keypad.js` on the page.
* assign `data-keypad-target` attribute to the element containing your buttons
* `data-keypad-target` is a selector pointing to the target element
* the buttons will append their `value` to the target element
```html
<textarea id='editor'></textarea>
<div data-keypad-target='#editor'>
	<input type='button' value='ą' />
	<input type='button' value='ć' />
	<input type='button' value='ę' />
	<input type='button' value='&oplus;&asymp;&otimes;' />
</div>
```
