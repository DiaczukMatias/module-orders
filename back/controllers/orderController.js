import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { status, origin, destination, productCount, totalWeightKg } =
      req.body;

    let packageSize = "S";
    if (totalWeightKg > 25) packageSize = "SPECIAL";
    else if (totalWeightKg > 15) packageSize = "L";
    else if (totalWeightKg > 5) packageSize = "M";

    const specialNote =
      totalWeightKg > 25 ? "Contactar a la empresa para convenio especial" : "";

    const newOrder = new Order({
      origin,
      destination,
      status,
      productCount,
      totalWeightKg,
      packageSize,
      specialNote,
      user: req.user.id,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find().populate("user", "name email");
    } else {
      orders = await Order.find({ user: req.user.id }).populate(
        "user",
        "name email"
      );
    }
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validar status permitido
    const validStatuses = [
      "created",
      "collected",
      "at_station",
      "in_transit",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order status", error: error.message });
  }
};
