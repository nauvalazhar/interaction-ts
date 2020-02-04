import { log } from '../utils/log';
import { uniqueID } from '../utils/unique-id';

import Module from '../interfaces/module';
import toastStyles from '../styles/toast';

type GenericTemplateObj = {
	[key: string]: string | number | object;
}

export type ToastData = {
	id?: string;
	message: string;
	icon?: string;
}

export type ToastOptions = {
	timeout?: number;
}

/**
 * Toast module
 *
 * Show your message with this module
 * 
 */
export default class Toast implements Module {
	private options: ToastOptions = {
		timeout: 3000
	};
	private containerElement: HTMLElement = document.body;

	private templates = {
		container: ({id}: {id: string}): string => {
			return `
				<div id="${id}" class="${toastStyles.selectors.container}">
				</div>
			`;
		},
		toast: (data: ToastData): string => {
			return `
				<div id="${data.id}" class="${toastStyles.selectors.content}">
					<div class="${toastStyles.selectors.icon}">
						${data.icon}
					</div>
					${data.message}
				</div>
			`;
		}
	}

	constructor(options: object = {}) {
		this.options = Object.assign(this.options, options);

		this.init();
	}

	private addContainer(): void {
		const id: string = 'interjs-' + uniqueID();

		const container = this.templates.container({
			id
		});

		const target: HTMLElement = document.querySelector('body')!;

		target.insertAdjacentHTML('beforeend', container);

		const containerElement: HTMLElement | null = document.querySelector('#' + id);

		if(containerElement)
			this.containerElement = containerElement;
	}

	/**
	 * Add a new toast message to the container element
	 * @param {ToastData} data Toast data given
	 */
	add(data: ToastData): void {
		const id: string = 'interjs-' + uniqueID();

		const toastElement = this.templates.toast({id, ...data});

		this.containerElement.insertAdjacentHTML('afterbegin', toastElement);

		setTimeout(this.remove.bind(this, '#' + id), this.options.timeout);
	}

	/**
	 * Remove existing toast message by id
	 * @param {string} id Toast ID
	 */
	remove(id: string): void {
		const target: HTMLElement | null = document.querySelector(id);

		if(target)
			target.remove();
	}

	private init(): this {
		toastStyles.inject();

		this.addContainer();

		return this;
	}

	dispose(): undefined {
		this.containerElement.remove();

		return undefined;
	}
}