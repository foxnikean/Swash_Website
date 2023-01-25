/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {

        extend: {
            animation: {
                bounceCustom: "bounce 0.6s ease-in-out 2",
            },
            colors: {
                backgroundColor: "#1B3237",
                neonBlue: "#45E8FF",
                turkuaz: "#4D6E75",

            },
        },
    },
    plugins: [],
}