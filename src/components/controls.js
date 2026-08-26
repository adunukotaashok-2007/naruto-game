function setupMobileControls() {

    const left =
        document.getElementById("leftButton");

    const right =
        document.getElementById("rightButton");

    const attack =
        document.getElementById("attackButton");

    const jutsu =
        document.getElementById("jutsuButton");

    const dash =
        document.getElementById("dashButton");


    left.addEventListener(
        "pointerdown",
        () => {
            keys.left = true;
        }
    );

    left.addEventListener(
        "pointerup",
        () => {
            keys.left = false;
        }
    );


    right.addEventListener(
        "pointerdown",
        () => {
            keys.right = true;
        }
    );

    right.addEventListener(
        "pointerup",
        () => {
            keys.right = false;
        }
    );


    attack.addEventListener(
        "click",
        playerAttack
    );


    jutsu.addEventListener(
        "click",
        playerJutsu
    );


    dash.addEventListener(
        "click",
        playerDash
    );
}
