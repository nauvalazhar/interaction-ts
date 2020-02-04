type LogMethod = 'log' | 'warn' | 'error' | 'group';

/**
 * Console log wrapper
 * @param {any}	       	 message 	Message given
 * @param {LogMethod}    method 	Console log's method
 */
export function log(message: any, method: LogMethod = 'log'): void {
	console[method](message);
}