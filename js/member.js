var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Outing")==null) { location.href = "index.html"; }
  Connect_DB();
  dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  loadData();
});



function loadData() {
  var i = 0;
  var count = 0;
  var dataSet = "";
  var dataSrc = [];
  dbRSOCMember.orderBy('EmpName','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      xEmpMember = "";
      xTimegetBox = "";
      var xImg = "";
      var xText = "";
      //console.log(doc.data().EmpName+"\n"+doc.data().LinePicture);
      var xNameColor = "";
      var xCodeColor = "";
      switch(doc.data().GroupColor) {
        case "Group1" :
          xNameColor = "สีน้ำเงิน";
          xCodeColor = "#12427C";
          break;
        case "Group2" :
          xNameColor = "สีแดง";
          xCodeColor = "#B82822";
          break;
        case "Group3" :
          xNameColor = "สีขาว";
          xCodeColor = "#cccccc";
          break;
        case "Group4" :
          xNameColor = "สีเขียว";
          xCodeColor = "#61973D";
          break;
        case "Group5" :
          xNameColor = "สีฟ้า";
          xCodeColor = "#2E91DC";
          break;
        case "Group6" :
          xNameColor = "สีชมพู";
          xCodeColor = "#DC61AA";
          break;
        case "Group7" :
          xNameColor = "สีเหลือง";
          xCodeColor = "#FFC000";
          break;
        case "Group8" :
          xNameColor = "สีม่วง";
          xCodeColor = "#863AB7";
          break;
        default:
          // code block
      }

      xImg += '<img src="'+doc.data().LinePicture+'" class="profile-team" onerror="javascript:imgError(this,\''+ doc.id +'\')">';
      xImg += '<div style="font-size:11px; color:#f68b1f; text-align:center;margin-top:5px;"><b><font color="'+ xCodeColor +'">'+ xNameColor +'</font></b></div>';
      xText += '<div style="font-size:13px;line-height:1.3"><font color="#0056ff"><b>'+doc.data().EmpName+'</b></font><font color="#f68b1f"> ('+doc.data().ShortName+')</font><br>'+doc.data().EmpPosition+'<br>'+ doc.data().EmpRH +'<br>โทร. <b>'+doc.data().EmpPhone+'</b></div>';
      dataSet = [xImg, xText, "<div class='btn-t1' style='max-width:60px;margin-top:0px;' id="+i+">คลิก</div>", doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 

    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        //{ title: "EmpID", className: "txt-center" },
        { title: "รูป", className: "txt-center" },
        { title: "รายละเอียด" },
        { title: "รายการ", className: "txt-center" },
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          //lengthMenu: [[50, 100, 200, -1], [50, 100, 200, "All"]],
          lengthMenu: [[30, 50, 100, 200, -1], [30, 50, 100, 200, "All"]],
          columnDefs: [ { type: 'num-fmt', 'targets': [0] } ],
          order: [[ 1, 'asc']]
        //dom: 'Bfrtip', buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ]
      });   
      $('#ex-table tbody').on( 'click', 'tr', function () {
        var data = dTable.row( $(this).parents('tr') ).data();
        if(count!=0) {
            ClickID(dTable.row( this ).data()[4],dTable.row( this ).data()[3]);
        }
        //console.log(dTable.row( this ).data()[6]);
      });
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
  //$('#example').dataTable( { "lengthChange": false } );
}


function ClickID(x,uid) {
  var str = "";
  dbRSOCMember.where(firebase.firestore.FieldPath.documentId(), "==", uid)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<center><div><img src="'+doc.data().LinePicture+'" class="add-profile" style="margin:30px auto 10px auto;" onerror="javascript:imgError(this,\''+ uid +'\')"></div>';
      str += '<div class="NameLine" style="color:#f68b1f;">'+doc.data().LineName+'</div></center>';
      str += '<div class="text-1" style="text-align:center;">'+doc.data().EmpName+'<font color="#f68b1f"> ('+doc.data().ShortName+')</font></div>';
      str += '<div class="text-2" style="text-align:center;margin-top:12px;">'+doc.data().EmpPosition+'<br>'+doc.data().EmpZone+'<br>'+doc.data().EmpRH+'<br>'+doc.data().EmpBU+'<br>โทรศัพท์ : '+doc.data().EmpPhone+'</div>';
    });
    $("#DisplayProfile").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}



function CloseAll() {
  document.getElementById('id01').style.display='none';
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function ConvrtDate(str) {
  var date = new Date(str),
  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()+543].join("/");
}

function imgError(image,id) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    return true;
/*

    image.onerror = "";
    image.src = "./img/box.jpg";
    //alert(sessionStorage.getItem("LinePicture")+"==="+id);
    UpdateLinePicture(id);
    return true;
*/
}


function UpdateLinePicture(id) {
    dbRSOCMember.doc(id).update({
      LinePicture : sessionStorage.getItem("LinePicture")
    });

}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}



