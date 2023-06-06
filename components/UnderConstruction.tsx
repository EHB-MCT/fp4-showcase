import Image from 'next/image';
import React from 'react';
import styles from '../styles/under-construction.module.css';

const UnderConstruction: React.FC = () => {
    return (
        <div className={`container ${styles.container}`}>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 text-center">
                    <Image
                        src="https://i.ibb.co/9tkn63r/Road-Under-Construction-PNG.png"
                        alt="Under Construction"
                        width={300}
                        height={500}
                        className={`img-fluid mb-4 ${styles.imgFluid}`}
                    />
                    <h1 className={`mb-3 ${styles.heading} ${styles.title}`}>Page is under construction</h1>
                    <p className={`lead ${styles.lead} ${styles.description}`}>
                        We apologize for the inconvenience. This page is currently under construction and will be available soon.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UnderConstruction;
