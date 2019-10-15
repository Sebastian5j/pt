<?php
include 'conectarBD.php';
//$id = $_GET["id"];
$idVlan = $_GET["id"];
$server = "localhost";
$user = "root";
$pass = "password";
$db = "mydb";

$connection = mysqli_connect($server, $user, $pass, $db) or die("error al acceder a base de datos");
$getNodos = "select nombre from interface where dispositivo_idDispositivo = ".$idVlan." and nombre not like 'Vlan%';";
$interfacesName = mysqli_query($connection, $getNodos) or die ("error al recuperar nodos");

if($interfacesName->num_rows > 0)
{
	while($row = $interfacesName->fetch_assoc())
	{
	    $interfaces[] = ['name' => $row['nombre'] ];
    }
}
echo json_encode($interfaces);
?>