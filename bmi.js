const bmi =(weight, height) => {
    return height===0 ? "Error" : weight/(height*height);
}


module.exports = bmi;
//console.log(bmi(80, 1.8));