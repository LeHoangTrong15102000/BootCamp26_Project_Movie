import React, {useState, useEffect , useReducer} from 'react'
import axios from 'apis/axiosClient'

const countReducer = (count, action) => {
    switch(action.type) {

        case "Increase":  {
            return count + 1
        }
        case "Decrease" : {
            return count - 1
        }

        default: return count
    }
}

const movieReducer = (state, action) => {
    switch(action.type) {
        case "GET_MOVIE_PENDING": {
            return {...state, isLoading: true, error: null}
        }
        case "GET_MOVIE_FULFILLED": {
            return {...state, isLoading: false, data: action.payload.data}
        }
        case "GET_MOVIE_REJECTED": {
            return {...state, isLoading: false, error: action.payload.error}
        }
        default: return state
    }
 }

const DemoUseReducer = () => {
    // const [count, setCount] = useState(0)

    // Trường hợp sử dụng reducer khi mà có quá nhiều state thì chúng ta sẽ để nó vào useReducer, Chỉ tồn tại duy nhất trong một component không giống như là một cái store chứa các state để các component có thể lấy được
    // const [count, dispatch] = useReducer(countReducer, 0);
    const [ state , dispatch ] = useReducer(movieReducer, {
        data: [],
        isLoading: false, 
        error: null
    })

    const handleIncrease = () => {
        // setCount(count + 1)
        dispatch({type: 'Increase'})
    }
    
    const handleDecrease = () => {
        //  setCount(count - 1)
        dispatch({type: 'Decrease'})
    }
  return (
    <div>
        <h1>Demo UseReducer</h1>
        {/* <p>Count: {count}</p>
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease}>Decrease</button> */}
</div>
  )
}

export default DemoUseReducer