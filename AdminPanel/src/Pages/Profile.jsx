import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = "http://localhost:8080/api";
                const { data: res } = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile(res);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError("Could not fetch profile data");
            }
        };

        fetchProfileData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Profile Information</h1>
            {error && <div className={styles.error_msg}>{error}</div>}
            {!error && (
                <div className={styles.profile_container}>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Device ID:</strong> {profile.deviceId}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
