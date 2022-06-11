import { useState, useRef } from 'react';

export function useDrawLogic(canvasRef, contextRef, color, setColor, thickness, setThickness) {
	const [isDrawing, setIsDrawing] = useState(false);

	const history = useRef([]);
	const coords = useRef([]);
	const index = useRef(0);
	const [startCoords, setStartCoords] = useState([]);

	// History actions
	function undo() {
		if (index.current === 0) return;
		index.current -= 1;
		const redrawHistory = history.current.slice(0, index.current);
		redraw(redrawHistory);
		console.log({ history: history.current, redrawHistory, index: index.current });
	}

	function redo() {
		if (index.current === history.current.length) return;
		index.current += 1;
		const redrawHistory = history.current.slice(0, index.current);
		redraw(redrawHistory);
	}

	function clear() {
		// contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		contextRef.current.fillStyle = 'white';
		contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		addAction({ x: 0, y: 0 }, 'clear');
	}

	function addCoords(x, y) {
		coords.current.push({ x, y });
	}

	function addAction(coords, type) {
		if (!coords.length && type === 'stroke') {
			drawDot(startCoords);
			return;
		}
		const action = { coords, stats: { color, thickness }, type };
		index.current += 1;
		history.current.push(action);
	}

	function redraw(history) {
		contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

		history.forEach(({ coords, stats, type }) => {
			const ctx = contextRef.current;
			const { width, height } = canvasRef.current;

			switch (type) {
				case 'clear':
					ctx.fillStyle = 'white';
					ctx.fillRect(0, 0, width, height);
					break;
				case 'dot':
					ctx.fillStyle = stats.color;
					contextRef.current.lineWidth = stats.thickness;
					const { x, y } = coords[0];
					ctx.beginPath();
					ctx.ellipse(x, y, 1, 1, 0, 0, 2 * Math.PI);
					ctx.stroke();
					ctx.closePath();
					break;
				case 'stroke':
					const startX = coords[0].x;
					const startY = coords[0].y;

					ctx.beginPath();
					ctx.moveTo(startX, startY);
					ctx.strokeStyle = stats.color;
					ctx.lineWidth = stats.thickness;

					coords.forEach(({ x, y }) => {
						ctx.lineTo(x, y);
						ctx.stroke();
					});

					ctx.closePath();
					break;
				default:
					console.error('No such action for redraw!');
					break;
			}
		});
	}

	// Drawing logic
	function drawStart(event) {
		let x = 0;
		let y = 0;
		coords.current = [];

		contextRef.current.strokeStyle = color;
		contextRef.current.lineWidth = thickness;

		if (Array.isArray(event)) {
			x = event[0];
			y = event[1];
		} else {
			x = event.nativeEvent.offsetX;
			y = event.nativeEvent.offsetY;
		}

		if (index.current < history.current.length) {
			history.current = history.current.slice(0, index.current);
		}

		contextRef.current.beginPath();
		contextRef.current.moveTo(x, y);

		// setBrushColor(color);
		// setBrushThickness(thickness);
		setStartCoords([x, y]);
		setIsDrawing(true);
	}

	function drawStop() {
		if (!isDrawing) return;

		contextRef.current.closePath();
		setIsDrawing(false);
		addAction(coords.current, 'stroke');
	}

	function draw(event) {
		if (!isDrawing) return;

		let x = 0;
		let y = 0;

		x = Array.isArray(event) ? event[0] : event.nativeEvent.offsetX;
		y = Array.isArray(event) ? event[1] : event.nativeEvent.offsetY;

		contextRef.current.lineTo(x, y);
		contextRef.current.stroke();

		addCoords(x, y);
	}

	function drawDot(coords) {
		const [x, y] = coords;
		const ctx = contextRef.current;

		ctx.fillStyle = color;
		contextRef.current.lineWidth = thickness;
		ctx.beginPath();
		ctx.ellipse(x, y, 1, 1, 0, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();

		addAction([{ x, y }], 'dot');
	}

	// TODO
	function setUpEraser() {
		// const ctx = canvasRef.current.getContext('2d');
		// setColor('white');
		// contextRef.current.lineWidth = thickness;
		// ctx.lineCap = 'square';
	}

	return [drawStart, drawStop, draw, undo, redo, clear, setUpEraser];
}
