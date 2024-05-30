import { useState, useEffect } from "react";
import { isDarkModeOverrideSet, getDarkModeOverride } from './DarkModeToggle';
import Giscus from '@giscus/react';

export default function GiscusComments(props) {
    const [giscusTheme, setGiscusTheme] = useState("preferred_color_scheme")

    useEffect(() => {
        if (isDarkModeOverrideSet()) {
            setGiscusTheme(getDarkModeOverride() ? "dark" : "light");
        }
    }, [props.darkMode])
    return (
        <div id="comments">
            <Giscus
                repo="csyager/connoryager.com"
                repo-id="MDEwOlJlcG9zaXRvcnkzNjExOTU0NDA="
                category="Announcements"
                categoryId="DIC_kwDOFYdnsM4CeehQ"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={giscusTheme}
                lang="en"
            />
        </div>
    )
    
}