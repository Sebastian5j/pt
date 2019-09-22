<?php
$name = 'unnuevonodo';
$ip = '192.168.1.1';
$query = 'python /home/sebastian/Documentos/proyectoTerminal/codigo/baseDatos/mainInsertDevice.py  '.$name.' '.$ip;
echo $query;
exec($query);
?>
