import Header from "./Header"
import Content from "./Content"
import Total from "./Total"
  
  const Course = ({id, name, parts}) => {
    return (
      <>
        <Header name={name}/>
        <Content parts={parts}/>
        <Total parts={parts}/>
      </>
    )
  }

  export default Course