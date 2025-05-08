
let video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => { video.srcObject = stream; })
  .catch(err => { console.error("تم رفض الوصول إلى الكاميرا"); });

function capture() {
  let canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  let dataURL = canvas.toDataURL('image/jpeg');

  fetch('/capture', {
    method: 'POST',
    body: JSON.stringify({ image: dataURL }),
    headers: { 'Content-Type': 'application/json' }
  }).then(() => alert("✅ تم الالتقاط!"));
}
