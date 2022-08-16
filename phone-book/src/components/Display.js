import Person from "./Person"

const Display = ({validPersons, handleDelete}) => {
    const displayEl = validPersons.map(person => <Person key={person.id}
                                                    name={person.name}
                                                    number={person.number}
                                                    handleDelete={() => handleDelete(person.id)} />)
    return (
        <>
            <h2>Numbers</h2>
            {displayEl}
        </>
    )
}

export default Display