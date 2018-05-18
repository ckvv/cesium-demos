// json文件不能添加注释
var Earth_CONFIG = {
    BingMapsKey:'AvwPU_3WloKx8AUKIYX5dnrhNt34HrndxHd0AMwqoC8uCvpDf-tEWC1Du4N5K2h2'
};
var MyURL = {
    Server:'localhost:8080',
    Web:'localhost:8081'
};
// 图标配置
var ChartOption = {
    NewYork : {
        backgroundColor: 'rgba(254, 254, 254, 0.4)',
        title : {
            text: '纽约市房屋高度统计',
            subtext: '单位 （米）',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['小于100','100-200','200-300','300-400','大于400']
        },
        series : [
            {
                name: '纽约市房屋高度',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:1548, name:'小于100'},
                    {value:335, name:'100-200'},
                    {value:310, name:'200-300'},
                    {value:234, name:'300-400'},
                    {value:135, name:'大于400'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            }
        ]
    },
    Satellite: {
        backgroundColor: 'rgba(254, 254, 254, 0.4)',
        title : {
            text: '世界各国在轨卫星统计',
            subtext: '2016-8',
            x:'center'
        },
        xAxis: {
            type: 'category',
            data: ['美国', '中国', '俄罗斯', '日本', '跨国卫星', '英国', '德国', '印度', '加拿大', '欧盟', '西班牙', '法国','其他'],
            axisLabel:{
                interval:0,
                rotate:45,
                margin:2,
                textStyle:{
                         color:"#222"
            }}
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [549, 142, 131, 55, 108, 39, 23,31,27,24,15,10,153],
            type: 'bar'
        }]
    }
    
}