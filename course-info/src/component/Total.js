const Total = ({parts}) => {
    const sum = parts.reduce((aggr, curr) => {
      return aggr += curr.exercises
    }, 0)
    return (
      <strong>total of {sum} exercises</strong>
    )
  }

  export default Total