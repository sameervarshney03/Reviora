const changeTheme = (theme, setTheme) => {
    const newTheme = theme === "light"? "dark": "light";

    setTheme(newTheme);

    document.documentElement.setAttribute(
        "data-theme",
        newTheme
    );
}

export default changeTheme;