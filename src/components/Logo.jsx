import React from 'react';
import Spline from '@splinetool/react-spline';

export function Logo({ width = '100%' }) {
    return (
        <div style={{ width, height: '100%' }}>
            <Spline scene="https://prod.spline.design/lj12tc51oBFjrXVv/scene.splinecode" />
        </div>
    );
}

export default Logo;
