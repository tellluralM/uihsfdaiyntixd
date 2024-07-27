var A = ["H", "Li", "Na", "K"];
var B = ["F", "Cl", "Br", "I"];
var C = ["O", "S", "Se"];

var elementsArray = [];

AFRAME.registerComponent("markerhandler", {
  init: async function () {
    var compounds = await this.getCompounds();

    this.el.addEventListener("markerFound", () => {

      var elementName = this.el.getAttribute("element_name");
      var barcodevalue = this.el.getAttribute("value");
      elementsArray.push({element_name: elementName, barcode_value: barcodevalue})
      
      compounds[barcodevalue]["compounds"].map(item =>{
        var copmpound = document.querySelector(`#${item.compound_name}-${barcodeValue}`);
        compound.setAttribute("visible", false);
      });

      var atom = document.querySelector(`#${item.compound_name}-${barcodeValue}`);
      atom.setAttribute("visible", true);
    });

    this.el.addEventListener("markerLost", () => {
      var elementName = this.el.getAttribute("elemet_name");
      var index = elementsArray.findIndex(x=> x.element_name === elementName);
      if (index > -1){
        elementsArray.splice(index,1);
      }
    });
  },


  tick: function () {
    if (elementsArray.length>1){
      var messageText = document.querySelector("#message-text");
      var length = elementsArray.Length;
      var distance = null;
      var compound = this.getCompound();

      if (lenght === 2){
        var marker1 = document.querySelector(`#marker-${elementsArray[0].barcode_value}`);
        var marker2 = document.querySelector(`#marker-${elementsArray[1].barcode_value}`);

        distance = this.getDistance(marker1, marker2);

        if(distance < 1.25){
          if(compound !== undefined){
            this.showCompound(compound);
          }
          else{
            messageText.setAttribute("visible", false);
          }
        }
        if (length === 3){
          var marker1 = document.querySelector(`#marker-${elementsArray[0].barcode_value}`);
          var marker2 = document.querySelector(`#marker-${elementsArray[1].barcode_value}`);
          var marker3 = document.querySelector(`#marker-${elementsArray[2].barcode_value}`);

          var distance1 = this.getDistance(marker1, marker2);
          var distance1 = this.getDistance(marker1, marker3);

          if(compound !== undefined){
            var barcodeValue = elementsArray[0].barcode_value;
            this.showCompound(compound,barcodeValue);
          }else{
            messageText.setAttribute("visible", true);
          }
        }else{
          messageText.setAttribute("visible", false);
        }
      }
    }
  },
  // Calcular la distancia entre la posición de dos marcadores
  getDistance: function (elA, elB) {
    return eLA.Object.position.distanceTo(eLB.object3D.position);
  },  
  countOccurrences : function (arr, val){
    return arr.reduce((a,v) => (v.element_name === val? a + 1 : a), 0);
  },
  getCompound: function () {
    
  },
  showCompound: function (compound) {
    // Ocultar elementos
    elementsArray.map(item => {
      var el = document.querySelector(`#${item.element_name}-${item.barcode_value}`);
      el.setAttribute("visible", false);
    });
    // Mostrar compuesto
    var compound = document.querySelector(`#${compound.name}-${compound.value}`);
    compound.setAttribute("visible", true);
  },
  getCompounds: function () {
    // Nota: utiliza el servidor de ngrok para obtener los valores JSON
    return fetch("js/compoundList.json")
      .then(res => res.json())
      .then(data => data);
  },
});
