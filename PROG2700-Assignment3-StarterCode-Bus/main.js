// IIFE
(() => {

    //create map in leaflet and tie it to the div called 'theMap'
    let map = L.map('theMap').setView([44.650627, -63.597140], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    L.marker([44.650690, -63.596537]).addTo(map)
        .bindPopup('This is a sample popup. You can put any html structure in this including extra bus data. You can also swap this icon out for a custom icon. A png file has been provided for you to use if you wish.')
        .openPopup();




        async function update_bus_data()
        {
            var raw_data = await fetch("https://prog2700.onrender.com/hrmbuses");
            var data = await raw_data.json();
            var selected_routes = data.entity.filter((x) => x.vehicle.trip.routeId <= 10);

            map.eachLayer(function (layer) 
            {
                if (layer instanceof L.Marker) 
                {
                    map.removeLayer(layer);
                }
            });

            selected_routes.map((route) =>
            {
                var geojsonFeature = 
                {
                    "type": "Feature",
                    "properties":{},
                    "geometry": 
                    {
                        "type": "Point",
                        "coordinates": [route.vehicle.position.longitude, route.vehicle.position.latitude]
                    }

                }

                var custom_icon = L.icon({
                    iconUrl: 'bus.png',
                    // the icon is 100 * 102
                    iconSize: [50,51],
                    iconAnchor: [25,25.5],
                    popupAnchor: [0,-25.5]
                    });

                L.geoJSON(geojsonFeature,{ pointToLayer: function(feature,latlng){return L.marker(latlng,{icon: custom_icon,rotationAngle:route.vehicle.position.bearing})}}).addTo(map).bindPopup("Vehicle ID : " + route.vehicle.vehicle.id + "<br>Route ID : " + route.vehicle.trip.routeId + "<br>Speed : " + route.vehicle.position.speed + "<br>Heading : " + route.vehicle.position.bearing);
                return route;
            });
            console.log(selected_routes);
            await new Promise(r => setTimeout(r, 10000));
            update_bus_data();

        }
        

        update_bus_data();
})()