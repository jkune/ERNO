import { Piece } from '../Piece/index.js';
import { GAN } from '../skins/index.js';
import * as THREE from 'three/src/Three.js';

class Cube {

	constructor(game) {
		this.game = game;
		this.size = this.game.options.size || 3;
		this.skin = GAN;

		this.holder = new THREE.Object3D();
		this.object = new THREE.Object3D();
		this.animator = new THREE.Object3D();

		this.holder.add(this.animator);
		this.animator.add(this.object);
		this.game.world.scene.add(this.holder);
		this.resolvePromise = null;
	}

	initDeferred() {
		this.game.isInitiated = new Promise((res, rej) => {
			this.resolvePromise = res;
		});	
	}

	async init() {
		this.initDeferred();

		this.object.children = [];
		this.object.userData = {
			stickers: [],
			pieces: [],
		};
		
		this.object.add(this.game.controls.group);

		switch (this.size) {
			case 1:
				this.scale = 1.75;
				break;
			case 2:
				this.scale = 1.25;
				break;
			case 3:
				this.scale = 1;
				break;
			default:
				this.scale = this.scale = 3 / this.size;
				break;
		} 

		this.object.scale.set(this.scale, this.scale, this.scale);

		const controlsScale = this.size === 2 ? 0.825 : 1;
		this.game.controls.edges.scale.set(controlsScale, controlsScale, controlsScale);

		this.generatePositions();
		await this.generateModel();

		this.pieces.forEach(piece => {
			this.object.add(piece);
			this.object.userData.stickers = this.object.userData.stickers.concat(piece.userData.stickers);
			this.object.userData.pieces = this.object.userData.pieces.concat(piece.userData.pieces);
		});

		this.holder.traverse(node => {
			if (node.frustumCulled) node.frustumCulled = false;
		});

		this.updateSkin(this.skin.colors);
		this.resolvePromise();
	}

	async resize(newSize) {
		if (this.size == newSize) return

		this.size = newSize;
		this.reset();
		await this.init();
	}

	reset() {
		this.game.controls.edges.rotation.set(0, 0, 0);
		this.holder.rotation.set(0, 0, 0);
		this.object.rotation.set(0, 0, 0);
		this.animator.rotation.set(0, 0, 0);

		this.pieces.forEach(piece => {
			piece.position.set(...piece.userData.start.position.toArray());
			piece.rotation.set(...piece.userData.start.rotation.toArray());
		});
	}

	generatePositions() {
		const m = this.size - 1;
		const first = this.size % 2 !== 0
			? 0 - Math.floor(this.size / 2)
			: 0.5 - this.size / 2;

		let x, y, z;

		this.positions = [];

		for (x = 0; x < this.size; x++) {
			for (y = 0; y < this.size; y++) {
				for (z = 0; z < this.size; z++) {
					let position = new THREE.Vector3(first + x, first + y, first + z);
					let edges = [];

					if (x == 0) edges.push(0);
					if (x == m) edges.push(1);
					if (y == 0) edges.push(2);
					if (y == m) edges.push(3);
					if (z == 0) edges.push(4);
					if (z == m) edges.push(5);

					position.edges = edges;
					this.positions.push(position);
				}
			}
		}
	}

	async generateModel() {
		this.pieces = [];
		this.edges = [];
		
		let logo = false;

		for (let index = 0; index < this.positions.length; index ++) {
			const position = this.positions[index];
			
			const piece = new Piece({
				index: index,
				position: position,
				faces: position.edges,
				logo: logo,
				skin: {
					pieces: GAN.sizes[this.size],
					logo: GAN.logo,
				}
			});

			await piece.assemble();

			this.pieces.push(piece.object);
		}
	}

	updateSkin(colors) {
		this.object.userData.stickers.forEach((sticker) => {
			sticker.visible = !this.game.options.stickerless;
			sticker.material.color.setStyle('#' + colors[sticker.name]);
		});
		this.object.userData.pieces.forEach((piece) => {
			const pieceColor = this.game.options.stickerless ? colors[piece.userData.face] : colors.P;

			piece.material.color.setStyle('#' + pieceColor);
		});
	}
}

export { Cube };
