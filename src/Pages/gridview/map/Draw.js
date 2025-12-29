import { Polygon } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { markers } from '../markers';

export default function MapPolygon() {
  const valueForLocationSearch = useSelector((state) => state.location.LocationSearch);
  const [boundaries, setBoundaries] = useState([]); 
  const [insideMarkers, setInsideMarkers] = useState([]);
   useEffect(() => {
    const fetchBoundaries = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${valueForLocationSearch.value}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
 
        if (data.results && data.results.length > 0) {
          const geometry = data.results[0].geometry;
          if (geometry.bounds) {
            const { northeast, southwest } = geometry.bounds;
            const path = [
              { lat: northeast.lat, lng: northeast.lng },
              { lat: northeast.lat, lng: southwest.lng },
              { lat: southwest.lat, lng: southwest.lng },
              { lat: southwest.lat, lng: northeast.lng },
              { lat: northeast.lat, lng: northeast.lng },
            ];
            setBoundaries(path);
          } else {
            console.error('No bounds found in response.');
          }
        } else {
          console.error('No results found.');
        }
      } catch (error) {
        console.error('Error fetching boundary data:', error);
      }
    };

    if (valueForLocationSearch) {
      fetchBoundaries();
    }
  }, [valueForLocationSearch]);

  useEffect(() => {
    if (window.google && window.google.maps && boundaries.length > 0) {
      const google = window.google;
      const polygon = new google.maps.Polygon({ paths: boundaries });

      const markersInside = markers.filter(marker =>
        google.maps.geometry.poly.containsLocation((marker.position), polygon)
      );

      setInsideMarkers(markersInside);
    }
  }, [boundaries]);

  return (
    <div>
      {boundaries.length > 0 && (
        <Polygon
          path={boundaries}
          options={{
            fillColor: '#2f4833ab',
            fillOpacity: 0.4,
            strokeColor: '#2b2e3a',
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
      )}
    </div>
  );
}
