<?php 
function conectaBD()
{

	$mysqli = new mysqli("localhost", "root", "mr5alQAO0QsV", "mydb");
	if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error()."\n");
    exit();
	}
	else
		echo "conexion exitosa\n";

	return $mysqli;
}

function insertaEdificio($id)
{
	$conn = conectaBD();
	$sql = " insert into Edificio(idEdificio)values(".$id.");";
	if($conn->query($sql)===TRUE)
		echo "insercion exitosa de un Edificio";
	else
    	echo "Error: " . $sql . "  " . $conn->error."\n";


	mysqli_close( $conn);
}

function insertaDepartamento($id,$nombre)
{
	$conn = conectaBD();
	$sql = " insert into Departamento(idDepartamento,nombre)values(".$id.",'".$nombre."');";
	if($conn->query($sql)===TRUE)
		echo "insercion exitosa de un Departamento";
	else
    	echo "Error: " . $sql . "  " . $conn->error."\n";

    mysqli_close( $conn);
}

function insertaProfesor($idProfe,$idDep)
{


	$conn = conectaBD();
	$sql = " insert into Profesor (idProfesor,Departamento_idDepartamento) values (".$idProfe.", ".$idDep.");";
	if($conn->query($sql)===TRUE)
		echo "insercion exitosa de un Profesor";
	else
    	echo "Error: " . $sql  ."  ". $conn->error."\n";

    mysqli_close( $conn);
}


function insertaEspacio($idEspacio,$nombre,$numero,$descripcion,$idEdificio,$idEncargado)
{
	$conn = conectaBD();
	$sql = " insert into Espacio(idEspacio,nombre,numero,descripcion,Edificio_idEdificio,encargado)
						values(".$idEspacio.", '".$nombre."',".$numero.",'".$descripcion."',".$idEdificio.",".$idEncargado.");";
	if($conn->query($sql)===TRUE)
		echo "insercion exitosa de un Espacio";
	else
    	echo "Error: " . $sql . "<br>" . $conn->error."\n";

    mysqli_close( $conn);
}


function insertaProfeEspacio($idprpfeEspacio,$Espacio_idEspacio,$Profesor_idProfesor)
{
	$conn = conectaBD();
	$sql = " insert into profeEspacio(idprpfeEspacio,Espacio_idEspacio,Profesor_idProfesor)
						values(".$idprpfeEspacio.", ".$Espacio_idEspacio.",".$Profesor_idProfesor.");";
	if($conn->query($sql)===TRUE)
		echo "insercion exitosa de un Espacio";
	else
    	echo "Error: " . $sql . "<br>" . $conn->error."\n";

    mysqli_close( $conn);
}


function insertaNodo($idNodo,$rango,$Espacio_idEspacio)
{
	$conn = conectaBD();
	$sql = " insert into Nodo(idNodo,rango,Espacio_idEspacio)values(".$idNodo.", '".$rango."',".$Espacio_idEspacio.");";
	if($conn->query($sql)===TRUE)
		echo "insercion exitosa de un Nodo";
	else
    	echo "Error: " . $sql . "<br>" . $conn->error."\n";

    mysqli_close( $conn);
}

function insertaLectura($idLecturas,$tiempo,$posx,$posy,$temp,$lum,$humedad,$Nodo_idNodo)
{
	$conn = conectaBD();
	$sql = " insert into Lecturas (idLecturas,tiempo,posx,posy,temp,lum,humedad,Nodo_idNodo)
						values(".$idLecturas.", ".$tiempo.",".$posx.",".$posy.",".$temp.",".$lum.",".$humedad.",".$Nodo_idNodo.");";
	if($conn->query($sql)===TRUE)
		echo "insercion exitosa de un Lectura";
	else
    	echo "Error: " . $sql . "<br>" . $conn->error."\n";

    mysqli_close( $conn);
}





function insertaLecturasDesdeCSV()
{
	$row = 0;
	if (($handle = fopen("data.csv", "r")) !== FALSE) 
	{
  		while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) 
  		{
    		$num = count($data);
    		insertaLectura($row,$data[1],$data[2],$data[3],$data[4],$data[5],$data[6], $data[0]);
    		sleep(5);
		    $row++;	
  		}
    fclose($handle);
	}
}

/*
			!!!! 
			hubo un error en mi primer BD...asi que realice una ligera modificacion para que sirviera
*/
insertaEdificio(1);

insertaDepartamento(1,"sistemas");
insertaDepartamento(2,"ciencias basicas");
insertaDepartamento(3,"materiales");
insertaDepartamento(4,"energia");
insertaDepartamento(5,"electronica");

insertaProfesor(1,1);
insertaEspacio(1,"H255",666,"este es un cubiculo",1,1);
insertaProfeEspacio(1,1,1);
for ($i=0; $i <10 ; $i++) { 
	insertaNodo($i,"20 metros",1);
}
insertaLecturasDesdeCSV();

?>