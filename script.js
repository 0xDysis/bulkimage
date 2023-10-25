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



document.getElementById('shadowXSlider').addEventListener('input', function(e) {
    document.getElementById('shadowXInput').value = e.target.value;
    document.getElementById('shadowBar').style.left = e.target.value + '%';
});

document.getElementById('shadowXInput').addEventListener('input', function(e) {
    document.getElementById('shadowXSlider').value = e.target.value;
    document.getElementById('shadowBar').style.left = e.target.value + '%';
});

document.getElementById('shadowYSlider').addEventListener('input', function(e) {
    document.getElementById('shadowYInput').value = e.target.value;
    document.getElementById('shadowBar').style.top = e.target.value + '%';
});

document.getElementById('shadowYInput').addEventListener('input', function(e) {
    document.getElementById('shadowYSlider').value = e.target.value;
    document.getElementById('shadowBar').style.top = e.target.value + '%';
});

document.getElementById('shadowWidthSlider').addEventListener('input', function(e) {
    document.getElementById('shadowWidthInput').value = e.target.value;
    document.getElementById('shadowBar').style.width = e.target.value + '%';
});

document.getElementById('shadowWidthInput').addEventListener('input', function(e) {
    document.getElementById('shadowWidthSlider').value = e.target.value;
    document.getElementById('shadowBar').style.width = e.target.value + '%';
});

document.getElementById('shadowHeightSlider').addEventListener('input', function(e) {
    document.getElementById('shadowHeightInput').value = e.target.value;
    document.getElementById('shadowBar').style.height = e.target.value + '%';
});

document.getElementById('shadowHeightInput').addEventListener('input', function(e) {
    document.getElementById('shadowHeightSlider').value = e.target.value;
    document.getElementById('shadowBar').style.height = e.target.value + '%';
});
document.getElementById('toggleShadowControls').addEventListener('click', function() {
    var shadowControls = document.getElementById('shadowControls');
    if (shadowControls.style.display === 'none') {
        shadowControls.style.display = 'block';
    } else {
        shadowControls.style.display = 'none';
    }
});
document.getElementById('shadowTranslucenceSlider').addEventListener('input', function(e) {
    document.getElementById('shadowTranslucenceInput').value = e.target.value;
    document.getElementById('shadowBar').style.backgroundColor = 'rgba(0, 0, 0, ' + e.target.value + ')';
});

document.getElementById('shadowTranslucenceInput').addEventListener('input', function(e) {
    document.getElementById('shadowTranslucenceSlider').value = e.target.value;
    document.getElementById('shadowBar').style.backgroundColor = 'rgba(0, 0, 0, ' + e.target.value + ')';
});
// Add this event listener for the checkbox
document.getElementById('shadowCheckbox').addEventListener('change', function(e) {
    if (e.target.checked) {
        // If the checkbox is checked, show the shadow controls and apply the shadow
        document.getElementById('shadowControls').style.display = 'block';
        document.getElementById('shadowBar').style.display = 'block';
    } else {
        // If the checkbox is unchecked, hide the shadow controls and remove the shadow
        document.getElementById('shadowControls').style.display = 'none';
        document.getElementById('shadowBar').style.display = 'none';
    }
});

var checkboxes = document.querySelectorAll('#filterSelector input[type="checkbox"]');

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        var filters = [];
        checkboxes.forEach(function(c) {
            if (c.checked) {
                filters.push(c.value);
            }
        });
        document.getElementById('overlayImage').style.filter = filters.join(' ');
    });
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

    var shadowX = parseFloat(document.getElementById('shadowXInput').value) / 100 * baseLayerImage.width;
    var shadowY = parseFloat(document.getElementById('shadowYInput').value) / 100 * baseLayerImage.height;
    var shadowWidth = parseFloat(document.getElementById('shadowWidthInput').value) / 100 * baseLayerImage.width;
    var shadowHeight = parseFloat(document.getElementById('shadowHeightInput').value) / 100 * baseLayerImage.height;

    function drawImageWithShadow(context, img, x, y, width, height, shadowX, shadowY, shadowWidth, shadowHeight) {
        context.drawImage(img, x, y, width, height);
        
        // Check if the shadow bar is visible on the webpage
        var shadowBarStyle = window.getComputedStyle(document.getElementById('shadowBar'));
        if (shadowBarStyle.display !== 'none') {
            // If the shadow bar is visible, get its opacity
            var shadowOpacity = parseFloat(shadowBarStyle.backgroundColor.split(',').pop().slice(0, -1));
            
            // Draw the shadow bar on the canvas with the correct opacity
            context.fillStyle = 'rgba(0, 0, 0, ' + shadowOpacity + ')';
            context.fillRect(shadowX, shadowY, shadowWidth, shadowHeight);
        }
    }
    
   
    
    overlayImages.forEach(function(src, index) {
        var img = new Image();
        img.onload = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawImageWithShadow(context, baseLayerImage, 0, 0, baseLayerImage.width, baseLayerImage.height, shadowX, shadowY, shadowWidth, shadowHeight);
            context.save();
            context.filter = filter;
            drawImageWithShadow(context, img, overlayX, overlayY, overlayWidth, overlayHeight, shadowX, shadowY, shadowWidth, shadowHeight);
            context.restore();
            var dataUrl = canvas.toDataURL('image/webp');

            var a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'combined' + index + '.png';
            a.click();
        };
        img.src = src;
    });
});

