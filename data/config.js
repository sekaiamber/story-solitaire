define({
    __version__: '0.0.1',
    ui: {
        ua: navigator.userAgent.toLowerCase(),
        target: '#main',
        moveTarget: '#content',
        dragTop: '1rem',
        dragBottom: '15rem',
        maxinputcount: 200,
        getNextPassagesSize: 4,
        bgImageSpeed: 0.5,
    },
    route: {
        getNextPassages: './api/getnextpassages/%id.json'
    },
});