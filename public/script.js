document.addEventListener('DOMContentLoaded', function() {
    const clientId = '4oqdslgbp4efuim24x8kdftf2idtm6'; // Twitchから取得したクライアントIDに置き換えてください。
    const limit = 20; // 表示する動画の数

    fetch('https://api.twitch.tv/helix/streams?first=' + limit, {
        headers: {
            'Client-ID': clientId
        }
    })
    .then(response => response.json())
    .then(data => {
        const videosContainer = document.getElementById('twitch-videos');
        data.data.forEach(stream => {
            const videoElement = document.createElement('div');
            videoElement.innerHTML = `
                <h3>${stream.user_name}</h3>
                <img src="${stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180')}" alt="${stream.title}">
            `;
            videosContainer.appendChild(videoElement);
        });
    })
    .catch(error => console.error('Error:', error));
});
