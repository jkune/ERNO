import { Tween, Easing } from './Tween.js';
import { Draggable } from './Draggable.js';
import { TURNS, ROTATIONS, FACES, DIRECTIONS } from '../../util/index.js'
import * as THREE from 'three/src/Three.js';

const STILL = 0;
const PREPARING = 1;
const ROTATING = 2;
const ANIMATING = 3;

class Controls {

	constructor(game) {
		this.game = game;

		this.queu = [];
		this.flipConfig = 0;

		this.flipEasings = [Easing.Power.Out(3), Easing.Sine.Out(), Easing.Back.Out(1.5)];
		this.flipSpeeds = [125, 200, 300];

		this.raycaster = new THREE.Raycaster();

		const helperMaterial = new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0, color: 0x0033ff });

		this.group = new THREE.Object3D();
		this.group.name = 'controls';
		this.game.cube.object.add(this.group);

		this.helper = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(200, 200),
			helperMaterial.clone()
		);

		this.helper.rotation.set(0, Math.PI / 4, 0);
		this.game.world.scene.add(this.helper);

		this.edges = new THREE.Mesh(
			new THREE.BoxBufferGeometry(1, 1, 1),
			helperMaterial.clone(),
		);

		this.game.world.scene.add(this.edges);

		this.momentum = [];

		this.scramble = null;
		this.state = STILL;
		this.enabled = false;

		this.loop = this.loop.bind(this);
		requestAnimationFrame(this.loop);

	}

	enable() {
		if (!this.draggable) return;
		this.draggable.enable();
		this.enabled = true;
	}

	disable() {
		if (!this.draggable) return;
		this.draggable.disable();
		this.enabled = false;
	}

	initDraggable(element) {
		this.draggable = new Draggable(element);

		this.draggable.onDragStart = position => {

			if (this.state === PREPARING || this.state === ROTATING) return;

			this.gettingDrag = this.state === ANIMATING;


			this.dragNormal = new THREE.Vector3(0, 0, 1);
			this.flipType = 'cube';

			this.helper.position.set(0, 0, 0);
			this.helper.rotation.set(0, Math.PI / 4, 0);
			this.helper.updateMatrixWorld();


			let planeIntersect = this.getIntersect(position.current, this.helper, false);
			if (planeIntersect === false) return;

			this.dragCurrent = this.helper.worldToLocal(planeIntersect.point);
			this.dragTotal = new THREE.Vector3();
			this.state = (this.state === STILL) ? PREPARING : this.state;
		};

		this.draggable.onDragMove = position => {
			if (this.state === STILL || (this.state === ANIMATING && this.gettingDrag === false)) return;

			const planeIntersect = this.getIntersect(position.current, this.helper, false);
			if (planeIntersect === false) return;

			const point = this.helper.worldToLocal(planeIntersect.point.clone());

			this.dragDelta = point.clone().sub(this.dragCurrent).setZ(0);
			this.dragTotal.add(this.dragDelta);
			this.dragCurrent = point;
			this.addMomentumPoint(this.dragDelta);

			if (this.state === PREPARING && this.dragTotal.length() > 0.05) {

				this.dragDirection = this.getMainAxis(this.dragTotal);

				const axis = (this.dragDirection != 'x')
					? ((this.dragDirection == 'y' && position.current.x > this.game.world.width / 2) ? 'z' : 'x')
					: 'y';

				this.flipAxis = new THREE.Vector3();
				this.flipAxis[axis] = 1 * ((axis == 'x') ? - 1 : 1);
				this.flipAngle = 0;
				this.state = ROTATING;

			} else if (this.state === ROTATING) {

				const rotation = this.dragDelta[this.dragDirection];

				this.edges.rotateOnWorldAxis(this.flipAxis, rotation);
				this.game.cube.object.rotation.copy(this.edges.rotation);
				this.flipAngle += rotation;
			}
		};

		this.draggable.onDragEnd = position => {
			if (this.state !== ROTATING) {

				this.gettingDrag = false;
				this.state = STILL;
				return;
			}

			this.state = ANIMATING;

			const momentum = this.getMomentum()[this.dragDirection];
			const flip = (Math.abs(momentum) > 0.05 && Math.abs(this.flipAngle) < Math.PI / 2);

			const angle = flip
				? this.roundAngle(this.flipAngle + Math.sign(this.flipAngle) * (Math.PI / 4))
				: this.roundAngle(this.flipAngle);

			const delta = angle - this.flipAngle;

			this.rotateCube(delta, () => {

				this.state = this.gettingDrag ? PREPARING : STILL;
				this.gettingDrag = false;

			});
		};
	}

	rotateLayer(rotation, options = {}) {
		const easing = this.flipEasings[this.flipConfig];
		const duration = options.duration != undefined ? options.duration : this.flipSpeeds[this.flipConfig];
		const onUpdate = (tween) => {
			let deltaAngle = tween.delta * rotation;
			this.group.rotateOnAxis(this.flipAxis, deltaAngle);
		};
		const onComplete = () => {
			this.game.cube.object.rotation.setFromVector3(this.snapRotation(this.game.cube.object.rotation.toVector3()));
			this.group.rotation.setFromVector3(this.snapRotation(this.group.rotation.toVector3()));
			this.deselectLayer(this.flipLayer);
			this.state = STILL;
		};

		if (options.duration === 0) {
			this.group.rotateOnAxis(this.flipAxis, rotation);
			onComplete();
			return;
		}

		this.rotationTween = new Tween({
			easing: easing,
			duration: duration,
			onUpdate: onUpdate,
			onComplete: onComplete,
		});
	}

	rotateCube(rotation, options = {}) {
		const easing = [Easing.Power.Out(4), Easing.Sine.Out(), Easing.Back.Out(2)][this.flipConfig];
		const duration = options.duration != undefined ? options.duration : [100, 150, 350][this.flipConfig];
		const onUpdate = (tween) => {
			this.edges.rotateOnWorldAxis(this.flipAxis, tween.delta * rotation);
			this.game.cube.object.rotation.copy(this.edges.rotation);
		};
		const onComplete = () => {
			this.edges.rotation.setFromVector3(this.snapRotation(this.edges.rotation.toVector3()));
			this.game.cube.object.rotation.copy(this.edges.rotation);
			this.state = STILL;
		};

		if (options.duration === 0) {
			this.edges.rotateOnWorldAxis(this.flipAxis, rotation);
			onComplete();
			return;
		}

		this.rotationTween = new Tween({
			easing: easing,
			duration: duration,
			onUpdate: onUpdate,
			onComplete: onComplete,
		});
	}

	selectLayer(layer) {
		this.group.rotation.set(0, 0, 0);
		this.movePieces(layer, this.game.cube.object, this.group);
		this.flipLayer = layer;
	}

	deselectLayer(layer) {
		this.movePieces(layer, this.group, this.game.cube.object);
		this.flipLayer = null;
	}

	movePieces(layer, from, to) {
		from.updateMatrixWorld();
		to.updateMatrixWorld();

		layer.forEach(index => {
			const piece = this.game.cube.pieces[index];

			piece.applyMatrix4(from.matrixWorld);
			from.remove(piece);
			piece.applyMatrix4(new THREE.Matrix4().getInverse(to.matrixWorld));
			to.add(piece);
		});
	}

	getLayer(move) {
		const scalar = { 2: 6, 3: 3, 4: 4, 5: 3, 6: 2 }[this.game.cube.size];
		const layer = [];

		this.game.cube.pieces.forEach(piece => {
			const piecePosition = piece.position.clone().multiplyScalar(scalar).round();

			if (move.positions.includes(piecePosition[move.axis])) layer.push(piece.name);
		});

		return layer;
	}

	moveLayer(move, options) {
		const layer = this.getLayer(move);

		this.flipAxis = new THREE.Vector3();
		this.flipAxis[move.axis] = 1;
		this.state = ROTATING;

		this.selectLayer(layer);
		this.rotateLayer(move.angle, options);
	}

	moveCube(move, options) {
		this.flipAxis = new THREE.Vector3();
		this.flipAxis[move.axis] = 1;
		this.state = ROTATING;

		this.rotateCube(move.angle, options);
	}

	keyboardMove(type, move, callback) {
		if (this.state !== STILL) return;
		if (this.enabled !== true) return;

		if (type === 'LAYER') {
			this.moveLayer(move)
		} else if (type === 'CUBE') {
			this.moveCube(move)
		}
	}

	getIntersect(position, object, multiple) {
		this.raycaster.setFromCamera(
			this.draggable.convertPosition(position.clone()),
			this.game.world.camera
		);

		const intersect = (multiple)
			? this.raycaster.intersectObjects(object)
			: this.raycaster.intersectObject(object);

		return (intersect.length > 0) ? intersect[0] : false;

	}

	getMainAxis(vector) {
		return Object.keys(vector).reduce(
			(a, b) => Math.abs(vector[a]) > Math.abs(vector[b]) ? a : b
		);
	}

	addMomentumPoint(delta) {
		const time = Date.now();

		this.momentum = this.momentum.filter(moment => time - moment.time < 500);

		if (delta !== false) this.momentum.push({ delta, time });
	}

	getMomentum() {
		const points = this.momentum.length;
		const momentum = new THREE.Vector2();

		this.addMomentumPoint(false);
		this.momentum.forEach((point, index) => {
			momentum.add(point.delta.multiplyScalar(index / points))
		});

		return momentum;
	}

	roundAngle(angle) {
		const round = Math.PI / 2;
		return Math.sign(angle) * Math.round(Math.abs(angle) / round) * round;
	}

	snapRotation(angle) {
		return angle.set(
			this.roundAngle(angle.x),
			this.roundAngle(angle.y),
			this.roundAngle(angle.z)
		);
	}

	convertMove(twist) {
		if (twist.type === TURNS.TYPE) {
			return this.convertTurn(twist);

		} else if (twist.type === ROTATIONS.TYPE) {
			return this.convertRotation(twist);
		}
	}

	convertTurn(turn) {
		const positions = [];
		const invert = turn.direction === DIRECTIONS.CCW ? - 1 : 1;
		const double = turn.direction === DIRECTIONS.FLIP ? 2 : 1;
		const faces = {
			[FACES.BOTTOM]: {
				value: -1,
				direction: -1,
				axis: ROTATIONS.Y
			},
			[FACES.TOP]: {
				value: 1,
				direction: 1,
				axis: ROTATIONS.Y
			},
			[FACES.LEFT]: {
				value: -1,
				direction: -1,
				axis: ROTATIONS.X
			},
			[FACES.RIGHT]: {
				value: 1,
				direction: 1,
				axis: ROTATIONS.X
			},
			[FACES.FRONT]: {
				value: 1,
				direction: 1,
				axis: ROTATIONS.Z
			},
			[FACES.BACK]: {
				value: -1,
				direction: -1,
				axis: ROTATIONS.Z
			},
		};
		const face = faces[turn.face];
		const angle = (Math.PI / - 2) * face.direction * invert * double;

		let value = turn.deep ? 0 : face.value;

		if (this.game.cube.size > 3)
			value = value * 2;

		positions.push(value);

		if (turn.extra) {
			let extraValue = value > 0 ? -1 : 1;

			positions.push(value + extraValue);
		}		

		return { type: TURNS.TYPE, positions, axis: face.axis, angle, name: turn.twist };
	}

	convertRotation(rotation) {
		const invert = rotation.direction === DIRECTIONS.CCW ? - 1 : 1;
		const double = rotation.direction === DIRECTIONS.FLIP ? 2 : 1;
		const angle = (Math.PI / - 2) * invert * double;

		return { type: ROTATIONS.TYPE, axis: rotation.simpleTwist, angle, name: rotation.twist };
	}

	scrambleCube() {
		let count = 0;
		const difficulty = 0;
		const scrambles = {
			2: [7, 9, 11],
			3: [20, 25, 30],
			4: [30, 40, 50],
			5: [40, 60, 80],
			6: [60, 90, 100],
			7: [60, 90, 100],
		};
		const moves = [];
		const scrambleLength = scrambles[this.game.cube.size][difficulty];
		const faces = this.game.cube.size < 4 ? 'UDLRFB' : 'UuDdLlRrFfBb';
		const modifiers = ["", "'", "2"];

		while (count < scrambleLength) {

			const move =
				faces[Math.floor(Math.random() * faces.length)] +
				modifiers[Math.floor(Math.random() * 3)];

			if (count > 0 && move.charAt(0) == moves[count - 1].charAt(0)) continue;
			if (count > 1 && move.charAt(0) == moves[count - 2].charAt(0)) continue;

			moves.push(move);
			count++;
		}

		this.doTwists(moves);
	}

	doTwists(twists = [], options = {}) {
		twists.forEach(t => this.doTwist(t, options));
	}

	doTwist(twist, options = {}) {
		const move = this.convertMove(twist);

		if (options.duration == 0) {
			this.doMove(move, options);
		} else {
			this.queu.unshift([move, options]);
		}
	}

	doMove(move, options) {
		if (move.type === TURNS.TYPE) {
			this.moveLayer(move, options);
		} else if (move.type === ROTATIONS.TYPE) {
			this.moveCube(move, options);
		}
	}

	loop() {
		requestAnimationFrame(this.loop);
		if (this.state === STILL && this.queu.length >= 1) {
			const move = this.queu.pop();

			this.doMove(...move);
		}
	}
}

export { Controls };
