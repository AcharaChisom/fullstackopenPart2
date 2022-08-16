import Part from "./Part"

const Content = ({parts}) => {
    const contentEl = parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)
    return (
      <div>{contentEl}</div>
    )
  }

  export default Content