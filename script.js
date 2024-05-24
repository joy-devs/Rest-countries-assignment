document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries-container');
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');
    const themeToggle = document.getElementById('theme-toggle');

    // Fetch country data from a JSON file or API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            displayCountries(data);
        })
        .catch(error => console.error('Error fetching country data:', error));

    function displayCountries(countries) {
        countriesContainer.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');
            countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name.common}">
                <h3>${country.name.common}</h3>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            `;
            countriesContainer.appendChild(countryCard);
        });
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterCountries(query, regionFilter.value);
    });

    regionFilter.addEventListener('change', (e) => {
        filterCountries(searchInput.value.toLowerCase(), e.target.value);
    });

    function filterCountries(query, region) {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                let filteredCountries = data.filter(country => {
                    const matchesSearch = country.name.common.toLowerCase().includes(query);
                    const matchesRegion = region === 'all' || country.region === region;
                    return matchesSearch && matchesRegion;
                });
                displayCountries(filteredCountries);
            })
            .catch(error => console.error('Error fetching country data:', error));
    }

    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });
});
