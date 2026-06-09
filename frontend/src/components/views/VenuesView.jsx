import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { venuesData } from '../../data';

export default function VenuesView() {
  const { currentVenueFilter, setCurrentVenueFilter, openModal, closeModal } = useAppContext();

  let filtered = venuesData;
  if (currentVenueFilter !== 'all') filtered = venuesData.filter(v => v.country === currentVenueFilter);

  const countryNames = { mexico: 'México 🇲🇽', usa: 'USA 🇺🇸', canada: 'Canadá 🇨🇦' };
  const countryClasses = { mexico: 'country-mexico', usa: 'country-usa', canada: 'country-canada' };

  const showVenueDetails = (venue) => {
    openModal(`🏟️ ${venue.name}`, `
      <div class="space-y-3">
        <img src="${venue.image}" alt="${venue.name}" class="w-full h-40 object-cover rounded-lg">
        <div>
          <h3 class="text-xl font-bold text-white">${venue.name}</h3>
          <div class="flex items-center gap-2 text-gray-300 text-sm">
            <i class="fas fa-map-marker-alt text-red-500"></i>
            <span>${venue.city}, ${countryNames[venue.country]}</span>
          </div>
        </div>
        <p class="text-gray-300 text-sm">${venue.description}</p>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-green-900/30 p-3 rounded-lg text-center border border-green-500/30">
            <div class="text-xs text-green-300">Capacidad</div>
            <div class="font-bold text-lg text-white">${venue.capacity}</div>
          </div>
          <div class="bg-blue-900/30 p-3 rounded-lg text-center border border-blue-500/30">
            <div class="text-xs text-blue-300">Partidos</div>
            <div class="font-bold text-lg text-white">${venue.matches}</div>
          </div>
        </div>
        <button id="closeVenueModal" class="btn-primary w-full py-2 rounded-lg font-bold text-sm">Cerrar</button>
      </div>
    `);
    setTimeout(() => {
      document.getElementById('closeVenueModal').onclick = closeModal;
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-black heading mb-6 text-white drop-shadow-md">Sedes Oficiales</h2>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <button onClick={() => setCurrentVenueFilter('all')} className={`tab-btn whitespace-nowrap ${currentVenueFilter === 'all' ? 'active' : ''}`}>Todos (16)</button>
        <button onClick={() => setCurrentVenueFilter('mexico')} className={`tab-btn whitespace-nowrap ${currentVenueFilter === 'mexico' ? 'active' : ''}`}>México (3)</button>
        <button onClick={() => setCurrentVenueFilter('usa')} className={`tab-btn whitespace-nowrap ${currentVenueFilter === 'usa' ? 'active' : ''}`}>Estados Unidos (11)</button>
        <button onClick={() => setCurrentVenueFilter('canada')} className={`tab-btn whitespace-nowrap ${currentVenueFilter === 'canada' ? 'active' : ''}`}>Canadá (2)</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(v => (
          <div key={v.id} className="glass-panel overflow-hidden animate-slide-up p-0">
            <div className="stadium-img" style={{ backgroundImage: `url('${v.image}')` }}>
              <div className={`stadium-country-badge ${countryClasses[v.country]}`}>
                {countryNames[v.country]}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-1">{v.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                <i className="fas fa-map-marker-alt text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]"></i>
                <span>{v.city}</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{v.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-green-900/30 rounded-lg p-2 text-center border border-green-500/30">
                  <div className="text-xs text-green-300">Capacidad</div>
                  <div className="font-bold text-white">{v.capacity}</div>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-2 text-center border border-blue-500/30">
                  <div className="text-xs text-blue-300">Partidos</div>
                  <div className="font-bold text-white">{v.matches}</div>
                </div>
              </div>
              <button onClick={() => showVenueDetails(v)} className="btn-primary w-full py-1.5 rounded-lg font-bold text-sm shadow-md">
                <i className="fas fa-info-circle mr-1"></i> Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
