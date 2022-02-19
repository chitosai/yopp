import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/modal';
import {UserType} from '../type';
import { get, getToken } from '../utils';

export default function User() {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserType | null>(null);

    // check if token exists on page show
    useEffect(() => {
        const token = getToken();
        if (!token) {
            return navigate('/preauth');
        } else {
            get('/user', {token}).then((res) => {
                if (res.status !== 200) {
                    return navigate('/preauth');
                }
                return res.json();
            }).then((user) => {
                setUser(user);
            });
        }
    }, [navigate]);

    return (
        <div className='page'>
            <Modal>
                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <p style={{fontSize: 30, fontWeight: 'bold'}}>Welcome, {user?.name}!</p>
                </div>
            </Modal>
        </div>
    );
}