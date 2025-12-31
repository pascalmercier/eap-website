// Concerts management
class ConcertsManager {
  constructor() {
    this.concerts = [];
    this.showPastConcerts = false;
    this.csvPath = 'data/concerts.csv';
    // this.csvPath = 'data/concerts-past-test.csv';
  }

  // Parse CSV text to array of objects
  parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const concerts = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      if (values.length === headers.length) {
        const concert = {};
        headers.forEach((header, index) => {
          concert[header] = values[index].trim();
        });
        concerts.push(concert);
      }
    }

    return concerts;
  }

  // Parse CSV line handling quoted values
  parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);

    return values;
  }

  // Format date to display format
  formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['Jan.', 'Fév.', 'Mar.', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    
    return {
      day: date.getDate().toString(),
      month: months[date.getMonth()],
      year: date.getFullYear().toString()
    };
  }

  // Check if date is today or in the future
  isFutureDate(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const concertDate = new Date(dateString);
    concertDate.setHours(0, 0, 0, 0);
    return concertDate >= today;
  }

  // Sort concerts by date (ascending: oldest first)
  sortConcertsByDateAscending(concerts) {
    return concerts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  }

  // Sort concerts by date (descending: newest first)
  sortConcertsByDateDescending(concerts) {
    return concerts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  }

  // Create empty state element
  createEmptyState() {
    const div = document.createElement('div');
    div.className = 'concerts__empty';
    div.innerHTML = `
      <p class="concerts__empty-message">Aucun concert à venir pour le moment.</p>
      <p class="concerts__empty-subtitle">Revenez bientôt pour découvrir nos prochains événements !</p>
    `;
    return div;
  }

  // Create concert item element
  createConcertElement(concert) {
    const article = document.createElement('article');
    article.className = 'concert-item';

    const dateInfo = this.formatDate(concert.date);
    const facebookLink = concert.facebook_link || concert.facebookLink || '';

    article.innerHTML = `
      <div class="concert-item__date">
        <p class="concert-item__month">${dateInfo.month}</p>
        <p class="concert-item__day">${dateInfo.day}</p>
        <p class="concert-item__year">${dateInfo.year}</p>
      </div>
      <div class="concert-item__details">
        <p class="concert-item__venue">${concert.venue}</p>
        <p class="concert-item__address">${concert.address}</p>
      </div>
      ${facebookLink ? `<a href="${facebookLink}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--v2">Détails</a>` : '<button class="btn btn--secondary btn--v2">Détails</button>'}
    `;

    return article;
  }

  // Render concerts
  renderConcerts() {
    const futureList = document.getElementById('concerts-list');
    const pastList = document.getElementById('concerts-list-past');
    const toggleContainer = document.getElementById('concerts-past-toggle');

    // Clear existing content
    futureList.innerHTML = '';
    pastList.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter concerts by visibility flag (only show if visible === 'true' or visible === true)
    const visibleConcerts = this.concerts.filter(c => {
      const visible = c.visible === 'true' || c.visible === true || c.visible === 'TRUE';
      return visible;
    });

    const futureConcerts = visibleConcerts.filter(c => this.isFutureDate(c.date));
    const pastConcerts = visibleConcerts.filter(c => !this.isFutureDate(c.date));

    // Sort concerts: both lists in descending order (furthest future/newest first, oldest last)
    const sortedFuture = this.sortConcertsByDateDescending(futureConcerts);
    const sortedPast = this.sortConcertsByDateDescending(pastConcerts);

    // Render future concerts or empty state
    if (sortedFuture.length > 0) {
      sortedFuture.forEach(concert => {
        futureList.appendChild(this.createConcertElement(concert));
      });
      // Remove empty state if it exists
      const emptyState = futureList.querySelector('.concerts__empty');
      if (emptyState) {
        emptyState.remove();
      }
    } else {
      // Show empty state
      futureList.innerHTML = '';
      const emptyState = this.createEmptyState();
      futureList.appendChild(emptyState);
    }

    // Render past concerts if toggle is active
    if (this.showPastConcerts) {
      sortedPast.forEach(concert => {
        pastList.appendChild(this.createConcertElement(concert));
      });
      pastList.style.display = 'flex';
      pastList.classList.add('concerts__list--visible');
    } else {
      pastList.style.display = 'none';
      pastList.classList.remove('concerts__list--visible');
    }

    // Show/hide past concerts toggle button
    if (pastConcerts.length > 0) {
      toggleContainer.style.display = 'block';
      const toggleButton = document.getElementById('toggle-past-concerts');
      toggleButton.textContent = this.showPastConcerts 
        ? 'Masquer les événements passés' 
        : 'Voir les événements passés';
    } else {
      toggleContainer.style.display = 'none';
    }
  }

  // Toggle past concerts visibility
  togglePastConcerts() {
    this.showPastConcerts = !this.showPastConcerts;
    this.renderConcerts();
  }

  // Load concerts from CSV
  async loadConcerts() {
    try {
      const response = await fetch(this.csvPath);
      if (!response.ok) {
        throw new Error(`Failed to load concerts: ${response.statusText}`);
      }
      const csvText = await response.text();
      this.concerts = this.parseCSV(csvText);
      this.renderConcerts();
    } catch (error) {
      console.error('Error loading concerts:', error);
      const futureList = document.getElementById('concerts-list');
      futureList.innerHTML = '<p>Erreur lors du chargement des concerts.</p>';
    }
  }

  // Initialize
  init() {
    this.loadConcerts();
    
    // Add event listener to toggle button
    const toggleButton = document.getElementById('toggle-past-concerts');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.togglePastConcerts());
    }
  }
}

// Initialize concerts manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const concertsManager = new ConcertsManager();
  concertsManager.init();
});

