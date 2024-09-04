import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom"
import router from "@/router"
// 别名路径
import sum from '@/test'

import "./theme.css"

const total = sum(1, 3)
console.log(total)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);


