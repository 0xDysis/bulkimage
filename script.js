document.getElementById('baseLayer').addEventListener('change', function(e) {
    document.getElementById('baseLayerImage').src = URL.createObjectURL(e.target.files[0]);
});

document.getElementById('overlay').addEventListener('change', function(e) {
    document.getElementById('overlayImage').src = URL.createObjectURL(e.target.files[0]);
});

document.getElementById('removeBaseLayer').addEventListener('click', function() {
    document.getElementById('baseLayerImage').src = '';
    document.getElementById('baseLayer').value = '';
});

document.getElementById('removeOverlay').addEventListener('click', function() {
    document.getElementById('overlayImage').src = '';
    document.getElementById('overlay').value = '';
});

document.getElementById('sizeSlider').addEventListener('input', function(e) {
    document.getElementById('overlayImage').style.width = e.target.value + '%';
    document.getElementById('sizeInput').value = e.target.value;
});

document.getElementById('sizeInput').addEventListener('input', function(e) {
    document.getElementById('overlayImage').style.width = e.target.value + '%';
    document.getElementById('sizeSlider').value = e.target.value;
});

document.getElementById('xSlider').addEventListener('input', function(e) {
    document.getElementById('overlayImage').style.left = e.target.value + '%';
    document.getElementById('xInput').value = e.target.value;
});

document.getElementById('xInput').addEventListener('input', function(e) {
    document.getElementById('overlayImage').style.left = e.target.value + '%';
    document.getElementById('xSlider').value = e.target.value;
});

document.getElementById('ySlider').addEventListener('input', function(e) {
    document.getElementById('overlayImage').style.top = e.target.value + '%';
    document.getElementById('yInput').value = e.target.value;
});

document.getElementById('yInput').addEventListener('input', function(e) {
    document.getElementById('overlayImage').style.top = e.target.value + '%';
    document.getElementById('ySlider').value = e.target.value;
});
