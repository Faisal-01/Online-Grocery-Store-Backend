const Product = require("../models/Product");

const stripe = require("stripe")(process.env.STRIPE_KEY);

function pkrToCents(pkr) {
  return Math.round((pkr / 286.5) * 100);
}

const createPayment = async (req, res) => {
  const { productList, orderBy, orderAmount, shippingAddress } = req.body;
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      metadata: {
        orderBy,
        shippingAddress,
        orderAmount,
        productList: JSON.stringify(productList)
      }, 
      line_items: await Promise.all(productList.map(async (product) => {
        const p = await Product.findById(product.productId)
    // line_items: productList.map((product, index) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              //   name: `product ${index + 1}`,
              name: p.name,
            },
            unit_amount: product.productDiscount
              ? pkrToCents(
                  product.productPrice -
                    (product.productPrice * product.productDiscount) / 100
                )
              : pkrToCents(product.productPrice),
          },
          quantity: product.productQuantity,
        };
      })),

      success_url: `${process.env.CLIENT}/order_placed?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT}/cart`,
    });
    res.status(200).json({ session: session });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSessionItems = async (req, res) => {
  const items = await stripe.checkout.sessions.retrieve(req.params.sessionId);
  res.status(200).json(items);
};

module.exports = {createPayment, getSessionItems}