import React, {useState} from 'react';
import {useNavigate} from "react-router-dom"; 
import Modal from '../components/modal';
import {get, post, saveToken} from '../utils';

export default function PreAuth() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailVeried, setEmailVerified] = useState(false);

    async function submit() {
        if (!email) {
            return alert('Please enter your email');
        }
        if (!email.includes('@')) {
            return alert('Not a valid email');
        }

        if (!emailVeried) {
            // verify whether emial exists first
            const res = await get('/preauth', {
                email,
            });
            const r: {exists: boolean;} = await res.json();
            if (!r.exists) {
                navigate('/registration');
            } else {
                setEmailVerified(true);
            }
        } else {
            // then verify email & password
            const res = await post('/sign-in', {
                email,
                password,
            });
            const r = await res.json();
            if (res.status === 200 && r.success) {
                saveToken(r.token);
                navigate('/user');
            } else {
                return alert('Email and password don\'t match');
            }
        }
    }

    return (
        <div className='page'>
            <Modal>
                <Modal.Title>{emailVeried ? 'Sign-in' : 'Welcome!'}</Modal.Title>
                <Modal.Desc>{emailVeried ? 'Please enter your password' : 'Please enter your email to proceed.'}</Modal.Desc>
                <Modal.Input placeholder='Email' onChange={setEmail} disabled={emailVeried} />
                {emailVeried ? <Modal.Input type='password' placeholder='Password' onChange={setPassword} /> : null}
                <Modal.Button text='Next' onClick={submit} />
            </Modal>
        </div>
    );
}