import {lazy} from 'react'

// tạo ra một cái array để quản lí các cái routes của dự án

const routes = [
    {
        path: '/',
        element: lazy(() => import('./modules/Home/pages/HomePage'))
    }
]