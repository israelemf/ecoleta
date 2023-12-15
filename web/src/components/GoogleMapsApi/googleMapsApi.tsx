import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

export default function GoogleMapsApi() {

    interface Mark {
        lat: number;
        lng: number;
    }

    const center = { lat: -25.4880189, lng: -49.355163 }

    const [mark, setMark] = useState<Mark>({ lat: -25.4880189, lng: -49.355163 })
    const [marker, setMarker] = useState(false);

    useEffect(() => {

        setMark({ lat: -25.4880189, lng: -49.355163 });

    }, [])

    return (
        <LoadScript googleMapsApiKey="AIzaSyA_WC7fO9PYuaWNHV4Bg5nw_Q_O6VLzLfo" >
            <GoogleMap
                center={center}
                zoom={13}
                mapContainerStyle={{ height: '500px', marginBottom: '20px' }}
                onClick={(e) => {
                    const teste = { lat: e.latLng!.lat(), lng: e.latLng!.lng() }
                    setMark(teste)
                }}
            >
                <Marker
                    visible={true}
                    onLoad={marker => {
                        marker.setVisible(true);
                    }}
                    position={mark}
                />
            </GoogleMap>
        </LoadScript >
    )
}