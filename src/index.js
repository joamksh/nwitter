import { createRoot } from 'react-dom/client';
import App from './components/App';  // 경로 수정

const root = createRoot(document.getElementById('root'));
root.render(<App />);
