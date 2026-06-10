// Utility function to change the theme

const changeTheme = (theme, setTheme) => {
    const newTheme = theme === "light"? "dark": "light";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);
}

export default changeTheme;