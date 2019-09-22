<?php
$server = "localhost";
$user = "root";
$pass = "password";
$db = "mydb";

$connection = mysqli_connect($server, $user, $pass, $db) or die("error al acceder a base de datos");

$getNodos = "select * from dispositivo";
$result = mysqli_query($connection, $getNodos) or die ("error al recuperar nodos");
$matriz = [ [ ], [ ] ];

while($row = mysqli_fetch_array($result))
{
	$matriz[0][] = [ 'id' => (int)$row['idDispositivo'], 'name' => $row['nombre'] ];
}

$getNeighborhod = "select DISTINCT LEAST(dispositivo_idDispositivo, dispositivo_idDispositivo1), GREATEST(dispositivo_idDispositivo, dispositivo_idDispositivo1) from enlace;";
$result = mysqli_query($connection, $getNeighborhod) or die ("error al recuperar vecindad");
while($row = mysqli_fetch_array($result))
{
	$matriz[1][] = ['dispositivo_idDispositivo' => (int) $row['LEAST(dispositivo_idDispositivo, dispositivo_idDispositivo1)'], 
					'dispositivo_idDispositivo1' => (int) $row['GREATEST(dispositivo_idDispositivo, dispositivo_idDispositivo1)']];
}
echo json_encode($matriz);
?>
