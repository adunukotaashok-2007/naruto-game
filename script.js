document
    .getElementById("startButton")
    .addEventListener(
        "click",
        () => {

            showScreen(
                "selectScreen"
            );
        }
    );


document
    .getElementById("battleButton")
    .addEventListener(
        "click",
        () => {

            startBattle();
        }
    );


document
    .getElementById("restartButton")
    .addEventListener(
        "click",
        () => {

            showScreen(
                "selectScreen"
            );
        }
    );
