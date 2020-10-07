const Edge = {
    file: 'edge_gan.glb',
    pieceRotation: [
        [0, 0, 0],
        [0, 1, - 1 / 2],
    ],
    groupRotation: {
        LD: [0, 1, 1],
        LB: [0.5, 1, 1],
        LF: [-0.5, 1, 1],
        LU: [1, 1, 1],
        DB: [0, -0.5, 0.5],
        DF: [0, 0.5, 0.5],
        UB: [1, 0.5, 0.5],
        UF: [1, -0.5, 0.5],
        RD: [0, 0, 1],
        RB: [0.5, 0, 1],
        RF: [-0.5, 0, 1],
        RU: [0, 1, 0],
    },
    stickerGeometry: {
        edgeCornerRoundness: 0.12,
        edgeScale: 0.80,
        edgeDepth: 0.002,
        curve: 0.05,
        groupRotation: {
            LD: [2, 1],
            LB: [1, -1],
            LF: [-1, 1],
            LU: [0, 1],
            DB: [2, 2],
            DF: [0, 2],
            UB: [0, 0],
            UF: [2, 0],
            RD: [2, -1],
            RB: [-1, 1],
            RF: [1, -1],
            RU: [0, -1],
        }
    },
    name: 'EDGE',
}

export {
    Edge
}