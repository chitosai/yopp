import React from 'react';
import Modal from '../components/modal';

export default function PreAuth() {
    return (
        <div className='page'>
            <Modal>
                <Modal.Title>Welcome!</Modal.Title>
                <Modal.Desc>Please enter your email to proceed.</Modal.Desc>
                <Modal.Input placeholder='Email' />
                <Modal.Button text='Next' />
            </Modal>
        </div>
    );
}