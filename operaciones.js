listar();
$("#alert_no_accion").show();
$("#banco").hide();
$("#usuario").hide();
$("#ventana_crear").hide();
$("#nombre_nuevo").val('');
$("#apellido_nuevo").val('');
$("#identificacion_nuevo").val('');
$("#direccion_nuevo").val('');
$("#telefono_nuevo").val('');
$("#email_nuevo").val('');
$("#banco_select").val('');
$("#cuenta_select").val('');
$("#saldo").val('');
//list user's 
function listar(){

	$.ajax({
		type:'GET',
		url:'listar.php',
		success:function(e){
			let traer = JSON.parse(e);
			let template = "";

			traer.forEach((result)=>{
				template +=
				`
				<tr data_id="${result.id_usuario}">
					<td>${result.identificacion}</td>
					<td>${result.nombres}</td>
					<td>${result.apellidos}</td>
					<td>
						<div class="col-sm-12" style="text-align:center;">
							<button id="btn_dolar" class="btn btn-success" title="Presiona para ver el saldo"><i class="fas fa-dollar-sign"></i></button>
							<button id="btn_persona" class="btn btn-primary" title="Presiona para ver el perfil"><i class="fa fa-user"></i></button>
							<button id="btn_eliminar" class="btn btn-danger" title="Presiona para eliminar"><i class="fas fa-trash-alt"></i></button>
						</div>
					</td>
				</tr>
				`;
			});
			$("#listados").html(template);
		}

	});
}

//acceder al btn_dolar

$(document).on('click','#btn_dolar',function(){

	let elemento = $(this)[0].parentElement.parentElement.parentElement;
	let id_usuario = $(elemento).attr("data_id");

	$.ajax({
		type:"POST",
		data:{id_usuario},
		url:"banco.php",
		success:function(e){
		console.log(e);
			if(e == "vacio"){
				let sin_registros = "<div class='alert alert-warning' role='alert'>Sin registros</div>";
				$("#alert_no_accion").hide();
				$("#banco").hide();
				$("#notificaciones").show();
				$("#usuario").hide();
				$("#notificaciones").html(sin_registros);

			}else{

			$("#notificaciones").hide();
			$("#banco").show();
			$("#usuario").hide();

			let traer = JSON.parse(e);
			traer.forEach((result)=>{
		
				$("#nombre_banco").text(result.nombre_banco);
				$("#cuenta_banco").text(result.tipo_cuenta);
				$("#saldo_banco").text(result.saldo);
			});

			}		
		}

	});	

});	


//acceder al btn_persona

$(document).on('click',"#btn_persona",function(){
	let elemento = $(this)[0].parentElement.parentElement.parentElement;
	let id_usuario = $(elemento).attr("data_id");

	$.ajax({
		type:"POST",
		data:{id_usuario},
		url:"persona.php",
		success:function(e){
			console.log(e);
			let traer = JSON.parse(e);
			$("#usuario").show();
			$("#notificaciones").hide();
			$("#banco").hide();
			traer.forEach((result)=>{
				$("#nombres_apellidos").text(result.nombres +" "+ result.apellidos);
				$("#identificacion").text(result.identificacion);
				$("#direccion").text(result.direccion);
				$("#telefono").text(result.telefono);
				$("#email").text(result.email);
			});
		}
	});
});


(function(){

	$("#btn_mostrar_crear").click(function(){

		
		$("#ventana_crear").show();
		$("#usuarios").hide();
		$("#btn_mostrar_crear").hide();

	});
}());


(function(){

	$("#close").click(function(){

		
		$("#ventana_crear").hide();
		$("#usuarios").show();
		$("#btn_mostrar_crear").show();

	});
}());


(function(){
	$("#creando_usuario").click(function(){

	const datos = {
		nombre : $("#nombre_nuevo").val(),
		apellido: $("#apellido_nuevo").val(),
		identificacion: $("#identificacion_nuevo").val(),
		direccion: $("#direccion_nuevo").val(),
		telefono: $("#telefono_nuevo").val(),
		email: $("#email_nuevo").val(),
		banco: $("#banco_select").val(),
		cuenta: $("#cuenta_select").val(),
		saldo: $("#saldo").val()
	}

	$.post('creando_usuario.php', datos, function(e){

		if(e=="creado"){
			Swal.fire({
				position:'center',
				icon:'success',
				title:'Registro Creado',
				timer:1500
			});  		
			listar();
			$("#nombre_nuevo").val('');
			$("#apellido_nuevo").val('');
			$("#identificacion_nuevo").val('');
			$("#direccion_nuevo").val('');
			$("#telefono_nuevo").val('');
			$("#email_nuevo").val('');
			$("#banco_select").val('');
			$("#cuenta_select").val('');
			$("#saldo").val('');
			$("#usuario").hide();		
		}
	});

	});
}());



	$(document).on('click','#btn_eliminar',function(){
		let elemento = $(this)[0].parentElement.parentElement.parentElement;
		let id = $(elemento).attr("data_id");

		Swal.fire({
			position:'center',
			icon:'error',
			title:'Seguro desea eliminar el registro?',
			showConfirmButton:true,
			confirmButtonText:'Si!',
			showCancelButton:true,
			cancelButtonText:'No!'
		}).then((result)=>{
			if(result.value){

		$.ajax({
			type:'post',
			data: {id},
			url: 'eliminar.php',
			success:function(e){
				console.log(e);
				if(e=="eliminado"){
					Swal.fire({
						position:'center',
						title:'Registro eliminado',
						icon:'success',
						timer:1500
					});
					$("#eliminar").hide();
					listar();
				}

			}
		});
		}
		});
	});
