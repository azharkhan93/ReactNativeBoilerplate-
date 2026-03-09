import React, { useState, useEffect } from 'react';
import { Location, TrackingSession } from '@/data/mockTracking';

export const useTrackingSimulation = (initialSession: TrackingSession) => {
    const [currentLocation, setCurrentLocation] = useState<Location>(initialSession.currentLocation);
    const [eta, setEta] = useState(initialSession.estimatedArrivalMinutes);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLocation(prev => {
                // Extremely simple linear interpolation towards destination for mock purposes
                const latDiff = initialSession.destination.latitude - prev.latitude;
                const lngDiff = initialSession.destination.longitude - prev.longitude;

                if (Math.abs(latDiff) < 0.0001 && Math.abs(lngDiff) < 0.0001) {
                    clearInterval(interval);
                    setEta(0);
                    return initialSession.destination;
                }

                return {
                    latitude: prev.latitude + latDiff * 0.1,
                    longitude: prev.longitude + lngDiff * 0.1,
                };
            });

            setEta(prev => Math.max(0, prev - 0.2));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return { currentLocation, eta: Math.round(eta) };
};
