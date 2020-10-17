function isFaceDone(args) {
    return args.faces.some((face, color) => {
        const faceDone = face.every((value, position) => {
            return value == face[0];
        });
    
        if (!args.baseFace && faceDone) {
            args.setBaseFace(color);
        }

        return faceDone;
    });
}

export { isFaceDone };