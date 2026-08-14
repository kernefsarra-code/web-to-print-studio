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

// 📱 Fonction Envoi WhatsApp (Adaptée pour GitHub Pages)
function sendToWhatsApp() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;

    if (!name || !phone) {
        alert("Amanek ikteb esmek w numéro mte3ek!");
        return;
    }

    // ⚠️ Baddal le numéro hedha b'numéro WhatsApp mte3ek (m3a 216 fi l-awel)
    const myPhoneNumber = "21620000000"; 

    // Préparation du message
    const message = `Bonjour! Je souhaite passer une commande.\n👤 Nom: ${name}\n📞 Tél: ${phone}\n🎨 Produit personnalisé créé sur le site web.`;

    // Redirection vers WhatsApp
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}
