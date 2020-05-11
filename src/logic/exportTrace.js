import './common';

$("#traceinfo").on("mouseover","li",function(){
  $(".jq_tips",this).show().stop().animate({
    right:415
  },300);
})
$("#traceinfo").on("mouseout","li",function(){
  $(".jq_tips",this).stop().animate({
    right:400
  },300).hide();
});


	//跳转页面后截取url，看页面后有没有参数，有的话说明从首页链接而来，要组参数进行查询，否则不做操作
	var url = window.location.search;
	if(url.indexOf("&") > 0){
		url = url.substring(1, url.length);
		
		var ctn_no = url.split("&")[1];
		ctn_no = ctn_no.split("=")[1];
		$("#ctnno").val(ctn_no);
		_submit();
	}

function _submit(){
	
	var ctnno = $("#ctnno").val();
	var blno = $("#blno").val().toUpperCase();
	var type = $('input[name="type"]:checked').val();
	
    if((ctnno==""&&type=="ctn")||(blno==""&&type=="bl")){
		
		alert("输入条件不能为空！");
		return;
	}
    
	
	$("#ctnbutton").val("查询中...").attr("disabled",true);
	$("#querycontent").fadeOut(500); 
	
	$.ajax({
		type : "post" ,
		 //url : "/trace/containerInfo.action?ctnno="+ctnno,
        url : "/ybt/trace/exportTrace.action?containerQueryType="+type+"&blno="+blno+"&ctnno="+ctnno,
        dataType : "json" ,
        success : function(data){
		
		 $("#querycontent").hide();
		 
		 if(data.flag=="0"){
			 alert("没有相关记录!");
			 $("#ctnbutton").val("查询").removeAttr("disabled");
			 return;
		 }
		 if(data.ctnFlag=="m"){
			 alert("我们发现这个箱号下存在多个提单，我们给您列出其中一条提单的相关信息，若要精确查询信息请按提单号进行查询!");
			 $("#ctnbutton").val("查询").removeAttr("disabled");
			 //return;
		 }
		 
		 if(data.flag==100){
			 alert("没有访问权限!"); 
			 $("#ctnbutton").val("查询").removeAttr("disabled");
			 return;
		 }
         
		  $("#ctninfo").empty(); 
		  
		//判断返回来的字符串是ctn还是bill的
		  if(type=="ctn"){
		  
			  $("#ctninfo").append(
				
					    '<tr><th>箱号</th><th>提单号</th><th colspan="2">英文船名航次</th></tr>'+
						'<tr><td>'+(data.orderTranscationCtn.ctnNo||"-")+'</td><td>'+(data.orderTranscationCtn.billNo||"-")+'</td><td colspan="2">'+(data.vesselEname||"-")+'/'+(data.voyage||"-")+'</td></tr>'+
						'<tr><th>箱型尺寸</th><th>箱类别</th><th>箱状态</th><th>箱主</th></tr>'+
						'<tr><td>'+(data.orderTranscationCtn.ctnSizetype||"-")+'</td><td>-</td><td>'+(data.orderTranscationCtn.ctnStatus||"-")+'</td><td>'+(data.orderTranscationCtn.ctnOwner||"-")+'</td></tr>'+
						'<tr><th>铅封号</th><th>联合国编号</th><th>装货港</th><th>卸货港</th></tr>'+
						'<tr><td>'+(data.orderTranscationCtn.ctnSealno||"-")+'</td><td>-</td><td>-</td><td>-</td></tr>'+
						'<tr><th>箱重</th><th>称重重量</th><th>单证重量</th><th>冷箱标记</th></tr>'+
						'<tr><td>'+(data.orderTranscationCtn.ctnWeight||"-")+'</td><td>-</td><td>-</td><td>'+(data.orderTranscationCtn.ctnFlagT||"-")+'</td></tr>'+
						'<tr><th>危险品等级</th><th>超限箱标记</th><th></th><th></th></tr>'+
						'<tr><td>'+(data.orderTranscationCtn.ctnFlagD||"-")+'</td><td>'+(data.orderTranscationCtn.ctnFlagL||"-")+'</td><td></td><td></td></tr>'
			  
			  );
			  $("#infotitle").html('<div><i></i>单箱信息</div>');
			  $("#traceinfo").empty();  
			  var obj = eval(data.traceinfo);
			  $.each(obj,function(i){
				  var list = obj[i];
			      $("#traceinfo").append(
			    		'<li class="current">'+
					    '<em class="mark"></em>'+
					    '<a href="###" class="link-hd">'+
						'<span class="fl"><b>'+(list.nodeDesc||"")+'</b></span>'+
						'<span class="fl">状态:'+(list.nodeContent||"")+'</span>'+
						'<span class="fl">地点:'+(list.nodeLocation||"")+'</span>'+
						'<span class="fl">时间:'+(list.nodeDate||"")+'</span>'+
					    '</a>'+
						'<div class="jq_tips">'+
						'<p><span class="tips_txt"><b>船名/航次（备注）:</b>'+(list.nodeRemark||"")+'</span></p>'+
						'<em></em></div></li>'
					);  
			  });
		   //返回提单数据
		  }else{
			  
			  var $infohtml="";
			   
				  $infohtml='<tr><th colspan="2">提单号</th><th colspan="2">英文船名航次</th></tr>'+
							'<tr><td colspan="2">'+(data.billNo||"-")+'</td><td colspan="2">'+(data.vesselEname||"-")+'/'+(data.voyage||"-")+'</td></tr>'+
							'<tr><th colspan="2">发货人</th><th colspan="2">收货人</th></tr>'+
							'<tr><td colspan="2">'+(data.orderTranscation.contact||"-")+'</td><td colspan="2">'+(data.orderTranscation.consignee||"-")+'</td></tr>'+
							'<tr><th>起运港</th><th>目的港</th><th>20尺箱子</th><th>40尺箱子</th></tr>'+
							'<tr><td>'+(data.orderTranscation.shipmentPort||"-")+'</td><td>'+(data.orderTranscation.dischargePort||"-")+'</td><td>'+(data.orderTranscation.ctn20Number||"-")+'</td><td>'+(data.orderTranscation.ctn40Number||"-")+'</td></tr>'+
							'<tr><th>件数</th><th>毛重</th><th>体积</th><th></th></tr>'+
							'<tr><td>'+(data.orderTranscation.unitnumber||"-")+'</td><td>'+(data.orderTranscation.weight||"-")+'</td><td>'+(data.orderTranscation.volume||"-")+'</td><td>  </td></tr>';
			  
			  //展现提单信息
			  $("#ctninfo").append($infohtml);
			  $("#infotitle").html('<div><i></i>提单信息</div>');
			  
			  
			  //清空跟踪信息
			  $("#traceinfo").empty(); 		  
			  var obj = eval(data.traceinfo);
			  var $html = "";
			  var currentnode = 0; //当前seq的数值
			  var divclose="y"; //层关闭开关
			  
			  $.each(obj,function(i){
				  
				  var list = obj[i];
				  
				  if(list.nodeSequence!=currentnode&&divclose=="n"){
						
	                   $html+='<em></em></div></li>';
	                	   
					 }  
				  
				  //该节点没有子节点
				  if(list.nodeFlagCtn=="N"){
					  
					  $html+= '<li class="current">'+
					   '<em class="mark"></em>'+
					   '<a href="###" class="link-hd">'+
					   '<span class="fl"><b>'+(list.nodeDesc||"")+'</b></span>'+
					   '<span class="fl">状态:'+list.nodeContent+'</span>'+
					   '<span class="fl">地点:'+(list.nodeLocation||"")+'</span>'+
		               '<span class="fl">时间:'+(list.nodeDate||"")+'</span>'+
		               '</a>'+
					   '<div class="jq_tips">'+
					   '<p><span class="tips_txt"><b>船名/航次（备注）:</b>'+(list.nodeRemark||"")+'</span></p>'+
					   '<em></em></div></li>' 
					 
				  }  
				  
				  //该节点有子节点
                  if(list.nodeSequence!=currentnode&&list.nodeFlagCtn=="Y"){
					  
					  $html+= '<li class="current">'+
					   '<em class="mark"></em>'+
					   '<a href="###" class="link-hd">'+
					   '<span class="fl"><b>'+(list.nodeDesc||"")+'</b></span>'+
					   '<span class="fl">船名/航次:'+(list.nodeRemark||"")+'</span>'+
					   '<span class="fl">地点:'+(list.nodeLocation||"")+'</span>'+
					   '<span class="fr"><b>上移看详情</b></span>'+
		               '</a>'+
		               '<div class="jq_tips">';  
					  
					   divclose="n";
				  }  

				 if(list.nodeFlagCtn=="Y"){
						
                	 $html+='<p><span class="tips_txt">箱号:'+(list.nodeCtnNo||"")+'</span>'+
						    //'<span class="tips_txt">地点：'+list.nodeLocation+'</span>'+
						    '<span class="tips_txt">时间：'+(list.nodeDate||"")+'</span></p>';
                	 
				  }
				 
				 //解决最后一个节点的关闭问题
				 if((i==obj.length-1)&&divclose=="n"){
					  $html+='<em></em></div></li>';
				 }
				 
				 currentnode = list.nodeSequence;
				 
				
			  });
			  
			  $("#traceinfo").html($html);
			  
		  }
		  
		  //将最后的一个节点标绿
		  $("#traceinfo li:last").addClass("last_log");
		  $("#querycontent").fadeIn(500); 
		  
		  $("#ctnbutton").val("查询").removeAttr("disabled");
        },
        error : function(){
        	alert("通信发送异常！");
        	$("#ctnbutton").val("查询").removeAttr("disabled");
      	}
	});
}


function resetform(){
	$("#form1")[0].reset();
	$("#querycontent").fadeOut(500); 
}

$('#ctnbutton').on('click', _submit);
$('#emptybutton').on('click', resetform)
