import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Display from './components/Display'
import peopleService from './services/people'
import Notification from './components/Notification'
import Notificationerr from './components/Notificationerr'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [addedMessage, setAddedMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    peopleService
    .getAll()
    .then(people => {
        const personsObj = people
        setPersons(personsObj)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
  
    const newPersonExistsALready = persons.map(person => person.name.toLowerCase()).includes(newPerson.name.toLowerCase())
    if (newPersonExistsALready) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const persontoUpdate = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
        const updatedPerson = {...persontoUpdate, number: newPerson.number}
        peopleService
          .update(persontoUpdate.id, updatedPerson)
          .then(updatedper => {
            setPersons(persons.map(person => person.id !== updatedper.id ? person : updatedper))
          })
          .catch(error => {
            setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
            setTimeout(() => setErrorMessage(''), 3000)
            setPersons(persons.filter(person => person.name !== newPerson.name))
          })
      }
    } else {
      peopleService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setAddedMessage(`Added ${newPerson.name}`)
          setTimeout(() => setAddedMessage(''), 2000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)) {
      peopleService
        .remove(id)
        .then(removedPerson => {
          console.log(removedPerson)
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons)
        })
    }
  }

  const validPersons = filterName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={addedMessage}/>
      <Notificationerr message={errorMessage}/>

      <Filter onChange={handleFilter}
              value={filterName}/>

      <h1>Add a new</h1>

      <Form 
        submit={handleSubmit}
        handleName={handleName}
        nameValue={newName}
        handleNumber={handleNumber}
        numberValue={newNumber}
      />
      
      <Display validPersons={validPersons}
               handleDelete={handleDelete}/>
    </div>
  )
}

export default App