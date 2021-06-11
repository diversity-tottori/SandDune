function createRealtimeLayer(url, container) {
    return L.realtime(url, {
        interval: 5 * 1000,
        getFeatureId: function(f) {
            return f.properties.id;
        },
        cache: true,
        container: container,
        onEachFeature(f, l) {
            date = f.properties.date;
            l.bindPopup(date);
            l.on("mouseover", function () {
                l.openPopup();
            });
            l.on("mouseout", function () {
                l.closePopup();
            });
        }
    });
}
    realtime1 = createRealtimeLayer('getPosition').addTo(map),
    realtime2 = createRealtimeLayer('getUserPositionHistory').addTo(map);

L.control.layers(null, {
    'Current': realtime1,
    'History': realtime2
}).addTo(map);

realtime1.once('update', function() {
    map.fitBounds(realtime1.getBounds(), {maxZoom: 18});
});
