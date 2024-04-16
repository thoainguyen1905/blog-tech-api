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
