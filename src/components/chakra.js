function updateChakraBars() {

    const playerChakra =
        Math.max(
            0,
            player.chakra
        );

    const enemyChakra =
        Math.max(
            0,
            enemy.chakra
        );


    document.getElementById(
        "playerChakra"
    ).style.width =
        playerChakra + "%";


    document.getElementById(
        "enemyChakra"
    ).style.width =
        enemyChakra + "%";
}


function recoverChakra() {

    player.chakra =
        Math.min(
            player.maxChakra,
            player.chakra + 0.05
        );

    enemy.chakra =
        Math.min(
            enemy.maxChakra,
            enemy.chakra + 0.04
        );
}
