import { World } from './plugins/World.js';
import { Cube } from './plugins/Cube.js';
import { Controls } from './plugins/Controls.js';
import { Themes } from './plugins/Themes.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Cube3D {

	constructor(options = {}) {
		this.options = options;
		this.world = new World(this);
		this.cube = new Cube(this);
		this.controls = new Controls(this);
		this.themes = new Themes(this);
		this.cube.init();
	}

	unrender(key) {
		this.world.unrender(key);
	}

	render(element, options = {}) {
		const render = this.world.render(element, options.key);

		if (options.drag) {
			this.controls.initDraggable(render);
			// const orbitControl = new OrbitControls(this.world.camera, render);

			// orbitControl.enablePan = false;
			//orbitControl.enableZoom = false;
		}

		return render.domElement;
	}
}

export { Cube3D }
