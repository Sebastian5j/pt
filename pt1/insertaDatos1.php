<?php
/*
    primero ejecuten el script de Oscar, luego este php
    php insertaDatos.php (Linux)
    para Windows creo es igual, pero es necesario un desmadre de las rutas de php
*/
    function conectaBD()
    {
        /*
            cambien sus datos aqui, ya saben... su usuario, pass.
            "mydb" es la base que viene dentro del Script de Oscar,
            si quieren cambiar aqui "mydb" tambien debe hacerlo en el script
            en la linea 16 " USE `mydb` ; " 
        */
        $mysqli = new mysqli("localhost", "root", "mr5alQAO0QsV", "mydb");
        if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error()."\n");
        exit();
        }
        else
            echo "conexion exitosa\n";
    
        return $mysqli;
    }
    function insertaAlumno($name,$lastName,$matricula,$balance)
    {   
        $conn = conectaBD();
        $sql = " insert into Alumno (nombre,apellidos,matricula,saldo) values ('".$name."', '".$lastName."', '".$matricula."', ".$balance." );";
        if($conn->query($sql)===TRUE)
            echo "insercion exitosa de Alumno \n";
        else
            echo "Error: " . $sql  ."  ". $conn->error."\n";

        mysqli_close( $conn);   
    }

    function insertaServicio($tipo,$costo)
    {   
        $conn = conectaBD();
        $sql = " insert into Servicio (tipo,costo) values ('".$tipo."',".$costo.");";
        if($conn->query($sql)===TRUE)
            echo "insercion exitosa de Servicio \n";
        else
            echo "Error: " . $sql  ."  ". $conn->error."\n";

        mysqli_close( $conn);   
    }

    function insertaHorario($inicio,$fin,$cupo,$idServicio)
    {   
        $conn = conectaBD();
        $sql = " insert into Horario (inicio,fin,cupo,Servicio_idServicio) values ('".$inicio."','".$fin."',".$cupo.",".$idServicio.");";
        if($conn->query($sql)===TRUE)
            echo "insercion exitosa de Horario \n";
        else
            echo "Error: " . $sql  ."  ". $conn->error."\n";

        mysqli_close( $conn);   
    }


    function insertaTurno($fecha,$idAlumno,$idHorario)
    {   
        $conn = conectaBD();
        $sql = " insert into Turno (fecha,Alumno_idAlumno,Horario_idHorario) values ('".$fecha."',".$idAlumno.",".$idHorario.");";
        if($conn->query($sql)===TRUE)
            echo "insercion exitosa de Turno \n";
        else
            echo "Error: " . $sql  ."  ". $conn->error."\n";

        mysqli_close( $conn);   
    }
/* Los paramtros son tal cual como se los pasariamos en mysql */
    insertaAlumno("Alejandra", "Rodriguez", "214", 10); // <3
    insertaServicio("cena",15); //su id deberia ser 2
    insertaHorario("5","4",100,2); //le asigno la cena
    insertaTurno("28/11",3,2); //asingo a Alejandra al turno de la Cena
    
    //yo lo probe y sirve, prueben :D


?>