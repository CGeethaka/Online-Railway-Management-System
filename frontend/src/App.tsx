import "./App.css";
import "./app/assets/css/index.css";
import 'antd/dist/reset.css';
import { Routes } from "./Routes";
import { ComomnLayout } from "./app/components/Layout";

function App() {
  return (
    <ComomnLayout>
      <Routes />
    </ComomnLayout>
  );
}

export default App;
