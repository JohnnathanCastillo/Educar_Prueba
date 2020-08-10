<?php 

	include("conexion.php");

	$nombre = $_POST['nombre'];
	$apellido = $_POST['apellido'];
	$direccion = $_POST['direccion'];
	$identificacion = $_POST['identificacion'];
	$telefono = $_POST['telefono'];
	$email = $_POST['email'];
	$banco = $_POST['banco'];
	$cuenta = $_POST['cuenta'];
	$saldo = $_POST['saldo'];


	$creando = mysqli_query($conectar, "INSERT INTO usuario (nombres, apellidos, identificacion, direccion, telefono, email) 
										VALUES ('$nombre', '$apellido', $identificacion, '$direccion','$telefono', '$email') ");

	if($creando){

		$utimo = mysqli_query($conectar,"SELECT * FROM usuario ORDER BY id_usuario DESC LIMIT 1");
			$row = mysqli_fetch_array($utimo);

			 $id_usuario = $row['id_usuario'];

			$banco_insert = mysqli_query($conectar,"INSERT INTO banco (nombre_banco, tipo_cuenta, id_usuario, saldo) VALUES 
													('$banco', '$cuenta', $id_usuario, '$saldo')");


			if($banco_insert){
				echo "creado";
			}else{
				echo "no creado";
			}
	}

?>