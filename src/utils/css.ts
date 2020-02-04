type CSSOptions = {
	prefix?: string;
	target?: string;
}

type CSSDeclaration = {
	[key: string]: string;
}

export type CSSObject = {
	[key: string]: CSSDeclaration;
}

type CSSSelector = {
	[key: string]: string;
}

class CSS {
	private options: CSSOptions;
	private cssObject: CSSObject;
	private defaultOptions: CSSOptions = {
		target: 'body'
	}

	constructor(cssObject: CSSObject, options: CSSOptions) {
		this.options = Object.assign(this.defaultOptions, options);

		this.cssObject = cssObject;
	}

	inject(): void {
		const { target } = this.options;

		const target_element = document.querySelector(target!)!;

		let style_tag = document.createElement('style');
		style_tag.innerHTML = this.generateStyleString(this.cssObject);

		target_element.appendChild(style_tag);
	}

	private generateStyleString(cssObject: any): string {
		const selectors = Object.keys(cssObject);

		let rules: string = '';

		selectors.forEach((selector) => {
			let declarations = this.generateDeclarations(cssObject[selector]);

			rules += `${this.buildSelector(selector)} { ${declarations} } `;
		});

		return rules;
	}

	selectors(): CSSSelector {
		const cssObject = this.cssObject;

		let selectors: CSSSelector = {};

		Object.keys(cssObject).forEach(selector => {
			selectors[selector] = this.buildSelector(selector, false);
		});

		return selectors;
	}

	private buildSelector(selector: string, classIdentifier: boolean = true): string {
		const { prefix } = this.options;

		return `${classIdentifier ? '.' : ''}${(prefix ? prefix + '-' : '') + selector}`;
	}

	private generateDeclarations(declarartions: CSSDeclaration): string {
		const properties = Object.keys(declarartions);

		let declarartion:string = '';

		properties.forEach((property) => {
			let value = declarartions[property];

			declarartion += `${this.evaluatePropertyName(property)}: ${value};`;
		});

		return declarartion;
	}

	private evaluatePropertyName(name: string): string {
		name = name.replace(/[A-Z]/g, m => "-" + m.toLowerCase());

		return name;
	}
}

type CSSHelper = {
	inject: Function;
	selectors: CSSSelector;
}

export function css(cssObject: CSSObject, options: CSSOptions): CSSHelper {
	const css = new CSS(cssObject, options);

	return {
		inject: (): void => {
			css.inject();
		},
		selectors: css.selectors()
	};
}