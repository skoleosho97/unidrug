import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Routes, Route, createRoutesFromElements  } from "react-router-dom";
import { RxNormProvider } from './context/Context';
import { Header } from './components/Header/Header';
import { Search } from './pages/Search/Search';
import { Ingredient } from './components/Info/Ingredient';
import './index.css'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={
            <RxNormProvider>
                <Search />
            </RxNormProvider>
        } 
        />

    )
);
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);