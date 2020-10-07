const Cube = { 
    file: 'cube_gan.glb',
    pieceRotation: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0.5],
        [0, 0, - 0.5],
        [0, - 0.5, 0],
        [0, 0.5, 0],
    ],
    groupRotation: {
        LRDUBF: [0, 0, 0],
    },
    logoGroup: {
        LRDUBF: 3
    },
    logoSize: 0.17,
    stickerGeometry: {
        edgeCornerRoundness: 0.08,
        edgeScale: 0.80,
        edgeDepth: 0.002,
    },
    name: 'CUBE',
}

export {
    Cube,
}
