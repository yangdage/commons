window.onload=function(){
	var $h3_list=document.getElementsByTagName("h3");
	var li_html="",href="",text="";
	for(var i=0;i<$h3_list.length;i++){
		$h3=$h3_list[i];
		href=$h3.childNodes[0].hash;
		//兼容chrome和火狐及IE11
		text=$h3.innerText||$h3.textContent;
		li_html+='<li class="menu-title"><a href="'+href+'">'+text+'</a></li>';
	}
	document.getElementById("menu").innerHTML='<ul style="list-style:none;display:block-inline;font-size:12px;">'+li_html+'</ul>';
	document.getElementsByTagName("body")[0].setAttribute("style","float:right;width:60em;");
	document.getElementById("menu").setAttribute("style","position:fixed;left:0;top:0;");
};
function parseDom(arg) {
　　var objE = document.createElement("div");
　　objE.innerHTML = arg;
　　return objE.childNodes;
};
