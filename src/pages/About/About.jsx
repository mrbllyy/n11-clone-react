import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About'; // Import new page

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Define the new path for your component */}
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}
