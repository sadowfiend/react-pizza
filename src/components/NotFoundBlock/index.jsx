import React from 'react';

import styles from './index.module.scss'

function NotFoundBlock(props) {
    console.log(styles)
    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span>
                <br/>
                Ничего не найдено
            </h1>
            <p>
                К сожалению данная страница отсутствует в нашем интернет-магазине
            </p>
        </div>
    );
}

export default NotFoundBlock;