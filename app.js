function getRandomDamage(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; 
}

var na = '';

function takename() {
    na = prompt("Enter Your Name");
    // console.log(na)
}
document.onload = takename();
// console.log(na)
na = na ? na : 'Player';
const app = Vue.createApp({
    data() {
        return {
            playerH: 100,
            monH: 100,
            curround: 0,
            winner: null,
            spclatkcount: 2,
            log: [],
            playerName: na,
        };
    },

    computed: {
        MonBarStyle() {
            if (this.monH<0){
                return {width: '0%'}
            }
            // console.log(this.winner);
            return {width:this.monH + '%'}
        },
        PlayerBarStyle() {
            if (this.playerH<0){
                return {width: '0%'}
            }
            // console.log(this.winner);
            return {width:this.playerH + '%'}
        },
        useSpcl() {
            return this.curround % 3 !== 0 || !this.spclatkcount>0;
        }
    },

    watch: {
        playerH(val) {
            if (val <= 0 && this.monH <= 0) {
                this.winner = 'Draw';
            }
            else if (val <= 0) {
                this.winner = 'Monster';
            }
        },
        monH(val) {
            if (val <= 0 && this.playerH <= 0) {
                this.winner = 'Draw';
            }
            else if (val <= 0) {
                this.winner = 'You';
            }
        }
    },

    methods: {
        startGame() {
            this.playerH = 100;
            this.monH = 100;
            this.winner = null;
            this.curround = 0;
            this.log = [];
            this.spclatkcount = 2;
            // this.playerName = prompt("Enter Your Name");
        },
        attackMon() {
            this.curround++;
            const dmg = getRandomDamage(5, 12);
            this.monH -= dmg;
            this.addlog('player', 'attack', dmg);
            this.attackPlayer();
        },
        attackPlayer() {
            const dmg = getRandomDamage(7, 14);
            this.playerH -= dmg;
            this.addlog('monster', 'attack', dmg);
        },
        SpecialattackMon() {
            if (this.spclatkcount > 0) {
                this.curround++;
                const dmg = getRandomDamage(12, 20);
                this.monH -= dmg;
                this.spclatkcount--
                this.addlog('player', 'SpecialAttack', dmg);
                this.attackPlayer();
            }
            else{ alert("No Moves Left")}
        },
        HealPlayer() {
            this.curround++;
            const heal = getRandomDamage(10, 20);
            if (this.playerH + heal > 100) {
                this.playerH = 100;
            }
            else { this.playerH += heal; }
            this.addlog('player', 'heal', heal);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'Monster';
        },
        addlog(who, what, val) {
            this.log.unshift({
                actBy: who,
                act: what,
                actVal: val,
                name:this.playerName,
            });
        },
    },
})

app.mount('#game');
