import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    {/* add routes and components here later TODO */}
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;