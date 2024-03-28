// Script para inicializar el mapa
function initMap() {
  // Coordenadas de la iglesia
  var church = { lat: 40.7128, lng: -74.0060 };
  // Opciones de mapa
  var mapOptions = {
      center: church,
      zoom: 15,
  };
  // Crear mapa
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  // Marcar la posición de la iglesia
  var marker = new google.maps.Marker({
      position: church,
      map: map,
      title: "Iglesia de San Juan",
  });
}
