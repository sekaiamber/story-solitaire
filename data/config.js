define({
    __version__: '0.0.1',
    ui: {
        target: '#main',
        moveTarget: '#content',
        dragTop: 200,
        dragBottom: 400,
        maxinputcount: 200,
        getNextPassagesSize: 4,
    },
    route: {
        getNextPassages: '/api/getnextpassages/%id.json'
    }
});