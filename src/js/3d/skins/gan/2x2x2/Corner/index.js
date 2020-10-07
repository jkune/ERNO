const Corner = {
    file: 'corner_gan.glb',
    pieceRotation: [
        [0, 0, 0],
        [- 1 / 2, 0, 1 / 2],
        [1 / 2, - 1 / 2, 0],
    ],
    pieceRotationOdd: [
        [0, 0, 0],
        [1 / 2, - 1 / 2, 0],
        [- 1 / 2, 0, 1 / 2],
    ],
    groupRotation: {
        LDB: [1, 0, 0],
        LDF: [0.5, 0, 0],
        LUB: [-0.5, 0, 0],
        LUF: [0, 0, 0],
        RDB: [0.5, 0, 1],
        RDF: [0, 0, 1],
        RUB: [0, 1, 0],
        RUF: [0.5, 1, 0],
    },
    logoGroup: {
        RUB: 1
    },
    logoSize: 0.15,
    stickerGeometry: {
        edgeCornerRoundness: 0.08,
        edgeScale: 0.80,
        edgeDepth: 0.002,
    },
    name: 'CORNER',
};

export {
    Corner
}