const orders = [
  {
    userId: 1778,
    amount: 600,
    createdAt: "1563816223063.0",
  },
  {
    userId: 1781,
    amount: 250,
    createdAt: "1563965186852.0",
  },
  {
    userId: 1765,
    amount: 450,
    createdAt: "1563977700287.0",
  },
];

export const scalarMutation = {
  addOrder: (_, { userId, amount }) => {
    const newOrder = {
      userId,
      amount,
      createdAt: Date.now(),
    };
    orders.push(newOrder);

    return newOrder;
  },
};

export const scalarQuery = {
  orders: (_, args) => {
    return orders;
  },
  image: () =>
    "https://uploads.codesandbox.io/uploads/user/8d35d7c1-eecb-4aad-87b0-c22d30d12081/l2nh-cat.jpeg",
  notImage: () => "https://codesandbox.io/s/4qlo54l7k9",
};
