import "./assets/css/tailwind.css";

import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {BaseIndex} from "./view/base_index.tsx";

/**
 * # 根组件
 * 用于渲柮整个应用，包括路由、全局状态等
 */
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <BaseIndex/>
    </BrowserRouter>
)
