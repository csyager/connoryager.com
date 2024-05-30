import "../style/dark-mode-toggle.css";
import { useEffect } from "react";

// toggle to switch classes between .light and .dark
// if no class is present (initial state), then assume current state based on system color scheme
// if system color scheme is not supported, then assume current state is light

const LOCAL_STORAGE_KEY = "darkMode";
// TTL for dark mode override.  1440 minutes = 1 day
const TTL_MINUTES = 1440;
const MILLIS_IN_MINUTE = 60000;

function isDarkModeOverrideSet() {
    let override = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (override != null) {
        if (checkExpiry(JSON.parse(override).time)) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function getDarkModeOverride() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).val === true;
}

function checkExpiry(setTime) {
    let now = new Date().getTime()
    if ((now - setTime) / MILLIS_IN_MINUTE > TTL_MINUTES) {
        return true;
    } else {
        console.log("dark mode TTL will expire in " + (TTL_MINUTES - ((now - setTime) / MILLIS_IN_MINUTE)) + "minutes");
        return false;
    }
}


function setDarkModeInLocalStorage(darkMode) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({"val": darkMode, "time": new Date().getTime()}));
}

function DarkModeToggle(props) {

    function toggleDarkMode() {
        let current = props.darkMode;
        props.setDarkMode(!current);
        setDarkModeInLocalStorage(!current);
    }

    const darkMode = props.darkMode
    const setDarkMode = props.setDarkMode;

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
            setDarkMode(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).val === true);
        } else if (document.documentElement.classList.contains("light")) {
            setDarkMode(false);
            setDarkModeInLocalStorage(false);
        } else if (document.documentElement.classList.contains("dark")) {
            setDarkMode(true);
            setDarkModeInLocalStorage(true);
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme:light)').matches) {
                setDarkMode(false);
            } else {
                setDarkMode(true);
            }
        }
    }, [setDarkMode]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        }
    }, [darkMode])


    return (
        <div>
            <label className="switch darkModeToggle">
            <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
            <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
            <input type="checkbox" className="input" onChange={toggleDarkMode} checked={props.darkMode} />
            <span className="slider"></span>
        </label>
        </div>
    )

}

export {DarkModeToggle, isDarkModeOverrideSet, getDarkModeOverride}