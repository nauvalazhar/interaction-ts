/**
 * Consumer example (not part of the library)
 */

import { uniqueID } from './utils/unique-id';
import { random as randomEmoji } from './utils/emoji';
import Toast, { ToastOptions } from './modules/toast';
var randomWords = require('random-words');

const options: ToastOptions = {
	timeout: 2500
}
const toast = new Toast(options);

document.querySelector('p')!.innerHTML = 'This button will add a new toast with a random message';

const button: HTMLElement | null = document.querySelector('#add-toast');
const dispose: HTMLElement | null = document.querySelector('#dispose-toast');

if(button) {
	button.addEventListener('click', (e) => {
		e.preventDefault();

		toast.add({
			icon: randomEmoji({count: 1})[0],
			message: (string => string.charAt(0).toUpperCase() + string.slice(1))(randomWords())
		});
	});
}

if(dispose) {
	dispose.addEventListener('click', (e) => {
		e.preventDefault();

		toast.dispose();
	});
}
