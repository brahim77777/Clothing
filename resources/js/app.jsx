import './bootstrap';
import '../css/app.css';
import Nav from "./Components/Nav";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from "./redux/store"
import { setAuth } from './redux/authSlice';
import { createInertiaApp,Link, usePage } from '@inertiajs/react';
import Footer from './Components/Footer';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import "./i18n.js"
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
import { useDispatch , useSelector } from 'react-redux';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        store.dispatch(setAuth(props.initialPage.props.auth));
        const auth = store.getState().auth.value;
        console.log(auth)
        const root = createRoot(el);

        root.render(
            <Provider store={store}>
                <Nav  />
                <div className={'mt-[4rem]'}>
                    <App {...props} />
                </div>
                <Footer/>
            </Provider>
    );
    },
    progress: {
        color: '#4B5563',
    },
});
