<?php
// Connexion à la base de données (A modifier selon ton serveur)
$host = "localhost";
$user = "root";
$password = "";
$dbname = "customizer_db";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['client_name']);
    $phone = htmlspecialchars($_POST['client_phone']);
    $designData = $_POST['designData'];

    // Convertir l'image Base64 et la sauvegarder dans un dossier
    $imgData = str_replace('data:image/png;base64,', '', $designData);
    $imgData = str_replace(' ', '+', $imgData);
    $data = base64_decode($imgData);
    
    $fileName = 'uploads/design_' . time() . '.png';
    file_put_filename_or_save: file_put_contents($fileName, $data);

    // Insertion dans la Base de données
    $stmt = $pdo->prepare("INSERT INTO orders (client_name, client_phone, design_file) VALUES (?, ?, ?)");
    if ($stmt->execute([$name, $phone, $fileName])) {
        echo "<h1 style='color:green; text-align:center;'>Mabrouk! Commande enregistrée avec succès.</h1>";
        echo "<p style='text-align:center;'><a href='index.html'>Créer un autre design</a></p>";
    } else {
        echo "Erreur lors de la commande.";
    }
}
?>