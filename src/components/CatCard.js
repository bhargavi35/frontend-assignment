import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import CatComments from './CatComments';

export default function CatDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [catDetails, setCatDetails] = useState(null);

    useEffect(() => {
        const fetchCatDetails = async () => {
            try {
                const response = await axios.get(`https://api.thecatapi.com/v1/images/${id}`);
                setCatDetails(response.data);
            } catch (error) {
                console.error('Error fetching cat details:', error);
            }
        };

        if (id) {
            fetchCatDetails();
        }
    }, [id]);

    if (!catDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Cat Details</h1>
            <img src={catDetails.url} alt="Cat" />
            {catDetails.breeds && catDetails.breeds.length > 0 && (
                <div>
                    <h2>{catDetails.breeds[0].name}</h2>
                    <p>{catDetails.breeds[0].temperament}</p>
                    <p>Origin: {catDetails.breeds[0].origin}</p>
                    <p>Life Span: {catDetails.breeds[0].life_span}</p>
                    <a href={catDetails.breeds[0].wikipedia_url} target="_blank" rel="noopener noreferrer">
                        Wikipedia Link
                    </a>
                    <CatComments />
                </div>
            )}
        </div>
    );
}
