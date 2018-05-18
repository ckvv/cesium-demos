class Mychart{
    constructor(){

    }
    static addchartDiv(id){
        var chartdiv=document.createElement('div');
        chartdiv.className="chartdiv";
        chartdiv.id=id;
        document.querySelector('.charst_content').appendChild(chartdiv);
    }
    static removeAllChart(){
        document.querySelector('.charst_content').innerHTML='';
    }
}