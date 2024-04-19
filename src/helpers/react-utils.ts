export const switchReactObj = (obj: any, type: string, userAction: any) => {
  const listUserActionNew = obj.listUserAction.filter(
    (item) => item.email !== userAction.email
  );
  if (userAction.react === type) {
    return {
      ...obj.toObject(),
      [type]: obj[type] - 1,
      listUserAction: listUserActionNew,
    };
  } else {
    return {
      ...obj.toObject(),
      [userAction.react]: userAction.react ? obj[userAction.react] - 1 : 0,
      [type]: obj[type] ? obj[type] + 1 : 1,
      listUserAction: [
        ...listUserActionNew,
        {
          ...userAction,
          react: type,
        },
      ],
    };
  }
};

export const generateProductCode = () => {
  const randomFourDigits = Math.floor(1000 + Math.random() * 9000);

  const randomThreeDigits = Math.floor(100 + Math.random() * 900);

  const productCode = `TK${randomFourDigits}-${randomThreeDigits}`;

  return productCode;
};

export const generateCodeTransport = () => {
  const min = 1000000; // 10^6
  const max = 9999999; // 10^7 - 1
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
