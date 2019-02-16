// Copyright (c) 2018, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.

var notification = document.getElementById("notification_container");
var identicon_widget = document.getElementById("address_identicon_widget");
var qr_widget = document.getElementById("address_qr_widget");
var details_container = document.getElementById("address_details");

function checkAddress() {

  notification.innerHTML = '';
  identicon_widget.innerHTML = '';
  qr_widget.innerHTML = '';
  details_container.innerHTML = '';

  var address = document.getElementById("address").value;
  var address_info = cnUtil.validate_address(address);
  
  if(!address_info.valid) {
    notification.innerHTML = '<div class="column is-12 notification is-danger has-text-centered">Invalid XLS address!</div>';
    return;
  }
  else {
    notification.innerHTML = '<div class="column is-12 notification is-success has-text-centered">Valid XLS address!</div>';
  }
  

  var icon = document.createElement("canvas");
  icon.width = 256;
  icon.height = 256;
  icon.setAttribute("data-jdenticon-value", address);
  jdenticon.update(icon);

  identicon_widget.appendChild(icon);

  var typeNumber = 0;
  var errorCorrectionLevel = 'L';

  // fix scaling for integrated qr codes
  var qr_size = address_info.is_integrated ? 5 : 7;
  
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(address);
  qr.make();
  qr_widget.innerHTML = qr.createImgTag(qr_size, 0);

  // remove some unimportant info
  delete address_info.address;
  delete address_info.integrated_id;
  delete address_info.view;
  delete address_info.spend;
  delete address_info.noprefix;
  details_container.innerHTML = JSON.stringify(address_info,null,2);
}
