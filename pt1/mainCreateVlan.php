<?php
include 'conectarBD.php';

$id = $_GET["id"];
$interfaces = $_GET["interfaces"];
$idVlan = $_GET["idVlan"];
echo $interfaces;
$i = 0;
$noJSON = json_decode($interfaces);
echo "*******";
//echo $noJSON[1]->name;


//echo $noJSON[1];

echo "no JSON tiene ".count($noJSON);

echo "a php llega ";
echo $id;
echo $interfaces;
echo $idVlan;
echo ".............";
$int = $interfaces->name;
echo $int;
/*
$id = 4;
$interfaces = ["gi0/1", "gi0/2"];
$idVlan = 25;
*/
$db = new dbConnection("localhost","root","password","mydb");
$db->connect();

$deviceName = $db->execute("select nombre from dispositivo where idDispositivo = ".$id." LIMIT 1;");


while($row1 = $deviceName->fetch_assoc())
{
			$r1 = $row1["nombre"];                     
            $ip = $db->execute("select ip from interface where dispositivo_idDispositivo = ".$id." AND estado = 'up                    up' AND ip <> 'unassigned' LIMIT 1");
            while($row2 = $ip->fetch_assoc())
            {
                $r2 = $row2["ip"];
                $query = '/usr/bin/python2.7 /var/www/html/pt/mainCreateVlan.py '.$r1.' '.$r2.' '.$idVlan.' ';  
            }
            //$query = '/usr/bin/python2.7 /var/www/html/pt/mainCreateVlan.py '.$deviceName.' '.$ip.' '.$idVlan.' ';
}


for($i = 0; $i < count($noJSON); $i++)
{
    $query.=$noJSON[$i]->name;
    $query.=" ";
}
//echo $query;
$result = system($query);
echo "ya hice el query segun";
echo $result;

$db->disconnect();

?>

