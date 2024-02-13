import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const onError = () => setHasError(true);
        const onUnhandledRejection = (event) => {
            event.preventDefault();
            setHasError(true);
        };

        window.addEventListener('error', onError);
        window.addEventListener('unhandledrejection', onUnhandledRejection);

        return () => {
            window.removeEventListener('error', onError);
            window.removeEventListener('unhandledrejection', onUnhandledRejection);
        };
    }, []);

    if (hasError) {
        return <div>Something went wrong!</div>;
    }

    return <Component {...pageProps} />;
}

export default MyApp;
