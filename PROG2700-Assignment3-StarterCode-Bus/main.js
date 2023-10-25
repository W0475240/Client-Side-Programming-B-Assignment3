// IIFE
(() => {

    //create map in leaflet and tie it to the div called 'theMap'
    let map = L.map('theMap').setView([44.650627, -63.597140], 14);

    // Adding a title layer use of the openstreetmap data
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    L.marker([44.650690, -63.596537]).addTo(map)
        .bindPopup('This is a sample popup. You can put any html structure in this including extra bus data. You can also swap this icon out for a custom icon. A png file has been provided for you to use if you wish.')
        .openPopup();



        // an asynchronous function to update bus data
        async function update_bus_data()
        {
            // Fetch bus data from a remote API.
            var raw_data = await fetch("https://prog2700.onrender.com/hrmbuses");
            var data = await raw_data.json();
            // Filter the data to select only routes with a routeId less than or equal to 10.
            var selected_routes = data.entity.filter((x) => x.vehicle.trip.routeId <= 10);

           
})()