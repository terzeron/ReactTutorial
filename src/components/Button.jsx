const Button = ({ label = "Click" }) => {
  const handleClick = (event) => {
    console.log(event.type);
    console.log(event.currentTarget);
    console.log(event.value);
    console.log(event.clientX, event.clientY);
  };

  return <button onClick={(event) => handleClick(event)}>{label}</button>;
};

export default Button;
