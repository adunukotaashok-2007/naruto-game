function distanceBetween(a, b) {

    return Math.abs(a - b);
}


function isInAttackRange() {

    return (
        distanceBetween(
            player.x,
            enemy.x
        ) < 150
    );
}


function isInJutsuRange() {

    return (
        distanceBetween(
            player.x,
            enemy.x
        ) < 450
    );
}
