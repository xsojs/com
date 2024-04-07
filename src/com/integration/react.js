import ReactDOM from 'react-dom/client';

function reactIntegration(element, reactComponent) {
    const root = ReactDOM.createRoot(element);
    root.render(
        reactComponent
    )
    return root;
};

export default reactIntegration;