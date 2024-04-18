export default class Misc {
    random(num1,num2) {
        return Math.random() * (num2 - num1) + num1; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    }
}