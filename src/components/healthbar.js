function updateHealthBars() {

    const playerHealth =
        Math.max(
            0,
            (player.health / player.maxHealth) * 100
        );

    const enemyHealth =
        Math.max(
            0,
            (enemy.health / enemy.maxHealth) * 100
        );


    document.getElementById(
        "playerHealth"
    ).style.width = playerHealth + "%";


    document.getElementById(
        "enemyHealth"
    ).style.width = enemyHealth + "%";
}
