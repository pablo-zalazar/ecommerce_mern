import mercadopago from "mercadopago";
import User from "../models/User.js";

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_MP,
});

export const payMercadoPago = (req, res) => {
  const { value } = req.body;

  try {
    let preference = {
      items: [
        {
          title: "CinsLie",
          unit_price: 1,
          quantity: Number(value),
        },
      ],
      back_urls: {
        success: process.env.FRONTEND_URL + "/profile/confirm",
        failure: process.env.FRONTEND_URL + "/profile/failure",
        pending: process.env.FRONTEND_URL + "/profile/failure",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        return res.send(response.body.init_point);
      })
      .catch(function (error) {
        return res.status(500).send(error);
      });
  } catch (err) {
    console.log(err);
  }
};
export const setCoins = async (req, res) => {
  const { value } = req.body;
  try {
    const user = await User.findById(req.user._id);
    user.money += Number(value);
    await user.save();
    return res.json({ msg: "Cash updated" });
  } catch (e) {
    return res.status(404).json({ msg: e.message });
  }
};
