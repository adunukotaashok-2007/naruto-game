const keys = {

    left: false,
    right: false
};


document.addEventListener(
    "keydown",
    event => {

        if (event.key.toLowerCase() === "a") {
            keys.left = true;
        }

        if (event.key.toLowerCase() === "d") {
            keys.right = true;
        }

        if (event.key.toLowerCase() === "j") {
            playerAttack();
        }

        if (event.key.toLowerCase() === "k") {
            playerJutsu();
        }

        if (event.code === "Space") {

            event.preventDefault();

            playerDash();
        }
    }
);


document.addEventListener(
    "keyup",
    event => {

        if (event.key.toLowerCase() === "a") {
            keys.left = false;
        }

        if (event.key.toLowerCase() === "d") {
            keys.right = false;
        }
    }
);
