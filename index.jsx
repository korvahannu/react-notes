import React, { useEffect, useState } from 'react';

const App = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        // https://developer.mozilla.org/en-US/docs/Web/API/AbortController
        // https://www.youtube.com/watch?v=Fhu5cu864ag
        const controller = AbortController();
        const signal = controller.signal();

        fetch('https://swapi.dev/api/people/1/', { signal })
            .then(response => response.json())
            .then((data)=> {
                if (!isCancelled) {
                    setData(data);
                }
            })
            .catch(error => {
                if(error.name === "AbortError") {
                    console.log("User aborted data fetching.")
                } else {
                    console.log(error)
                }
            });
        
        return () => {
            controller.abort();
        };
    }, [])

    return (
        <div>
            <ol>
                {data?.map(d => <li key={data.id}>{data.content}</li>)}
            </ol>
        </div>
    );

};

export default App;