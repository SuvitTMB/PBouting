var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var ShortDate = "";
var xNameColor = "";
var xCodeColor = "";
var txtCheckBuddy = "";
var ArrEmpID = [];



$(document).ready(function () {
  Connect_DB();
  dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  LoadEmpIDArray();
  loadUser();
});



function LoadEmpIDArray() {
  ArrEmpID = [];
  dbRSOCMember
  .get().then((snapshot)=> {
  snapshot.forEach(doc=>{
      ArrEmpID.push({ EmpID: doc.data().EmpID, EmpName: doc.data().EmpName, ShortName: doc.data().ShortName, EmpLinePicture: doc.data().LinePicture, EmpPosition: doc.data().EmpPosition, EmpBranch: doc.data().EmpBranch, EmpBU: doc.data().EmpBU, EmpZone: doc.data().EmpZone, EmpRH: doc.data().EmpRH, EmpPhone: doc.data().EmpPhone });
    });
  });  
}


var GroupBuddy = ""; // empid
//var GroupTeam = "";
function loadUser() { 
  var str = "";
  var str1 = "";
  dbRSOCMember.where('EmpID','==', parseFloat(sessionStorage.getItem("EmpID_Outing")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().EmpTeam!="") {
          if(doc.data().IDBuddy=="") { 
            str1 +='<div style="margin:10px auto;">โจทย์ ... จับคู่ผลไม้ที่มีชื่อเหมือนกันกับคุณ</div>';
            str1 +='<div style="margin:0px auto; font-size:17px; font-weight: 600; color:#f68b1f;">"'+ doc.data().NameFruit +'"</div>';
            str1 +='<div class="btn-t1" onclick="BuddyGame()" style="margin-top:15px;">เกมส์ค้นหาบัดดี้ของคุณ</div><div class="clr"></div>';
          } else {
            const results = ArrEmpID.filter(obj => {return obj.EmpID === doc.data().IDBuddy;});
            str1 += '<div class="clr"></div><div style="margin-top:20px;"><img src="'+ results[0].LinePicture +'" class="profile-team1" onerror="javascript:imgError(this)"></div>';
            str1 += '<div class="NameLine" style="margin-top:14px;"><b>'+ results[0].EmpName +' <font color="#f68b1f">('+ results[0].ShortName +')</font></b>';

            //str1 += '<div class="NameLine" style="margin-top:14px;"><b>'+ results[0].EmpName +'</b>';
            if(results[0].EmpPosition!= "") {
              str1 += '<br>'+ results[0].EmpPosition 
            }
            if(results[0].EmpBranch!= "") {
              str1 += '<br>'+ results[0].EmpBranch 
            }
            if(results[0].EmpZone!= "") {
              str1 += '<br>'+ results[0].EmpZone
            }
            if(results[0].EmpRH!= "") {
              str1 += '<br>'+ results[0].EmpRH
            }
            if(results[0].EmpBU!= "") {
              str1 += '<br>'+ results[0].EmpBU
            }
            if(results[0].EmpPhone!= "") {
              str1 += '<br>โทร. <b>'+ results[0].EmpPhone +'</b>'
            }
            str1 += '</div>';


            //str1 += '<div class="NameLine" style="margin-top:14px;"><b>'+ results[0].EmpName +'</b><br>'+ results[0].EmpPosition +'<br>'+ results[0].EmpBranch +'<br>'+ results[0].EmpZone +'<br>'+ results[0].EmpRH +'<br>'+ results[0].EmpBU +'<br>โทร. '+ results[0].EmpPhone +'</div>';
          }
        str1 +='<div style="padding-top:20px;"></div>';
      } else {
        str1 +='<div style="width:100px;text-align: center;padding:8px;margin:auto;"><img src="'+ doc.data().LinePicture +'" class="profile-team1">';
        str1 +='</div>';
        str1 +='<div class="text-1" style="margin-top:5px;">'+ doc.data().EmpName +'<font color="#f68b1f"> ('+ doc.data().ShortName +')</font></div>';
        str1 +='<div class="text-2">'+ doc.data().EmpRH +'<br><b>'+ doc.data().EmpPhone +'</b></div>';


        str +='<div class="box-user">';
        str +='<div style="width:25%;float: left;text-align: center;padding:8px; "><img src="'+ doc.data().LinePicture +'" class="profile-team1">';
        str +='</div>';
        str +='<div style="width:75%;float: left;">';
        str +='<div class="text-1" style="margin-top:5px;">'+ doc.data().EmpName +'<font color="#f68b1f"> ('+ doc.data().ShortName +')</font></div>';
        str +='<div class="text-2">'+ doc.data().EmpRH +'<br><b>'+ doc.data().EmpPhone +'</b></div>';
        str +='<div class="btn-t2" style="margin:2px 0 0 0;cursor: default;background:#666;border:1px solid #fff;">ไม่ได้เข้าร่วมแบ่งทีมตามสี</div></div>';
        str +='</div>';
      }
    }); 
    $("#DisplayIMG").html(str1);  
  });
}


function BuddyGame() {
  location.href = 'buddygame.html';
}


function ShowMap(x) {
  var str = "";
  str += '<center>';
  if(x==1) { 
    str += '<div class="btn-t3">โรงแรม Kokotel Bangkok Surawong</div>';
    str += '<div><a href="https://www.kokotel.com/surawong/" target="_blank">เว็บไซต์ โรงแรม Kokotel Bangkok</a></div>';
    str += '<div style="margin-top:15px;"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1937.9249818059027!2d100.524474!3d13.727532000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d3ddd686e5%3A0xaf45a0d806e63bbd!2sKokotel%20Bangkok%20Surawong!5e0!3m2!1sen!2sus!4v1705381833914!5m2!1sen!2sus" width="100%" height="600px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>';
  } else {
    str += '<div class="btn-t3">โรงแรม atNares Hotel</div>';
    str += '<div><a href="https://www.atnares.com/" target="_blank">เว็บไซต์ โรงแรม @NARES Bangkok</a></div>';
    str += '<div style="margin-top:15px;"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1937.9249818059027!2d100.524474!3d13.727532000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d3ddd686e5%3A0xaf45a0d806e63bbd!2sKokotel%20Bangkok%20Surawong!5e0!3m2!1sen!2sus!4v1705381833914!5m2!1sen!2sus" width="100%" height="600px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>';
  }
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin:15px auto 25px auto;">ปิดหน้าต่างนี้</div>';
  str += '</center>';
  $("#DisplayMap").html(str);  
  document.getElementById('id01').style.display='block';
}



function imgError(image,id) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    return true;
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  //document.getElementById('id02').style.display='none';
}