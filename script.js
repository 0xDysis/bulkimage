var overlayImages = [];

document.getElementById('baseLayer').addEventListener('change', function(e) {
    document.getElementById('baseLayerImage').src = URL.createObjectURL(e.target.files[0]);
});

document.getElementById('overlays').addEventListener('change', function(e) {
    overlayImages = Array.from(e.target.files).map(function(file) {
        return URL.createObjectURL(file);
    });
    document.getElementById('overlayImage').src = overlayImages[0];
});

document.getElementById('removeBaseLayer').addEventListener('click', function() {
    document.getElementById('baseLayerImage').src = '';
    document.getElementById('baseLayer').value = '';
});

document.getElementById('removeOverlays').addEventListener('click', function() {
    document.getElementById('overlayImage').src = '';
    document.getElementById('overlays').value = '';
    overlayImages = [];
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

document.getElementById('filterSelector').addEventListener('change', function(e) {
    document.getElementById('overlayImage').style.filter = e.target.value;
});

document.getElementById('downloadImages').addEventListener('click', function() {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var baseLayerImage = document.getElementById('baseLayerImage');
    var overlayImage = document.getElementById('overlayImage');
    canvas.width = baseLayerImage.width;
    canvas.height = baseLayerImage.height;
    var overlayWidth = overlayImage.offsetWidth / baseLayerImage.offsetWidth * baseLayerImage.width;
    var overlayHeight = overlayImage.offsetHeight / baseLayerImage.offsetHeight * baseLayerImage.height;
    var overlayX = parseFloat(overlayImage.style.left) / 100 * baseLayerImage.width;
    var overlayY = parseFloat(overlayImage.style.top) / 100 * baseLayerImage.height;
    var filter = overlayImage.style.filter;

    overlayImages.forEach(function(src, index) {
        var img = new Image();
        img.onload = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(baseLayerImage, 0, 0);
            context.save();
            context.filter = filter;
            context.drawImage(img, overlayX, overlayY, overlayWidth, overlayHeight);
            context.restore();
            var dataUrl = canvas.toDataURL('image/png');
            var a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'combined' + index + '.png';
            a.click();
        };
        img.src = src;
    });
});


