<?php 
	include("conexion.php");

	$id_usuario = $_POST['id_usuario'];
	
	$banco = mysqli_query($conectar, "SELECT * FROM banco WHERE id_usuario = $id_usuario");

	if(mysqli_num_rows($banco)==0){
		echo "vacio";
	}else{

	$json = array();
	while($row = mysqli_fetch_array($banco)){

		$json[]=array(
			'nombre_banco'=>$row['nombre_banco'],
			'tipo_cuenta'=>$row['tipo_cuenta'],
			'saldo'=>$row['saldo']
		);
	}		

	$convertir = json_encode($json);

	echo $convertir;
	}
?>