class Enemy {

    constructor(character) {

        this.character = character;

        this.health = character.health;
        this.chakra = character.chakra;

        this.x = window.innerWidth * 0.75;

        this.lastAttack = 0;
        this.lastJutsu = 0;
    }


    update(playerX) {

        const now = Date.now();

        const distance =
            Math.abs(this.x - playerX);


        /*
         * CPU MOVEMENT
         */

        if (distance > 180) {

            if (this.x > playerX) {
                this.x -= 1.2;
            }
            else {
                this.x += 1.2;
            }
        }


        /*
         * CPU ATTACK
         */

        if (
            distance < 160 &&
            now - this.lastAttack > 1400
        ) {

            this.lastAttack = now;

            return "attack";
        }


        /*
         * CPU JUTSU
         */

        if (
            distance < 400 &&
            this.chakra >= 20 &&
            now - this.lastJutsu > 5000
        ) {

            this.lastJutsu = now;

            return "jutsu";
        }

        return null;
    }
}
