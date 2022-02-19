import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from '../components/modal';
import { post, saveToken } from '../utils';

export default function Registration() {
    const location = useLocation() as {state: {email?: string;}};
    const initialEmail = location.state?.email || '';
    const navigate = useNavigate();
    
    const [email, setEmail] = useState(initialEmail);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function submit() {
        if (!email) {
            return alert('Please enter your email');
        }
        if (!email.includes('@')) {
            return alert('Not a valid email');
        }
        if (!username) {
            return alert('Please enter your name');
        }
        if (!password) {
            return alert('Please enter a password');
        }

        const res = await post('/register', {
            email, username, password
        });
        const r = await res.json();
        if (res.status === 400 || !r.success) {
            return alert('Email already registered');
        }
        if (r.success && r.token) {
            saveToken(r.token);
            navigate('/user');
        }
    }

    return (
        <div className='page'>
            <Modal>
                <Modal.Title>Register</Modal.Title>
                <Modal.Desc>Please enter the following to sign up</Modal.Desc>
                <Modal.Input defaultValue={email} placeholder='Email' onChange={setEmail} />
                <Modal.Input placeholder='Name' onChange={setUsername} />
                <Modal.Input type='password' placeholder='Password' onChange={setPassword} />
                <Modal.Button text='Next' onClick={submit} />
            </Modal>
        </div>
    );
}