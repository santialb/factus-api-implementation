import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { InvoiceForm } from './components/InvoiceForm';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                <InvoiceForm />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;