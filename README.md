# keypad.js
a micro library used to implement buttons for special characters

## How to use?
There is no javascript to run. You only need to include `keypad.js` on the page.
* assign `data-keypad-target` attribute to the element containing your buttons
* `data-keypad-target` is a selector pointing to the target element
* the buttons will append their `value` to the target element, the value can be any length
```html
<textarea id='editor'></textarea>
<div data-keypad-target='#editor'>
	<input type='button' value='ą' />
	<input type='button' value='ć' />
	<input type='button' value='ę' />
	<input type='button' value='&oplus;&asymp;&otimes;' />
</div>
```
* you can have as many keypads as you want
* you can make a single keypad point to a group of input elements - the last focused element will be updated
```
<table id='paradigm'>
	<tr>
		<td>person</td>
		<td>singular</td>
		<td>plural</td>
	</tr>
	<tr>
		<td>first</td>
		<td><input type='text' name='first-person-singular' /></td>
		<td><input type='text' name='first-person-plural' /></td>
	</tr>
	<tr>
		<td>second</td>
		<td><input type='text' name='second-person-singular' /></td>
		<td><input type='text' name='second-person-plural' /></td>
	</tr>
	<tr>
		<td>third</td>
		<td><input type='text' name='third-person-singular' /></td>
		<td><input type='text' name='third-person-plural' /></td>
	</tr>
</table>

<div data-keypad-target='#paradigm'>
	<input type='button' value='ą' />
	<input type='button' value='ć' />
	<input type='button' value='ę' />
	<input type='button' value='ł' />
	<input type='button' value='ń' />
	<input type='button' value='ó' />
	<input type='button' value='ś' />
	<input type='button' value='ż' />
	<input type='button' value='ź' />
</div>
```
