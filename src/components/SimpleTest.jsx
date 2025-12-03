const SimpleTest = () => {
  const name = 'Michael';
  const user = { name: 'Kim' };
  const items = [1, 2, 3, 4, 5];

  return (
    <div>
      <h1>Hello, {name}</h1>
      <div>{1 + 1}</div>
      <div>{user.name}</div>
      <div>{items.length} items</div>
    </div>
  );
};

export default SimpleTest;
