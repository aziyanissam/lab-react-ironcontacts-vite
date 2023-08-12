import { useState } from 'react'
import contacts from './contacts.json'

function App() {
  const [contact, setContact] = useState(contacts.slice(0))
  const [random, setRandom] = useState(contacts.slice(5))
  const [sortedPopularity, setSortedPopularity] = useState([])
  const [sortedName, setSortedName] = useState([])

  const RandomContact = () => {
    const randomIndex = Math.floor(Math.random() * random.length)
    const randomContact = random[randomIndex]
    setContact((prevContacts) => [...prevContacts, randomContact]);
    const updatedRandom = random.filter((_, index) => index !== randomIndex);
    setRandom(updatedRandom);

  }
  const handleSortPopularity = () => {
    const sortPopularity = [...contact].sort((a, b) => b.popularity - a.popularity)
    setSortedPopularity(sortPopularity)
  }

  const handleSortName = () => {
    const sortName = [...contact].sort((a, b) => a.name.localeCompare(b.name));
    setSortedName(sortName);
    setContact(sortName);
  }

  const handleDelete = (contactIndex) => {
    const updatedContact = contact.filter((_, index) => index !== contactIndex);
    setContact(updatedContact);
    setSortedPopularity(updatedContact);
    setSortedName(updatedContact);
  };

  return (
    <div>
      <div className='table'>
        <div>
          <h1>IronContacts</h1>
        </div>
        <div>
          <button onClick={RandomContact}>Add Random Contact</button>
          <button onClick={handleSortPopularity}>Sort by popularity</button>
          <button onClick={handleSortName}>Sort by Name</button>
        </div>
        <div>
          <table style={{ border: '1px solid black' }}>
            <thead >
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Won an Oscar</th>
                <th>Won an Emmy</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(sortedPopularity.length > 0 ? sortedPopularity : sortedName.length > 0 ? sortedName : contact).map((row, index) => (
                <tr key={row.id}>

                  <td><img src={row.pictureUrl} alt="" style={{ width: '200px', height: '200px' }} /></td>
                  <td>{row.name}</td>
                  <td>{row.popularity}</td>
                  <td>{row.wonOscar ? '🏆' : ''}</td>
                  <td>{row.wonEmmy ? '🏆' : ''}</td>
                  <td><button onClick={() => handleDelete(index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
