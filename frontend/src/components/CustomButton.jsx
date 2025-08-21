import React from 'react';
import PropTypes from 'prop-types';
import './CustomButton.css'; // Import the CSS file for styling

const CustomButton = ({ children, onClick, variant = 'primary', size = 'lg', className = '', ...props }) => {
    return (
        <button
            className={`custom-button ${variant} ${size} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

CustomButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'outline']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
};

export default CustomButton;