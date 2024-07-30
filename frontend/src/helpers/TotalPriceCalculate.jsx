export default function TotalPriceCalculate(cart) {
    console.log(cart, "TotalPriceCalculates");

    const subTotal = cart.reduce((total, item) => { return total + item.price * item.quantity }, 0)
    const shippingAmount = subTotal >= 200 ? 0 : 5.99
    const taxAmount = subTotal / 100 * 18

    const totalAmount = subTotal + shippingAmount + taxAmount
    const total = {
        subTotal, shippingAmount, taxAmount, totalAmount
    }
    return total
}
