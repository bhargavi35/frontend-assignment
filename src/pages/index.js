import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  // State variables
  const [catData, setCatData] = useState([]);
  const [filteredCatData, setFilteredCatData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [catsPerPage] = useState(5); // Adjust as needed
  const [noSearchResults, setNoSearchResults] = useState(false);

  // Fetch cat data
  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
        setCatData(response.data);
        setFilteredCatData(response.data);
      } catch (error) {
        console.error('Error fetching cat data:', error);
      }
    };

    fetchCatData();
  }, []);

  const getRandomCat = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=1');
      setCatData([response.data[0], ...catData]);
    } catch (error) {
      console.error('Error fetching random cat:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterCatData(term);
  };

  // Filter cat data based on search term
  const filterCatData = (term) => {
    if (!term) {
      setFilteredCatData(catData);
      setNoSearchResults(false);
      return;
    }

    const filteredCats = catData.filter(cat => {
      if (cat.breeds && cat.breeds.some(breed => breed.name.toLowerCase().includes(term.toLowerCase()))) {
        return true;
      }
      return false;
    });

    if (filteredCats.length === 0) {
      setNoSearchResults(true);
    } else {
      setNoSearchResults(false);
    }

    setFilteredCatData(filteredCats);
  };

  // Pagination
  const indexOfLastCat = currentPage * catsPerPage;
  const indexOfFirstCat = indexOfLastCat - catsPerPage;
  const currentCats = filteredCatData.slice(indexOfFirstCat, indexOfLastCat);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <h1>Welcome to the Cat World!</h1>
      <button onClick={getRandomCat} className={styles.button}>Get Random Cat</button>
      <input type="text" placeholder="Search cat breeds..." value={searchTerm} onChange={handleSearchChange} />
      {noSearchResults && <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7sf5lrC2Rz4TWh8l6A5FwKqdGWM5fPRsRWA&usqp=CAU" alt="404" />}
      <div className={styles.gridContainer}>
        {currentCats.map((cat) => (
          <div key={cat.id} className={styles.gridItem}>
            <Link href={`/cat/${cat.id}`}>
              <img src={cat.url} alt="Cat" className={styles.catImage} />
            </Link>
          </div>
        ))}
      </div>
      <Pagination catsPerPage={catsPerPage} totalCats={filteredCatData.length} paginate={paginate} />
    </div>
  );
}

// Pagination component
const Pagination = ({ catsPerPage, totalCats, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCats / catsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={styles.pageItem}>
            <a onClick={() => paginate(number)} href="#" className={styles.pageLink}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
