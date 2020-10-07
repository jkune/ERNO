import { Animation } from './Animation.js';
import * as THREE from 'three/src/Three.js';

class World extends Animation {

	constructor(game) {

		super(true);

		this.game = game;
		
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(2, 1, 0.1, 10000);

		this.rendersByKey = {};
		this.stage = { width: 2, height: 3 };
		this.fov = 10;

		this.createLights();

		window.addEventListener('resize', () => this.resizeAll(), false);
	}

	unrender(key) {
		delete this.rendersByKey[key];
	}

	render(element) {
		const render = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		const key = '_' + Math.random().toString(36).substr(2, 9);

		render.setPixelRatio(window.devicePixelRatio);
		element.appendChild(render.domElement);

		this.rendersByKey[key] = render;
		this.resize(render);

		return render.domElement;
	}

	update() {
		Object.values(this.rendersByKey).forEach(r => r.render(this.scene, this.camera));
	}

	resizeAll() {
		Object.values(this.rendersByKey).forEach(r => this.resize(r));
	}

	resize(render) {
		const element = render.domElement;

		this.width = element.parentElement ? element.parentElement.offsetWidth : 0;
		this.height = element.parentElement ? element.parentElement.offsetHeight : 0;

		render.setSize(this.width, this.height);

		this.camera.fov = this.fov;
		this.camera.aspect = this.width / this.height;

		const aspect = this.stage.width / this.stage.height;
		const fovRad = this.fov * THREE.Math.DEG2RAD;

		let distance = (aspect < this.camera.aspect)
			? (this.stage.height / 2) / Math.tan(fovRad / 2)
			: (this.stage.width / this.camera.aspect) / (2 * Math.tan(fovRad / 2));

		distance *= 0.5;

		this.camera.position.set(distance, distance, distance);
		this.camera.lookAt(this.scene.position);
		this.camera.updateProjectionMatrix();

		const docFontSize = (aspect < this.camera.aspect)
			? (this.height / 100) * aspect
			: this.width / 100;

			element.style.fontSize = docFontSize + 'px';
	}

	createLights() {
		const ambientColor = 0xffffff;
		const frontColor = 0xffffff;
		const backColor = 0xffffff;

		const ambientIntensity = 0.35;//0.35;
		const frontIntensity = 0.8;//0.8;
		const backIntensity = 0.45;//0.5;

		const frontPosition = [1.5, 5, 3];
		const backPosition = [-1.5, -5, -3];


		this.lights = {
			holder: new THREE.Object3D,
			ambient: new THREE.AmbientLight(ambientColor, ambientIntensity),
			front: new THREE.DirectionalLight(frontColor, frontIntensity),
			back: new THREE.DirectionalLight(backColor, backIntensity),
		};

		this.lights.front.position.set(...frontPosition);
		this.lights.back.position.set(...backPosition);

		this.lights.holder.add(this.lights.ambient);
		this.lights.holder.add(this.lights.front);
		this.lights.holder.add(this.lights.back);

		this.scene.add(this.lights.holder);
	}
}

export { World };
