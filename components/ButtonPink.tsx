import React, { useState } from 'react';

const ButtonPink = ({ title, color, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            type="submit"
            style={{
                background: 'none',
                border: 'none',
                padding: '0',
                position: 'relative',
                overflow: 'hidden',
                color: 'white',
            }}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                {!isHovered ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="200.627" height="48.135" viewBox="0 0 200.627 48.135">
                        <svg xmlns="http://www.w3.org/2000/svg" width="200.627" height="48.135" viewBox="0 0 200.627 48.135">
                            <g id="Component_3_12" data-name="Component 3 – 12" transform="translate(1 1)">
                                <g id="Component_1_1" data-name="Component 1 – 1">
                                    <g id="Group_760" data-name="Group 760">
                                        <path
                                            id="Path_1029"
                                            data-name="Path 1029"
                                            d="M199.377,46.886H34.488L21.818,36.223H.75V.75H169.988l12.669,13.875h16.719Z"
                                            transform="translate(-0.75 -0.75)"
                                            fill="none"
                                            stroke="#ff1299"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        />
                                        <path
                                            id="Path_1176"
                                            data-name="Path 1176"
                                            d="M16.893,19.453"
                                            transform="translate(167.253 -7.765)"
                                            fill="none"
                                            stroke="#ff1299"
                                            strokeWidth="2"
                                        />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="200.627" height="48.135" viewBox="0 0 200.627 48.135">
                        <svg xmlns="http://www.w3.org/2000/svg" width="200.627" height="48.135" viewBox="0 0 200.627 48.135">
                            <g id="Component_3_12" data-name="Component 3 – 12" transform="translate(1 1)">
                                <g id="Component_1_1" data-name="Component 1 – 1">
                                    <g id="Group_760" data-name="Group 760">
                                        <path
                                            id="Path_1029"
                                            data-name="Path 1029"
                                            d="M199.377,46.886H34.488L21.818,36.223H.75V.75H169.988l12.669,13.875h16.719Z"
                                            transform="translate(-0.75 -0.75)"
                                            fill="#ff1299"
                                            stroke="#ff1299"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        />
                                        <path
                                            id="Path_1176"
                                            data-name="Path 1176"
                                            d="M16.893,19.453"
                                            transform="translate(167.253 -7.765)"
                                            fill="#ff1299"
                                            stroke="#ff1299"
                                            strokeWidth="2"
                                        />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </svg>
                )}
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontWeight: 'bold',
                    }}
                >
                    {title}
                </span>
            </div>
        </button>
    );
};

export default ButtonPink;
