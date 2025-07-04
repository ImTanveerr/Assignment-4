import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@/features/theme-provider.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.tsx';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </StrictMode>
);