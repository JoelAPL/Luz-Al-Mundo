// El token de acceso que has obtenido (asegúrate de mantenerlo seguro y privado)
const accessToken = 'TU_TOKEN_DE_ACCESO';

// Endpoint para obtener datos del perfil
const endpoint = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`;

// Función para obtener datos del perfil de Instagram
async function getInstagramMedia() {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    
    if (data.error) {
      console.error('Error:', data.error);
    } else {
      // Procesar datos aquí
      console.log('Instagram Media:', data.data);
      
      // Por ejemplo, mostrar los datos en la página web
      const container = document.getElementById('instagram-feed');
      data.data.forEach(item => {
        const mediaElement = document.createElement('div');
        mediaElement.innerHTML = `
          <a href="${item.permalink}" target="_blank">
            ${item.media_type === 'IMAGE' ? `<img src="${item.media_url}" alt="${item.caption}" />` : ''}
          </a>
          <p>${item.caption}</p>
        `;
        container.appendChild(mediaElement);
      });
    }
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
  }
}

// Llamar a la función para obtener datos de Instagram
getInstagramMedia();


document.addEventListener("DOMContentLoaded", function() {
  var hiddenLink = document.querySelector('a[href="https://elfsight.com/instagram-feed-instashow/?utm_source=websites&utm_medium=clients&utm_content=instashow&utm_term=localhost&utm_campaign=free-widget"]');
  if (hiddenLink) {
      hiddenLink.style.display = 'none';
  }
});