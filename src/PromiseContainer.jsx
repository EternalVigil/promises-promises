import React, { useState } from 'react';
import axios from 'axios';

const url = 'https://www.boredapi.com/api/activity';

export const PromiseContainer = () => {
    const [fetchedData, setFetchedData] = useState(null);
    const [loading, setLoading] = useState(false);

    const vanillaGet = () => {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            const params = '';
            request.open('GET', `${url}${params}`);
            setLoading(true);

            request.onload = () => {
                if(request.status === 200) {
                    resolve(request.response);
                    setLoading(false);
                } else {
                    setLoading(false);
                    reject(Error(request?.statusText));
                }
            };

            request.send();
        });
    };

    const handleVanillaGet = async () => {
        await vanillaGet().then((response) => {
            return JSON.parse(response);
        }).then((data) => {
            setFetchedData(data);
        });
    };

    const fetchGet = async () => {
        await fetch(url).then((response) => {
            return response.json();
        })
        .then((data) => {
            setFetchedData(data);
        })
    };

    const axiosGet = async () => {
        setLoading(true);
        return await axios.get(url, { params: {} })
            .then((response) => {
                setFetchedData(response?.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    };

    const handleClearData = () => {
        setFetchedData(null);
    };

    return(
        <div>
            Promises go here
            <div>
                <button onClick={handleVanillaGet}>
                    Vanilla Promise
                </button>
            </div>
            <div>
                <button onClick={fetchGet}>
                    Fetch Promise
                </button>
            </div>
            <div>
                <button onClick={axiosGet}>
                    Axios Promise
                </button>
            </div>
            <div>
                <button onClick={handleClearData}>
                    Clear Data
                </button>
            </div>
            <div>
                <div>
                    Status: {loading ? 'request in flight' : 'inactive'}
                </div>
                <div>
                    Received Data
                </div>
                <div>
                    Activity: {fetchedData?.activity}
                </div>
            </div>
        </div>
    );
};