import React from "react"
import RouteNavigation from "./navigation"
import store from './store/index'
import { Provider } from 'react-redux'

const App = () => {
    return(
        <Provider store={store}>
            <RouteNavigation />
        </Provider>
    )
}

export default App;