export const renderBtn = function (cards) {
    if (cards.length <= 0) {
        document.querySelector(".mixNumbers").setAttribute("disabled", true);
        document.querySelector(".mixNumbers").style.opacity = 0.4;
        document.querySelector(".divideNumbers").setAttribute("disabled", true);
        document.querySelector(".divideNumbers").style.opacity = 0.4;
    }
}
export const randomLength = function (length) {
    return Math.floor(Math.random() * length);
}