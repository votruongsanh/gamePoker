export function Card(img, number, symbol, name) {
    // hình ảnh
    // điểm số
    // chất cơ rô chuồng bích
    // so sánh chất nào lớn hơn
    // so sánh điểm số lớn hơn
    this.img = img;
    this.number = number;
    this.symbol = symbol;
    this.name = name;

    this.greaterCompare = (card) => {
        //lớn hơn là return true, ngược lại false
        //ví dụ: so sánh this ở đây là 3 clubs với 3 heart 
        // this = 3 + 0.2 = 3.2 
        // card = 3 + 0.4 = 3.4
        //return so sánh 3.2 > 3.4 ==> false
        return this.number + this.symbol > card.number + card.symbol;
    }
}