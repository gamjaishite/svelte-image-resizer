import { writable } from 'svelte/store';

const imageProps = writable<{ width: number; height: number }>();

class Resizer {
	private aspectRatio: number;
	private width: number;
	private height: number;
	private image: HTMLImageElement;
	private cursorX: number;
	private cursorY: number;
	private document: Document;
	private imageStyles: CSSStyleDeclaration;

	// Top
	private boundedHandleMouseMoveTopResize: (event: MouseEvent | TouchEvent) => void;
	public boundedHandleMouseDownTopResize: (event: MouseEvent | TouchEvent) => void;
	private boundedHandleMouseUpTopResize: (event: MouseEvent | TouchEvent) => void;

	// Right
	private boundedHandleMouseMoveRightResize: (event: MouseEvent | TouchEvent) => void;
	public boundedHandleMouseDownRightResize: (event: MouseEvent | TouchEvent) => void;
	private boundedHandleMouseUpRightResize: (event: MouseEvent | TouchEvent) => void;

	// Bottom
	private boundedHandleMouseMoveBottomResize: (event: MouseEvent | TouchEvent) => void;
	public boundedHandleMouseDownBottomResize: (event: MouseEvent | TouchEvent) => void;
	private boundedHandleMouseUpBottomResize: (event: MouseEvent | TouchEvent) => void;

	// Left
	private boundedHandleMouseMoveLeftResize: (event: MouseEvent | TouchEvent) => void;
	public boundedHandleMouseDownLeftResize: (event: MouseEvent | TouchEvent) => void;
	private boundedHandleMouseUpLeftResize: (event: MouseEvent | TouchEvent) => void;

	// Top Corner
	private boundedHandleMouseMoveTopCornerResize: (event: MouseEvent | TouchEvent) => void;
	public boundedHandleMouseDownTopCornerResize: (event: MouseEvent | TouchEvent) => void;
	private boundedHandleMouseUpTopCornerResize: (event: MouseEvent | TouchEvent) => void;

	// Bottom Corner
	private boundedHandleMouseMoveBottomCornerResize: (event: MouseEvent | TouchEvent) => void;
	public boundedHandleMouseDownBottomCornerResize: (event: MouseEvent | TouchEvent) => void;
	private boundedHandleMouseUpBottomCornerResize: (event: MouseEvent | TouchEvent) => void;

	public constructor(
		aspectRatio: number,
		width: number,
		height: number,
		image: HTMLImageElement,
		cursorX: number,
		cursorY: number,
		document: Document,
		imageStyles: CSSStyleDeclaration
	) {
		this.aspectRatio = aspectRatio;
		this.width = width;
		this.height = height;
		this.image = image;
		this.cursorX = cursorX;
		this.cursorY = cursorY;
		this.document = document;
		this.imageStyles = imageStyles;

		imageProps.set({ width, height });

		// Top
		this.boundedHandleMouseMoveRightResize = this.handleMouseMoveRightResize.bind(this);
		this.boundedHandleMouseDownRightResize = this.handleMouseDownRightResize.bind(this);
		this.boundedHandleMouseUpRightResize = this.handleMouseUpRightResize.bind(this);

		// Right
		this.boundedHandleMouseMoveTopResize = this.handleMouseMoveTopResize.bind(this);
		this.boundedHandleMouseDownTopResize = this.handleMouseDownTopResize.bind(this);
		this.boundedHandleMouseUpTopResize = this.handleMouseUpTopResize.bind(this);

		// Bottom
		this.boundedHandleMouseMoveBottomResize = this.handleMouseMoveBottomResize.bind(this);
		this.boundedHandleMouseDownBottomResize = this.handleMouseDownBottomResize.bind(this);
		this.boundedHandleMouseUpBottomResize = this.handleMouseUpBottomResize.bind(this);

		// Left
		this.boundedHandleMouseMoveLeftResize = this.handleMouseMoveLeftResize.bind(this);
		this.boundedHandleMouseDownLeftResize = this.handleMouseDownLeftResize.bind(this);
		this.boundedHandleMouseUpLeftResize = this.handleMouseUpLeftResize.bind(this);

		// Top Corner
		this.boundedHandleMouseMoveTopCornerResize = this.handleMouseMoveTopCornerResize.bind(this);
		this.boundedHandleMouseDownTopCornerResize = this.handleMouseDownTopCornerResize.bind(this);
		this.boundedHandleMouseUpTopCornerResize = this.handleMouseUpTopCornerResize.bind(this);

		// Bottom Corner
		this.boundedHandleMouseMoveBottomCornerResize =
			this.handleMouseMoveBottomCornerResize.bind(this);
		this.boundedHandleMouseDownBottomCornerResize =
			this.handleMouseDownBottomCornerResize.bind(this);
		this.boundedHandleMouseUpBottomCornerResize = this.handleMouseUpBottomCornerResize.bind(this);
	}

	private getCursorXY(event: MouseEvent | TouchEvent): { x: number; y: number } {
		if (event instanceof TouchEvent) {
			const touch = event.touches[0] || event.changedTouches[0];
			return { x: touch.clientX, y: touch.clientY };
		}
		return { x: event.clientX, y: event.clientY };
	}

	// Top resizer

	private handleMouseMoveTopResize(event: MouseEvent | TouchEvent) {
		const { y } = this.getCursorXY(event);
		const dy = this.cursorY - y;
		this.cursorY = y;
		this.height = this.height + dy;
		this.image.style.height = `${this.height}px`;
		this.aspectRatio = this.width / this.height;

		imageProps.set({ width: this.width, height: this.height });
	}

	private handleMouseUpTopResize(event: MouseEvent | TouchEvent) {
		this.document.removeEventListener('mousemove', this.boundedHandleMouseMoveTopResize);
		this.document.removeEventListener('touchmove', this.boundedHandleMouseMoveTopResize);
	}

	private handleMouseDownTopResize(event: MouseEvent | TouchEvent) {
		event.preventDefault(); // important

		const { y } = this.getCursorXY(event);
		this.cursorY = y;

		this.document.addEventListener('mousemove', this.boundedHandleMouseMoveTopResize);
		this.document.addEventListener('touchmove', this.boundedHandleMouseMoveTopResize);
		this.document.addEventListener('mouseup', this.boundedHandleMouseUpTopResize);
		this.document.addEventListener('touchend', this.boundedHandleMouseUpTopResize);
	}

	// Right resizer

	private handleMouseMoveRightResize(event: MouseEvent | TouchEvent) {
		const { x } = this.getCursorXY(event);
		const dx = x - this.cursorX;
		this.cursorX = x;
		this.width = this.width + dx;
		this.image.style.width = `${this.width}px`;
		this.aspectRatio = this.width / this.height;

		imageProps.set({ width: this.width, height: this.height });
	}

	private handleMouseUpRightResize(event: MouseEvent | TouchEvent) {
		this.document.removeEventListener('mousemove', this.boundedHandleMouseMoveRightResize);
		this.document.removeEventListener('touchmove', this.boundedHandleMouseMoveRightResize);
	}

	private handleMouseDownRightResize(event: MouseEvent | TouchEvent) {
		event.preventDefault(); // important

		const { x } = this.getCursorXY(event);
		this.cursorX = x;

		this.document.addEventListener('mousemove', this.boundedHandleMouseMoveRightResize);
		this.document.addEventListener('touchmove', this.boundedHandleMouseMoveRightResize);
		this.document.addEventListener('mouseup', this.boundedHandleMouseUpRightResize);
		this.document.addEventListener('touchend', this.boundedHandleMouseUpRightResize);
	}

	// Bottom resizer

	private handleMouseMoveBottomResize(event: MouseEvent | TouchEvent) {
		const { y } = this.getCursorXY(event);
		const dy = y - this.cursorY;
		this.cursorY = y;
		this.height = this.height + dy;
		this.image.style.height = `${this.height}px`;
		this.aspectRatio = this.width / this.height;

		imageProps.set({ width: this.width, height: this.height });
	}

	private handleMouseUpBottomResize(event: MouseEvent | TouchEvent) {
		this.document.removeEventListener('mousemove', this.boundedHandleMouseMoveBottomResize);
		this.document.removeEventListener('touchmove', this.boundedHandleMouseMoveBottomResize);
	}

	private handleMouseDownBottomResize(event: MouseEvent | TouchEvent) {
		event.preventDefault(); // important

		const { y } = this.getCursorXY(event);
		this.cursorY = y;

		this.document.addEventListener('mousemove', this.boundedHandleMouseMoveBottomResize);
		this.document.addEventListener('touchmove', this.boundedHandleMouseMoveBottomResize);
		this.document.addEventListener('mouseup', this.boundedHandleMouseUpBottomResize);
		this.document.addEventListener('touchend', this.boundedHandleMouseUpBottomResize);
	}

	// Left Resizer

	private handleMouseMoveLeftResize(event: MouseEvent | TouchEvent) {
		const { x } = this.getCursorXY(event);
		const dx = this.cursorX - x;
		this.cursorX = x;
		this.width = this.width + dx;
		this.image.style.width = `${this.width}px`;
		this.aspectRatio = this.width / this.height;

		imageProps.set({ width: this.width, height: this.height });
	}

	private handleMouseUpLeftResize(event: MouseEvent | TouchEvent) {
		this.document.removeEventListener('mousemove', this.boundedHandleMouseMoveLeftResize);
		this.document.removeEventListener('touchmove', this.boundedHandleMouseMoveLeftResize);
	}

	private handleMouseDownLeftResize(event: MouseEvent | TouchEvent) {
		event.preventDefault(); // important

		const { x } = this.getCursorXY(event);
		this.cursorX = x;

		this.document.addEventListener('mousemove', this.boundedHandleMouseMoveLeftResize);
		this.document.addEventListener('touchmove', this.boundedHandleMouseMoveLeftResize);
		this.document.addEventListener('mouseup', this.boundedHandleMouseUpLeftResize);
		this.document.addEventListener('touchend', this.boundedHandleMouseUpLeftResize);
	}

	// Top Corner resizer

	private handleMouseMoveTopCornerResize(event: MouseEvent | TouchEvent) {
		const { y } = this.getCursorXY(event);
		const dy = this.cursorY - y;
		this.cursorY = y;
		this.height = this.height + dy;
		this.width = this.height * this.aspectRatio;

		this.image.style.width = `${this.width}px`;
		this.image.style.height = `${this.height}px`;

		imageProps.set({ width: this.width, height: this.height });
	}

	private handleMouseUpTopCornerResize(event: MouseEvent | TouchEvent) {
		this.document.removeEventListener('mousemove', this.boundedHandleMouseMoveTopCornerResize);
		this.document.removeEventListener('touchmove', this.boundedHandleMouseMoveTopCornerResize);
	}

	private handleMouseDownTopCornerResize(event: MouseEvent | TouchEvent) {
		event.preventDefault(); // important

		const { y } = this.getCursorXY(event);
		this.cursorY = y;

		this.document.addEventListener('mousemove', this.boundedHandleMouseMoveTopCornerResize);
		this.document.addEventListener('touchmove', this.boundedHandleMouseMoveTopCornerResize);
		this.document.addEventListener('mouseup', this.boundedHandleMouseUpTopCornerResize);
		this.document.addEventListener('touchend', this.boundedHandleMouseUpTopCornerResize);
	}

	// Bottom corner resizer

	private handleMouseMoveBottomCornerResize(event: MouseEvent | TouchEvent) {
		const { y } = this.getCursorXY(event);
		const dy = y - this.cursorY;
		this.cursorY = y;
		this.height = this.height + dy;
		this.width = this.height * this.aspectRatio;

		this.image.style.width = `${this.width}px`;
		this.image.style.height = `${this.height}px`;

		imageProps.set({ width: this.width, height: this.height });
	}

	private handleMouseUpBottomCornerResize(event: MouseEvent | TouchEvent) {
		this.document.removeEventListener('mousemove', this.boundedHandleMouseMoveBottomCornerResize);
		this.document.removeEventListener('touchmove', this.boundedHandleMouseMoveBottomCornerResize);
	}

	private handleMouseDownBottomCornerResize(event: MouseEvent | TouchEvent) {
		event.preventDefault(); // important

		const { y } = this.getCursorXY(event);
		this.cursorY = y;

		this.document.addEventListener('mousemove', this.boundedHandleMouseMoveBottomCornerResize);
		this.document.addEventListener('touchmove', this.boundedHandleMouseMoveBottomCornerResize);
		this.document.addEventListener('mouseup', this.boundedHandleMouseUpBottomCornerResize);
		this.document.addEventListener('touchend', this.boundedHandleMouseUpBottomCornerResize);
	}
}

export { Resizer, imageProps };
