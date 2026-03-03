import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

interface PolygonBackgroundProps {
    variant: 'primary' | 'outlined' | 'disabled';
    width: number;
    height: number;
}

export const PolygonBackground: React.FC<PolygonBackgroundProps> = ({ variant, width, height }) => {
    const cornerSize = 12;

    // Define the path for a rectangle with clipped top-left and bottom-right corners
    const path = `
    M ${cornerSize} 0 
    H ${width} 
    L ${width} ${height - cornerSize} 
    L ${width - cornerSize} ${height} 
    H 0 
    L 0 ${cornerSize} 
    Z
  `;

    const getColors = () => {
        switch (variant) {
            case 'primary':
                return ['#1e3a8a', '#1e40af']; // Blue 900 to Blue 800 (Dark Blue)
            case 'outlined':
                return ['#3b82f6', '#1e40af'];
            case 'disabled':
                return ['#0f172a', '#1e293b']; // Slate 950 to 800
            default:
                return ['#1e3a8a', '#1e40af'];
        }
    };

    const colors = getColors();

    return (
        <View style={[StyleSheet.absoluteFill, { width, height }]}>
            <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor={colors[0]} stopOpacity="1" />
                        <Stop offset="100%" stopColor={colors[1]} stopOpacity="1" />
                    </LinearGradient>

                    <LinearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor="#1e3a8a" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                    </LinearGradient>
                </Defs>

                {variant === 'outlined' ? (
                    <>
                        {/* Inner Fill for outlined */}
                        <Path
                            d={path}
                            fill="#000000"
                        />
                        {/* Border for outlined */}
                        <Path
                            d={path}
                            fill="none"
                            stroke="url(#borderGrad)"
                            strokeWidth="2"
                        />
                    </>
                ) : (
                    <Path
                        d={path}
                        fill="url(#grad)"
                    />
                )}
            </Svg>
        </View>
    );
};
