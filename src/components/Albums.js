import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CatchAll from './CatchAll';
import CambridgeAlbum from './albums/2024_3_30_cambridge';
import '../style/post.css';

export default function Albums() {
    // reset scroll on page change
    const pathname = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    return (
        <Routes>
            <Route path="2024-03-30-cambridge" element={<CambridgeAlbum />} />
            <Route path="*" element={<CatchAll />} />
        </Routes>
    )
}