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
/*
  sessionStorage.setItem("EmpID_Outing", 81636);
  var str = "";
  if(sessionStorage.getItem("EmpID_Outing")==null) { location.href = "index.html"; }
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
  str += '<div class="NameLine" style="margin-top:8px;">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
*/
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


function CheckPoll() {
  dbRSOCPoll.where('EmpID','==',sessionStorage.getItem("EmpID_Outing"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      DoneSurvey = 1;
      ShowScore = doc.data().AdvScore;
    });
    document.getElementById('DisplayWait').style.display='none';
    document.getElementById('DisplayPoll').style.display='block';
  });
}


var GroupColor = "";
var GroupHotel =""; // 1,2 
var GroupRoom = ""; // 0 ไม่ได้สิทธิ , 1 ได้สิทธิ
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
        str1 +='<div style="width:100px;text-align: center;padding:8px;margin:auto;">';
        str1 +='<img src="'+ doc.data().LinePicture +'" class="profile-team1" onerror="javascript:imgError(this)">';
        if(doc.data().GroupColor!="") {
          str1 +='<div style="margin-top:-25px;"><img src="./img/'+ doc.data().GroupColor +'.png" style="width:80px; margin-left:7px;"></div>';          
        }
        str1 +='</div>';
        str1 +='<div class="text-1" style="margin-top:5px;">'+ doc.data().EmpName +'<font color="#f68b1f"> ('+ doc.data().ShortName +')</font></div>';
        str1 +='<div class="text-2" style="margin-top:2px; color:#0056ff;">';
        if(doc.data().EmpPosition!="") {
          str1 += ''+doc.data().EmpPosition;
        }
        if(doc.data().EmpBranch!="") {
          str1 += '<br>'+doc.data().EmpBranch;
        }
        if(doc.data().EmpZone!="") {
          str1 += '<br>'+doc.data().EmpZone;
        }
        if(doc.data().EmpBU!="") {
          str1 += '<br>'+doc.data().EmpBU;
        }
        if(doc.data().EmpPhone!="") {
          str1 += '<br>โทร. <b>'+doc.data().EmpPhone+'</b>';
        }
        str1 +='</div>';
        str1 +='<div class="clr"></div>';        
        str1 +='<div class="btn-t4" style="margin-top:30px;">2. สีของทีมคุณ</div>';
        if(doc.data().GroupColor=="") {
          str1 +='<div style="margin:10px auto 0px auto; color:#ff0000;">*** <b>คุณไม่ต้องสังกัดสี</b> ***</div>';
        } else if(doc.data().GroupColor!="") { 
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
          if(doc.data().GroupColor!="") {
            str1 +='<div style="margin:10px auto 0px auto;"><img src="./img/'+ doc.data().GroupColor +'.png" style="width:60px;"><br><b><font color="'+ xCodeColor +'">ทีม ... '+ xNameColor +'</font></b></div>';            
          }
        }

        str1 +='<div style="padding-top:10px;"><hr></div>';
        str1 +='<div class="btn-t4">3. Buddy ของคุณ</div>';
        if(doc.data().IDBuddy=="") { 
          str1 +='<div style="margin:10px auto 0px auto; color:#ff0000;">*** คุณไม่ต้องจับคู่ ***</div>';
          //str1 +='<div style="margin:10px auto;">จับคู่ผลไม้ที่มีชื่อเหมือนกันกับคุณ</div>';
          //str1 +='<div style="margin:0px auto; font-size:17px; font-weight: 600; color:#f68b1f;">"'+ doc.data().NameFruit +'"</div>';
          //str1 +='<div class="btn-t1" onclick="BuddyGame()" style="margin-top:15px;">ค้นหาบัดดี้ของคุณ</div><div class="clr"></div>';
        } else {
          //console.log(doc.data().IDBuddy);
          const results = ArrEmpID.filter(obj => {return obj.EmpID === doc.data().IDBuddy;});
          //const results = ArrEmpID.filter(obj => {return obj.EmpID === 8400;});
          //console.log("Buddy="+doc.data().IDBuddy);
          //console.log("Img="+results[0].EmpLinePicture);
          //if(results[0].EmpLinePicture!=undefined) {
          //  alert("Found");
          //}
          str1 += '<div class="clr"></div><div style="margin-top:20px;"><img src="'+ results[0].EmpLinePicture +'" class="profile-team1" onerror="javascript:imgError(this)"></div>';
          str1 += '<div class="NameLine" style="margin-top:14px;"><b>'+ results[0].EmpName +' <font color="#f68b1f">('+ results[0].ShortName +')</font></b>';
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
          //str1 += '<br>'+ results[0].EmpPosition +'<br>'+ results[0].EmpBranch +'<br>'+ results[0].EmpZone +'<br>'+ results[0].EmpRH +'<br>'+ results[0].EmpBU +'<br>โทร. '+ results[0].EmpPhone +'</div>';
        }

        if(doc.data().GroupHotel!="") {
          str1 +='<div style="padding-top:20px;"><hr></div>';
          str1 +='<div class="btn-t4">4. โรงแรมที่พักของคุณ</div>';
          if(doc.data().GroupHotel=="") {
            str1 +='<div style="margin:10px auto 0px auto; color:#ff0000;">*** <b>คุณไม่ได้เข้าพักที่โรงแรม</b> ***</div>';
          } else if(doc.data().GroupHotel=="Hotel1") {
            str1 +='<div style="margin:10px auto 0px auto;"><b>โรงแรม Kokotel Bangkok Surawong</b></div>';
            str1 +='<div class="btn-t1" onclick="ShowMap(1)" style="margin-top:15px;">ดูรายละเอียดโรงแรม</div><div class="clr"></div>';
          } else if(doc.data().GroupHotel=="Hotel2") {
            str1 +='<div style="margin:10px auto 0px auto;"><b>โรงแรม @Nares Hotel</b></div>';
            str1 +='<div class="btn-t1" onclick="ShowMap(2)" style="margin-top:15px;">ดูแผนที่โรงแรม</div><div class="clr"></div>';
          }
          str1 +='<div style="padding-top:20px;"><hr></div>';
          if(doc.data().SumRoomID!=0 && doc.data().GroupHotel!="") { 
            str1 +='<div class="btn-t3">5. ผู้ที่พักร่วมห้องกับคุณ</div>';
            str1 +='<div style="margin:10px auto 0px auto;color:#ff0000;"><b>เข้าพักเฉพาะคืนวันที่ 26 มกราคม 2566<br>ตามโรงแรมที่กำหนดให้เท่านั้น</b></div>';
            if(doc.data().SumRoomID==1) {
              str1 +='<div style="margin:10px auto 0px auto; color:#0056ff;"><b>*** คุณนอนพักท่านเดียว ***</b></div>';
            } else {
              const results_Room = ArrEmpID.filter(obj => {return obj.EmpID === doc.data().IDRoom;});
              str1 += '<div class="clr"></div><div style="margin-top:20px;"><img src="'+ results_Room[0].EmpLinePicture +'" class="profile-team1" onerror="javascript:imgError(this)"></div>';
              str1 += '<div class="NameLine" style="margin-top:14px; color:#0056ff;"><b>'+ results_Room[0].EmpName +' <font color="#f68b1f">('+ results_Room[0].ShortName +')</font></b>';
              if(results_Room[0].EmpPosition!= "") {
                str1 += '<br>'+ results_Room[0].EmpPosition 
              }
              if(results_Room[0].EmpBranch!= "") {
                str1 += '<br>'+ results_Room[0].EmpBranch 
              }
              if(results_Room[0].EmpZone!= "") {
                str1 += '<br>'+ results_Room[0].EmpZone
              }
              if(results_Room[0].EmpRH!= "") {
                str1 += '<br>'+ results_Room[0].EmpRH
              }
              if(results_Room[0].EmpBU!= "") {
                str1 += '<br>'+ results_Room[0].EmpBU
              }
              if(results_Room[0].EmpPhone!= "") {
                str1 += '<br>โทร. <b>'+ results_Room[0].EmpPhone +'</b>'
              }
              str1 += '</div>';
              //str1 += '<div class="NameLine" style="margin-top:14px;"><b>'+ results_Room[0].EmpName +'</b><br>'+ results_Room[0].EmpPosition +'<br>'+ results_Room[0].EmpBranch +'<br>'+ results_Room[0].EmpZone +'<br>'+ results_Room[0].EmpRH +'<br>'+ results_Room[0].EmpBU +'<br>โทร. '+ results_Room[0].EmpPhone +'</div>';
            }
          }
        }
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
    $("#DisplayYourTeam").html(str);  
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
    str += '<div style="margin-top:15px;"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1937.9249818059027!2d100.524474!3d13.727532000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d3ddd686e5%3A0xaf45a0d806e63bbd!2sKokotel%20Bangkok%20Surawong!5e0!3m2!1sen!2sus!4v1705381833914!5m2!1sen!2sus" width="100%" height="500px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>';
  } else {
    str += '<div class="btn-t3">โรงแรม @Nares Hotel</div>';
    str += '<div><a href="https://www.atnares.com/" target="_blank">เว็บไซต์ โรงแรม @NARES Bangkok</a></div>';
    str += '<div style="margin-top:15px;"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3875.83056098066!2d100.5236494!3d13.7287061!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d15ab11495%3A0x3281d34c79638ed5!2s%40Nares%20Hotel!5e0!3m2!1sth!2sth!4v1706106994075!5m2!1sth!2sth" width="100%" height="500px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>';
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