import React, { useEffect, useState, useReducer } from 'react';
import { myAmazingReducer, INITIAL_STATE, ACTION_TYPES } from './myReducer';

const App = () => {

    const [data, setData] = useState([]);
    const [number, setNumber] = useState(0);
    const [input, setInput] = useState("");
    const [user, setUser] = useState({
        name: "john",
        surname: "smith"
    });

    const [state, dispatch] = useReducer(myAmazingReducer, INITIAL_STATE);

    const increaseNumber = () => {
        setNumber(number + 1);

    };

    const increaseNumberAsyncWrong = () => {
        setTimeout(() => setNumber(number + 1), 2000);
    };

    const increaseNumberAsync = () => {
        setTimeout(() => setNumber((previousNumber) => previousNumber + 1), 2000)
    };

    const onUsernameInputChange = (event) => {
        setInput(event.target.value);
    };

    const onNewUsernameAccepted = () => {
        setUser({
            ...user,
            name: input
        });
        setInput("");
    };

    const advancedUsernameChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    const handleFetch = () => {

        dispatch({ type: ACTION_TYPES.FETCH_START});

        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                return response.json();
            })
            .then(data => { 
                console.log(json);
                dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, data });
            })
            .catch(error => {
                dispatch({ type: ACTION_TYPES.FETCH_ERROR });
            })
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch('https://swapi.dev/api/people/1/', { signal })
            .then(response => response.json())
            .then((data) => {
                if (!isCancelled) {
                    setData(data);
                }
            })
            .catch(error => {
                if (error.name === "AbortError") {
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
        <div style={{ backgroundColor: 'white', padding: '2rem', fontSize: '1.25rem' }}>
            <h1>React tips</h1>
            <ol>
                {data?.map(d => <li key={data.id}>{data.content}</li>)}
            </ol>
            <h2>{number}</h2>
            <p style={{display: 'flex'}}>
                <button style={{ margin: '16px', padding: '8px' }} onClick={increaseNumber}>Increase</button>
                <button style={{ margin: '16px', padding: '8px' }} onClick={increaseNumberAsyncWrong}>Increase Async the wrong way</button>
                <button style={{ margin: '16px', padding: '8px' }} onClick={increaseNumberAsync}>Increase Async the right way</button>
            </p>
            <div>
                <h2>User</h2>
                <input type="text" name="usernamex" id="new-username" placeholder='Enter a new name'
                    onChange={onUsernameInputChange} />
                <button onClick={onNewUsernameAccepted}>Ok</button>
                <p>Current username is: {user.name} {user.surname}</p>
                <input type="text" name="name" id="new-username-again" placeholder='change username automatically' onChange={advancedUsernameChange} />
                <input type="text" name="surname" id="new-surname-again" placeholder='change surname automatically' onChange={advancedUsernameChange} />
            </div>
            <div>
                <button onClick={handleFetch}>
                    {state.loading ? "Wait..." : "Fetch the post"}
                </button>
                <p>{state.post?.title}</p>
                <span>{state.error && "Something went wrong" }</span>
            </div>
        </div>
    );

};

export default App;