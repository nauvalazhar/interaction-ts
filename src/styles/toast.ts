import { css, CSSObject } from '../utils/css';

const toastStyles: CSSObject = {
	container: {
		fontFamily:' system, -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
		position: 'fixed',
		bottom: '10px',
		left: '50%',
		transform: 'translateX(-50%)'
	},
	content: {
		fontSize: '14px',
		backgroundColor: '#000',
		color: '#fff',
		padding: '15px 20px',
		marginTop: '10px',
		borderRadius: '3px',
		display: 'flex',
		alignItems: 'center'
	},
	icon: {
		marginRight: '10px'
	}
}

export default css(toastStyles, {
	prefix: 'toast'
});