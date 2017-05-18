export default class Antibody {
    constructor(x, y) {
        this.array = this.generateAb(x, y);
        this.affinity = 13;
        this.targetAntigen = undefined;
        this.parentAntibody = undefined;
    }

    generateAb(x, y) {
        let arr = [];
        for (let i = 0; i < x; i++) {
            arr[i] = [];
            for (let j = 0; j < y; j++)
                arr[i][j] = Math.round(Math.random());
        }
        return arr;
    }

    countAffinity(ag) {
        let affinity = 0;
        for(let i = 0; i < this.array.length; i++)
            for(let j = 0; j < this.array[0].length; j++)
                if(this.array[i][j] !== ag.array[i][j])
                    affinity++;

        if(affinity < this.affinity) {
            this.affinity = affinity;
            this.targetAntigen = ag;
        }
    }
    getRandom() {
        return Math.random() * 100;
    }
    mutate() {
        let arr = [];
        for(let i = 0; i < this.array.length; i++) {
            arr[i] = [];
            for(let j = 0; j < this.array[0].length; j++) {
                if(this.getRandom() < 30) {
                    arr[i][j] = this.array[i][j] ^ 1;
                } else {
                    arr[i][j] = this.array[i][j];
                }
            }
        }
        return arr;
    }
}
