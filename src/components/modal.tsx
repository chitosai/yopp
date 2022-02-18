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
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange: (text: string) => void;
}

Modal.Input = function({type = 'text', placeholder = '', disabled = false, onChange}: InputProps) {
    function _onChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e?.target?.value || '');
    }
    return (
        <input type={type} className={styles.input} placeholder={placeholder} disabled={disabled} onChange={_onChange} />
    );
}

export type ButtonProps = {
    text: string;
    onClick: () => void;
}

Modal.Button = function({text, onClick}: ButtonProps) {
    return (
        <button className={styles.button} onClick={onClick}>{text}</button>
    );
}