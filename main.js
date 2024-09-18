// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Factory function

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    originaldna: [...dna],
    dna,
    mutate() {
      let indexToMutate = Math.floor(Math.random() * this.originaldna.length)
      let baseToMutate = this.dna[indexToMutate];
      let mutateTarget = returnRandBase()
      while (mutateTarget === baseToMutate) {
        mutateTarget = returnRandBase()
      }
      this.dna[indexToMutate] = mutateTarget
      return this.dna
    },
    compareDNA(object) {
      let identicalBases = 0;
      for (let i = 0; i < this.originaldna.length; i++) {
        if (this.originaldna[i] === object.originaldna[i]) {
          identicalBases ++;
        }
      }
      const identicalPercent = Math.round((identicalBases * 100) / this.originaldna.length)
      console.log(`Specimen #${this.specimenNum} and specimen #${object.specimenNum} have ${identicalPercent}% DNA in common`)
    },
    willLikelySurvive() {
      let survivalBases = 0;
      for (let i = 0; i < this.originaldna.length; i++) {
        if (this.originaldna[i] === 'C' || this.originaldna[i] === 'G') {
          survivalBases++;
        }
      }
      let survivalPercent = (survivalBases * 100) / this.originaldna.length
      return survivalPercent >= 60
    }
  }
}



// PAequor 1
const strand1 = mockUpStrand()
const pAequor1 = pAequorFactory(1, strand1)
console.log(pAequor1)
console.log('Mutation 1: ', pAequor1.mutate())


// PAequor 2
const strand2 = mockUpStrand()
const pAequor2 = pAequorFactory(2, strand2)
console.log(pAequor2)
console.log('Mutation 2: ', pAequor2.mutate())


// Comparison of DNA
pAequor1.compareDNA(pAequor2);


// Will Likely Survive
console.log(pAequor1.willLikelySurvive())
console.log(pAequor2.willLikelySurvive())



// Creation of 30 PAequor that are likely to survive
let survivalArray = [];
while (survivalArray.length < 30) {
  let strand = mockUpStrand()
  let potentialSurvivalArray = pAequorFactory(survivalArray.length, strand);
  if (potentialSurvivalArray.willLikelySurvive()) {
    survivalArray.push(potentialSurvivalArray)
  }
}

console.log(survivalArray)