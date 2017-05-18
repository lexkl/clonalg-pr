import Antibody from "./Antibody";

export default class ImunSystem {
    constructor(ag) {
        this.antigens = ag;
        this.antibodies = this.generateAb();
        this.generation = 10;
        this.memoryAb = new Map();
    }

    start() {
        let counter = 0;
        while (counter++ <= this.generation) {

            // Вычисление афинности антител к антигену
            this.checkAffinity(this.antibodies, this.antigens);
            // Отбор антител и клонирование
            let clonePopulation = this.prepareAndClone(this.antibodies, this.antigens);
            // Мутация клонов
            this.mutateClones(clonePopulation);
            // Вычисление аффинности клонов к антигену
            this.checkAffinity(clonePopulation, this.antigens);
            // Отбор 1 клона и замена ним соответствующего антитела
            clonePopulation.sort((a,b) => a.affinity - b.affinity);
            this.cloneSelection(clonePopulation);
            // Редактирование популяции
            this.antibodies.sort((a,b) => a.affinity - b.affinity);
            let newAntibodies = this.generateAb(30);
            this.antibodies.splice(70, Number.MAX_VALUE);
            this.antibodies = this.antibodies.concat(newAntibodies);
        }
        console.log(this.memoryAb);
    }

    generateAb(amount = 100) {
        let ab = [];
        for (let i = 0; i < amount; i++) {
            ab[i] = new Antibody(this.antigens[0].array.length, this.antigens[0].array[0].length);
        }
        return ab;
    }

    checkAffinity(antibodies, antigens) {
        for(let ab of antibodies)
            for(let ag of antigens)
                ab.countAffinity(ag);
    }

    prepareAndClone(antibodies, antigens) {
        let bestAntibodies = [];
        for(let ag of antigens) {
            let suitableAb = [];
            for(let ab of antibodies) {
                if(ab.targetAntigen === ag)
                    suitableAb.push(ab);
            }
            suitableAb.sort((a,b) => a.affinity - b.affinity);
            suitableAb.splice(4, Number.MAX_VALUE);
            bestAntibodies = bestAntibodies.concat(suitableAb);
        }
        return this.clone(bestAntibodies, 10);
    }

    clone(antibodies, number) {
        let clones = [];
        for(let i = 0; i < antibodies.length; i++) {
            let antibody = antibodies[i];
            antibody.parentAntibody = antibodies[i];
            for(let j = 0; j < number; j++) {
                clones.push(antibody);
            }
        }
        return clones;
    }

    mutateClones(clonePopulation) {
        for(let clone of clonePopulation) {
            clone = clone.mutate();
        }
    }

    cloneSelection(clonePopulation) {
        for(let ag of this.antigens) {
            for(let clone of clonePopulation) {
                if(clone.targetAntigen === ag) {
                    if(clone.affinity < clone.parentAntibody.affinity){
                        let index = this.antibodies.indexOf(clone.parentAntibody);
                        this.antibodies[index] = clone;
                        this.addToMemory(ag, clone);
                        break;
                    } else {
                        this.addToMemory(ag, clone.parentAntibody);
                        break;
                    }
                }
            }
        }
    }

    addToMemory(antigen, antibody) {
        if(this.memoryAb.has(antigen)) {
            let ab = this.memoryAb.get(antigen);
            if(ab.affinity < antibody.affinity) {
                return false;
            }
        }
        this.memoryAb.set(antigen, antibody);
    }
}
