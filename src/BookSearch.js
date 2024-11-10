import React, { useState } from 'react';
import {Row, Container, Card, Col, Image } from 'react-bootstrap';

function BookSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // const handleSearch = async () => {
  //   if (!searchTerm) return;

  //   setLoading(true);
  //   try {
  //     // const response = await fetch(`https://www.dbooks.org/api/books/search?query=${searchTerm}`);
  //     // const response = await fetch(`https://www.dbooks.org/api/search?query=${searchTerm}`);
  //     const response = await fetch(`https://www.dbooks.org/api/search/${searchTerm}`);
  //     console.log(searchTerm);
  //     // const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
  //     const data = await response.json();
  //     setBooks(data.items || []);
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //   }
  //   setLoading(false);
  // };

const handleSearch = async () => {
  if (!searchTerm) return;

  setLoading(true);
  try {
    const response = await fetch(`https://www.dbooks.org/api/search/${searchTerm}`);
    const text = await response.text(); // Get raw text response
    console.log(text); // Log to see if there's any HTML error page or endpoint info

    try {
      const data = JSON.parse(text);
      setBooks(data.books || []);  
      } catch (error) {
      console.error("Invalid JSON response:", text);
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
  setLoading(false);
};

  // return (
  //   <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
  //     <h2>Book Search</h2>
  //     <input
  //       type="text"
  //       placeholder="Search for books..."
  //       value={searchTerm}
  //       onChange={(e) => setSearchTerm(e.target.value)}
  //     />
  //     <button onClick={handleSearch}>Search</button>

  //     {loading && <p>Loading...</p>}

      // <ul>
      //   {books.map((book) => (
      //     <li key={book.id}>
      //       <h3>{book.title}</h3>
      //       <p>{book.authors}</p> 
      //       <img src={book.image} alt={`${book.title} cover`} style={{ width: '100px', height: '150px' }} />           
      //     </li>
      //   ))}
      // </ul>
  //   </div>
  // );

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Book Search</h2>
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
        <Container className='m-3'>
        <Col className="xs={12} md={6}">
          {books.map((book) => (
            <Card style={{ width: '40rem' }}>
              <Card.Header className="colDesign">
                <h4>{book.title}</h4>
              </Card.Header>

              <Card.Body className="m-4">
                <Image style={{height:'auto',width:'30%'}}  src={book.image}></Image>
                {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                <Card.Text className="m-3">{book.subtitle}</Card.Text>
                <strong><h6 className="m-3">{book.authors}</h6></strong>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Container>
    </div>
  );



}

export default BookSearch;