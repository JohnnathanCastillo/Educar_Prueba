<?php 
	include("conexion.php");

	$id = $_POST['id'];
	
		$eliminar= mysqli_query($conectar,"DELETE FROM usuario WHERE id_usuario = $id ");
		$eliminar_2= mysqli_query($conectar,"DELETE FROM banco WHERE id_usuario = $id ");

			if($eliminar && $eliminar_2){
				echo "eliminado";
			}	else{
				echo "no eliminado";
			}

?> 	