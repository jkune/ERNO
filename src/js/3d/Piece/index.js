import { RoundedPlaneGeometry } from './geometry/RoundedPlaneGeometry.js';
import { loadModel } from './util/index.js';
import { TURNS } from '../../util/index.js'
import * as THREE from 'three/src/Three.js';

const PIECE_TYPE = {
    0: 'Core',
    1: 'Center',
    2: 'Edge',
    3: 'Corner',
    6: 'Cube',
}

class Piece {

    constructor(options = {}) {
        this.faces = [];
        this.options = options;
        this.pieceSize = 1 / 6;
        
        this.object = new THREE.Object3D();
        this.group = new THREE.Group();

        this.pieceType = this.options.skin.pieces[PIECE_TYPE[this.options.faces.length]];
        this.object.position.copy(this.options.position.clone().divideScalar(3));
        this.init();
    }

    init() {
        this.object.name = this.options.index;
        this.object.userData.pieces = [];
        this.object.userData.stickers = [];
        this.object.userData.cube = this.group;
        this.object.userData.start = {
            position: this.object.position.clone(),
			rotation: this.object.rotation.clone(),
        }
    }

    async assemble() {
        const faces = [TURNS.L, TURNS.R, TURNS.D, TURNS.U, TURNS.B, TURNS.F];
        const group = this.options.faces.map(e => faces[e]).join('');
        const rotation = group ? this.pieceType.groupRotation[group].map(e => e * Math.PI) : null;
        const logoGroup = group && this.pieceType.logoGroup ? this.pieceType.logoGroup[group] : null;

        for (let index = 0; index < this.options.faces.length; index ++) {
            const rotationMap = this.options.faces.length === 3 && this.options.faces.reduce((t, a)=> a + t, 0) % 2 === 0 
                ? this.pieceType.pieceRotationOdd 
                : this.pieceType.pieceRotation;
            const face = this.options.faces[index];
            const model = await loadModel(this.pieceType.file);
            const pieceRotation = rotationMap[index].map(e => e * Math.PI);
            const stikerRotationZ = this.pieceType.stickerGeometry && this.pieceType.stickerGeometry.groupRotation ? this.pieceType.stickerGeometry.groupRotation[group][group.indexOf(faces[face])] : 0;
            const sticker = this.makeSticker({ face: face, geometry: this.pieceType.stickerGeometry, rotation_z: stikerRotationZ });
            const isLogo = logoGroup === index;

            if (isLogo) {
                const logo = this.makeLogo({ size: this.pieceType.logoSize });

                this.object.add(logo);
            }

            sticker.name = faces[face];

            model.rotation.set(...pieceRotation);
            model.userData.face = faces[face];

            this.object.add(sticker);
            this.group.add(model);

            this.object.userData.pieces.push(model);
            this.object.userData.stickers.push(sticker);
        }

        if (rotation) this.group.rotation.set(...rotation);

        this.group.scale.set(this.pieceSize, this.pieceSize, this.pieceSize);
        this.object.add(this.group);
    }

    makeSticker(args) {
        const edgeGeometry = RoundedPlaneGeometry(
            this.pieceSize * 2,
            args.geometry.edgeCornerRoundness,
            args.geometry.edgeDepth,
            args.geometry.curve
        );
        const material = new THREE.MeshLambertMaterial();
        const mesh = new THREE.Mesh(edgeGeometry, material);
        const distance = this.pieceSize;

        mesh.position.set(
            distance * [- 1, 1, 0, 0, 0, 0][args.face],
            distance * [0, 0, - 1, 1, 0, 0][args.face],
            distance * [0, 0, 0, 0, - 1, 1][args.face]
        );

        mesh.rotation.set(
            Math.PI / 2 * [0, 0, 1, - 1, 0, 0][args.face],
            Math.PI / 2 * [- 1, 1, 0, 0, 2, 0][args.face],
            Math.PI / 2 * args.rotation_z
        );

        mesh.scale.set(
            args.geometry.edgeScale,
            args.geometry.edgeScale,
            args.geometry.edgeScale
        );

        return mesh;
    }

    makeLogo(args) {
        const geometry = new THREE.PlaneBufferGeometry(args.size, args.size, 1, 1);
        const threeTexture = new THREE.TextureLoader().load('/assets/img/' + this.options.skin.logo);
        const material = new THREE.MeshBasicMaterial({
            map: threeTexture,
            transparent: true,
        });

        material.needsUpdate = true;
        geometry.rotateX(Math.PI / -2);
        geometry.translate(0, 0.17, 0);

        return new THREE.Mesh(geometry, material);
    }
}

export { Piece }