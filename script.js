// Initialisation du Canvas Fabric.js
const canvas = new fabric.Canvas('tshirtCanvas');

// Changer la couleur du produit en direct
document.getElementById('bgColor').addEventListener('input', function(e) {
    document.getElementById('productWrapper').style.backgroundColor = e.target.value;
});

// Ajouter du texte sur le Canvas
function addText() {
    const textValue = document.getElementById('textInput').value;
    if(!textValue) return;

    const text = new fabric.Text(textValue, {
        left: 100,
        top: 100,
        fontFamily: 'arial',
        fill: '#ffffff',
        fontSize: 24
    });
    canvas.add(text);
    canvas.setActiveObject(text);
}

// Upload d'une image par le client
document.getElementById('imageLoader').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function() {
            const image = new fabric.Image(imgObj);
            image.scaleToWidth(150);
            canvas.centerObject(image);
            canvas.add(image);
            canvas.renderAll();
        }
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Supprimer l'élément sélectionné
function deleteSelected() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
    }
}

// Enregistrer le design sous forme d'image HD et envoyer le formulaire
function prepareOrder(event) {
    // Transformer le rendu en base64 (DataURL)
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0
    });
    document.getElementById('designData').value = dataURL;
}