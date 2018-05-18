class HeatMap{
    constructor(){
    }
    //修改了maxCanvasSize分辨率
    static initHeatMap(radius,time){
        // let bounds = {
        //     west: 106,
        //     east: 119,
        //     south: 28,
        //     north: 41
        // };
        // let bounds = {
        //     west: 106.4,
        //     east: 118.8,
        //     south: 28.6,
        //     north: 40.1
        // };
        // 
        let bounds = {
            west: 113.4,
            east: 113.9,
            south: 34.5,
            north: 34.9
        };
        // init heatmap
        let heatMap = CesiumHeatmap.create(
            viewer, // your cesium viewer
            bounds, // bounds for heatmap layer
            {
                // heatmap.js options go here
                radius: radius
            }
        );
        //2016-11-15 15:00-2016-11-15 15:30
        //http://localhost:8080/myssm/zztaxi/selectZZTaxisByTime?t_time=2016-11-15%2014:53
       // $.getJSON("http://localhost:8080/myssm/zztaxi/selectZZTaxisByTime",{t_time:time},function(data){
         $.getJSON("data/taxi/selectZZTaxisByTime.json",function(data){
            let mydata=[];
            for (let value of data){
                let myvalue=value;
                if(value.value>60){
                    myvalue.value=1;
                    mydata.push(myvalue);
                }else{
                    if(value.value>40){
                        myvalue.value=1;
                        mydata.push(myvalue);
                    }else{
                        if(value.value>10){
                            myvalue.value=2;
                            mydata.push(myvalue);
                        }else{
                             if(value.value>0){
                                myvalue.value=3;
                                mydata.push(myvalue);
                             }
                        }
                    }
                }
            }
            heatMap.setWGS84Data(1, 3, mydata);
            //heatMap.setData(1, 3, mydata);
            console.log(heatMap);
        });
        
    }
}