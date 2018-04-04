window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    var provider = web3.currentProvider;

  } else {
    $("#error").removeClass('hidden');
  }

  web3.version.getNetwork((err, netId) => {
    if (netId != 4) $("#error").removeClass('hidden');
  });

  this.contract = web3.eth.contract(metaFrontAbi).at(metaFrontAddress);
  updatePage();
  
  
  $("#refresh").click(function () {
    updatePage();
  });
  
  
  $("#submit").click(function () {
    let contract = web3.eth.contract(metaFrontAbi).at(metaFrontAddress);
    let input = parseInt($("#input").val());
    contract.setNum(input, { from: web3.eth.accounts[0] }, (err, resp) => {
      if (err == null) {
        $("#success").removeClass('hidden');
        setTimeout(function () { $("#success").addClass('hidden'); }, 3000)
      }
    });
  });

})


function updatePage() {
  $("#address").text(web3.eth.accounts[0]);
  this.contract.user.call((err, resp) => {
    $("#lastSender").text(resp);
  });
  this.contract.num.call((err, resp) => {
    $("#number").text(resp);
  });
}


