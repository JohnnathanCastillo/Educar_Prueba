<?php 

	$user = "root";
	$server = "localhost";
	$pass = "";
	$db = "educar";

	$conectar = mysqli_connect($server, $user, $pass, $db);

		if($conectar){
			//echo "conectados";
		}else{
			//echo "no conectados";
		}


?>