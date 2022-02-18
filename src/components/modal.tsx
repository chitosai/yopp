import React from 'react';
import styles from './css/modal.module.css';

export default function Modal({children}: {children: React.ReactNode;}) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
}

Modal.Title = function({children}: {children: string;}) {
    return (
        <p className={styles.title}>{children}</p>
    )
}

Modal.Desc = function({children}: {children: string;}) {
    return (
        <p className={styles.desc}>{children}</p>
    )
}

export type InputProps = {
    placeholder?: string;
}

Modal.Input = function({placeholder = ''}: InputProps) {
    return (
        <input className={styles.input} placeholder={placeholder} />
    );
}

export type ButtonProps = {
    text: string;
}

Modal.Button = function({text}: ButtonProps) {
    return (
        <button className={styles.button}>{text}</button>
    );
}