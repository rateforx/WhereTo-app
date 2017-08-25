/**
 * Created by Snippy on 2017-08-25.
 */

function initMap() {
    let service = new google.maps.DirectionsService;
    let renderer = new google.maps.DirectionsRenderer;
    let map = new google.maps.Map($('#map')[0], {
        zoom: 16,
        center: { lat: 50.474732, lng: 17.337606 }
    });
    let originInput = $('#origin')[0];
    let destInput = $('#dest')[0];
    let originAutocomplete = new google.maps.places.Autocomplete(originInput);
    let destAutocomplete = new google.maps.places.Autocomplete(destInput);

    originAutocomplete.bindTo('bounds', map);
    destAutocomplete.bindTo('bounds', map);

    let marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    function onPlaceChanged(inputAutocpmplete) {
        marker.setVisible(false);
        // let place = originAutocomplete.getPlace();
        let place = inputAutocpmplete.getPlace();

        console.log('Place: ' + place);
        if (!place.geometry) {
            console.log('No details available for input: "' + place.name + '".');
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(13); //closeAF
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        //TODO wypełnianie pól forma
    }

    originAutocomplete.addListener('place_changed', () => {
        onPlaceChanged(originAutocomplete);
    });
    destAutocomplete.addListener('place_changed', () => {
        onPlaceChanged(destAutocomplete);
    });

    renderer.setMap(map);

    let onChangeHandler = function () {
        calcRoute(service, renderer);
    };
    let inputs = $('#origin, #dest');
    inputs.on('change', onChangeHandler);
}

function calcRoute(service, renderer) {
    let origin = $('#origin').val();
    let dest = $('#dest').val();
    if (origin !== '' && dest !== '') {
        service.route({
            origin: origin,
            destination: dest,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                renderer.setDirections(response);
                console.log('Route::');
                console.log(response);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }
}