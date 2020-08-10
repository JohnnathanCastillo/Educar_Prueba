<?php 
	include("conexion.php");

	$usuario = $_POST['id_usuario'];

	$persona = mysqli_query($conectar, "SELECT * FROM usuario WHERE id_usuario = $usuario");

	$json = array();

	while($row = mysqli_fetch_array($persona)){
		$json[]=array(
		'identificacion'=>$row['identificacion'],
		'nombres'=>$row['nombres'],
		'apellidos'=>$row['apellidos'],
		'direccion'=>$row['direccion'],
		'telefono'=>$row['telefono'],
		'email'=>$row['email']	
			);
	}

	$convert = json_encode($json);

		echo $convert;

?>