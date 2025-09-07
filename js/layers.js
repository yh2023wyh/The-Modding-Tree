addLayer("r", {
    name: "test report", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#BBBBCC",
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(1024), // Can be a function that takes requirement increases into account
    resource: "test reports", // Name of prestige currency
    baseResource: "Bytes of tested code", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    //canReset(){
    //    if(lt(player.points,new Decimal(-1))) return false;
    //    return true
    //}
    //getResetGain(){
    //    let gain=player.points.dividedBy(1024)
    //   let rooter=10
    //    if(gain<1) return 0;
    //   gain=gain.root(new Decimal(1024).log(rooter))
    //    return gain
    //},
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("r",14)) mult = mult.times(2.5);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for test report", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11:{
            title: "Initial testing",
            description: "Start gaining 128 bytes of tested code per second",
            cost: new Decimal(1),
        },
        12:{
            title: "Re-testing",
            description: "Improve tested code gain based on tested code",
            cost: new Decimal(3),
            effect() {
                return player.points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13:{
            title: "Experience from previous reports",
            description: "Improve tested code gain based on test reports",
            cost: new Decimal(20),
            effect() {
                return player[this.layer].points.times(2).add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14:{
            title: "Alpha test",
            description: "2.5x test report gain",
            cost: new Decimal(60),
        }
    }
})
