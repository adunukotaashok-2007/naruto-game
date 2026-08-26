let player = null;
let enemy = null;

let selectedCharacter = null;

let gameRunning = false;

let timeLeft = 60;

let timerInterval = null;

let playerAttackCooldown = 0;
let playerJutsuCooldown = 0;
let dashCooldown = 0;


/*
========================================
CHARACTER SELECT
========================================
*/

function createCharacterCards() {

    const list =
        document.getElementById(
            "characterList"
        );

    list.innerHTML = "";


    CHARACTERS.forEach(
        character => {

            const card =
                document.createElement("div");

            card.className =
                "characterCard";


            card.innerHTML = `

                <div class="characterIcon">
                    ${character.icon}
                </div>

                <h2>
                    ${character.name}
                </h2>

                <p>
                    HP: ${character.health}
                </p>

                <p>
                    Attack: ${character.attack}
                </p>

                <p>
                    Jutsu: ${character.jutsu}
                </p>

            `;


            card.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".characterCard"
                        )
                        .forEach(
                            c =>
                                c.classList.remove(
                                    "selected"
                                )
                        );


                    card.classList.add(
                        "selected"
                    );


                    selectedCharacter =
                        character;
                }
            );


            list.appendChild(card);
        }
    );
}


/*
========================================
START GAME
========================================
*/

function startBattle() {

    if (!selectedCharacter) {

        selectedCharacter =
            CHARACTERS[0];
    }


    player = {

        ...selectedCharacter,

        x: window.innerWidth * 0.20,

        maxHealth:
            selectedCharacter.health,

        maxChakra:
            selectedCharacter.chakra
    };


    /*
     * RANDOM CPU
     */

    const possibleEnemies =
        CHARACTERS.filter(
            c =>
                c.id !== selectedCharacter.id
        );


    const enemyCharacter =
        possibleEnemies[
            Math.floor(
                Math.random() *
                possibleEnemies.length
            )
        ];


    enemy =
        new Enemy(
            enemyCharacter
        );


    enemy.maxHealth =
        enemyCharacter.health;

    enemy.maxChakra =
        enemyCharacter.chakra;


    document.getElementById(
        "playerName"
    ).textContent =
        player.name;


    document.getElementById(
        "enemyName"
    ).textContent =
        enemy.character.name;


    document.querySelector(
        "#player .characterEmoji"
    ).textContent =
        player.icon;


    document.querySelector(
        "#enemy .characterEmoji"
    ).textContent =
        enemy.character.icon;


    document.querySelector(
        "#player .fighterName"
    ).textContent =
        player.name;


    document.querySelector(
        "#enemy .fighterName"
    ).textContent =
        enemy.character.name;


    showScreen(
        "gameScreen"
    );


    timeLeft = 60;

    document.getElementById(
        "timer"
    ).textContent =
        timeLeft;


    gameRunning = true;


    clearInterval(timerInterval);


    timerInterval =
        setInterval(
            () => {

                if (!gameRunning)
                    return;


                timeLeft--;


                document.getElementById(
                    "timer"
                ).textContent =
                    timeLeft;


                if (timeLeft <= 0) {

                    finishBattle(
                        player.health >= enemy.health
                    );
                }

            },
            1000
        );
}


/*
========================================
PLAYER ATTACK
========================================
*/

function playerAttack() {

    if (!gameRunning)
        return;


    const now = Date.now();


    if (
        now - playerAttackCooldown <
        500
    )
        return;


    playerAttackCooldown = now;


    if (!isInAttackRange())
        return;


    enemy.health -=
        player.attack;


    createAttackEffect(
        enemy.x,
        "#ff6d00"
    );


    updateHealthBars();


    checkWinner();
}


/*
========================================
PLAYER JUTSU
========================================
*/

function playerJutsu() {

    if (!gameRunning)
        return;


    const now = Date.now();


    if (
        now - playerJutsuCooldown <
        1800
    )
        return;


    if (player.chakra < 20) {

        showMessage(
            "NOT ENOUGH CHAKRA"
        );

        return;
    }


    if (!isInJutsuRange())
        return;


    playerJutsuCooldown =
        now;


    player.chakra -= 20;


    enemy.health -=
        player.jutsu;


    createJutsuEffect(
        enemy.x
    );


    updateChakraBars();
    updateHealthBars();


    checkWinner();
}


/*
========================================
DASH
========================================
*/

function playerDash() {

    if (!gameRunning)
        return;


    const now = Date.now();


    if (
        now - dashCooldown <
        1000
    )
        return;


    dashCooldown =
        now;


    if (enemy.x > player.x) {

        player.x += 90;
    }
    else {

        player.x -= 90;
    }


    player.x =
        Math.max(
            40,
            Math.min(
                window.innerWidth - 40,
                player.x
            )
        );


    updatePositions();
}


/*
========================================
CPU ACTION
========================================
*/

function updateEnemy() {

    const action =
        enemy.update(
            player.x
        );


    if (action === "attack") {

        player.health -=
            enemy.character.attack;


        createAttackEffect(
            player.x,
            "#ff0000"
        );


        updateHealthBars();

        checkWinner();
    }


    if (action === "jutsu") {

        enemy.chakra -= 20;

        player.health -=
            enemy.character.jutsu;


        createJutsuEffect(
            player.x
        );


        updateHealthBars();

        updateChakraBars();

        checkWinner();
    }


    updatePositions();
}


/*
========================================
MOVEMENT
========================================
*/

function updatePlayer() {

    if (!gameRunning)
        return;


    if (keys.left) {

        player.x -=
            player.speed;
    }


    if (keys.right) {

        player.x +=
            player.speed;
    }


    player.x =
        Math.max(
            40,
            Math.min(
                window.innerWidth - 40,
                player.x
            )
        );


    updatePositions();
}


/*
========================================
POSITION
========================================
*/

function updatePositions() {

    const playerElement =
        document.getElementById(
            "player"
        );


    const enemyElement =
        document.getElementById(
            "enemy"
        );


    playerElement.style.left =
        player.x + "px";


    enemyElement.style.left =
        enemy.x + "px";


    enemyElement.style.right =
        "auto";
}


/*
========================================
EFFECTS
========================================
*/

function createAttackEffect(
    x,
    color
) {

    const effect =
        document.createElement(
            "div"
        );


    effect.className =
        "attackEffect";


    effect.style.left =
        x + "px";


    effect.style.bottom =
        "30%";


    effect.style.borderColor =
        color;


    document.getElementById(
        "effects"
    ).appendChild(
        effect
    );


    setTimeout(
        () => effect.remove(),
        350
    );
}


function createJutsuEffect(x) {

    const effect =
        document.createElement(
            "div"
        );


    effect.className =
        "jutsuEffect";


    effect.style.left =
        x + "px";


    effect.style.bottom =
        "30%";


    document.getElementById(
        "effects"
    ).appendChild(
        effect
    );


    setTimeout(
        () => effect.remove(),
        800
    );
}


/*
========================================
MESSAGE
========================================
*/

function showMessage(text) {

    const message =
        document.getElementById(
            "battleMessage"
        );


    message.textContent =
        text;


    setTimeout(
        () => {

            message.textContent =
                "";

        },
        1000
    );
}


/*
========================================
WINNER
========================================
*/

function checkWinner() {

    if (player.health <= 0) {

        finishBattle(false);

        return;
    }


    if (enemy.health <= 0) {

        finishBattle(true);

        return;
    }
}


function finishBattle(playerWon) {

    if (!gameRunning)
        return;


    gameRunning = false;


    clearInterval(
        timerInterval
    );


    if (playerWon) {

        document.getElementById(
            "resultTitle"
        ).textContent =
            "VICTORY!";


        document.getElementById(
            "resultText"
        ).textContent =
            "You defeated the enemy shinobi!";
    }
    else {

        document.getElementById(
            "resultTitle"
        ).textContent =
            "DEFEAT";


        document.getElementById(
            "resultText"
        ).textContent =
            "Train harder and fight again!";
    }


    showScreen(
        "gameOverScreen"
    );
}


/*
========================================
SCREEN MANAGEMENT
========================================
*/

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(
            screen =>
                screen.classList.remove(
                    "active"
                )
        );


    document.getElementById(
        id
    ).classList.add(
        "active"
    );
}


/*
========================================
GAME LOOP
========================================
*/

function gameLoop() {

    if (gameRunning) {

        updatePlayer();

        updateEnemy();

        recoverChakra();

        updateChakraBars();
    }


    requestAnimationFrame(
        gameLoop
    );
}


/*
========================================
INITIALIZATION
========================================
*/

createCharacterCards();

setupMobileControls();

gameLoop();
