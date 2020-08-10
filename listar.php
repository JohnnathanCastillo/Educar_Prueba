<?php

	include("conexion.php");

		$listar = mysqli_query($conectar,"SELECT * FROM usuario");

		$json = array();

		while($row=mysqli_fetch_array($listar)){
			$json[]=array(
			'id_usuario'=>$row['id_usuario'],	
			'identificacion'=>$row['identificacion'],
			'nombres'=>$row['nombres'],
			'apellidos'=>$row['apellidos'],
			'direccion'=>$row['direccion'],
			'telefono'=>$row['telefono'],
			'email'=>$row['email']		
				);
		}

		$convertir = json_encode($json);

			echo $convertir;

 ?>