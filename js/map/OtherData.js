class OtherData{
    constructor(){

    }
    /**
     * BIM数据
     */
    static TilesBIMTest(){
        var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url : 'https://beta.cesium.com/api/assets/1459?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNjUyM2I5Yy01YmRhLTQ0MjktOGI0Zi02MDdmYzBjMmY0MjYiLCJpZCI6NDQsImFzc2V0cyI6WzE0NTldLCJpYXQiOjE0OTkyNjQ3ODF9.SW_rwY-ic0TwQBeiweXNqFyywoxnnUBtcVjeCmDGef4'
        }));
        
        tileset.readyPromise.then(function() {
            var boundingSphere = tileset.boundingSphere;
            viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.5, -0.2, boundingSphere.radius * 4.0));
            viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        }).otherwise(function(error) {
            throw(error);
        });
    }
    /**
     * 倾斜摄影数据
     */
    static TilesQXTest(){
        var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url : 'https://beta.cesium.com/api/assets/1458?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYmJiNTAxOC1lOTg5LTQzN2EtODg1OC0zMWJjM2IxNGNlYmMiLCJpZCI6NDQsImFzc2V0cyI6WzE0NThdLCJpYXQiOjE0OTkyNjM4MjB9.1WKijRa-ILkmG6utrhDWX6rDgasjD7dZv-G5ZyCmkKg'
        }));
        
        tileset.readyPromise.then(function() {
            var boundingSphere = tileset.boundingSphere;
            viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius));
            viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        }).otherwise(function(error) {
            throw(error);
        });
    }
    /**
     * 点云数据
     */
    static TilesPointCloudTest(){
        var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url : 'https://beta.cesium.com/api/assets/1460?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMzk2YzJiOS1jZGFmLTRlZmYtYmQ4MS00NTA3NjEwMzViZTkiLCJpZCI6NDQsImFzc2V0cyI6WzE0NjBdLCJpYXQiOjE0OTkyNjQ3NTV9.oWjvN52CRQ-dk3xtvD4e8ZnOHZhoWSpJLlw115mbQJM'
        }));
        
        tileset.readyPromise.then(function() {
            var boundingSphere = tileset.boundingSphere;
            viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius));
            viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        }).otherwise(function(error) {
            throw(error);
        });
    }
    //点聚合
    static ClusterPoints(){
        var options = {
            camera : viewer.scene.camera,
            canvas : viewer.scene.canvas
        };
        var dataSourcePromise = viewer.dataSources.add(Cesium.KmlDataSource.load('data/kml/facilities/facilities.kml', options));
        dataSourcePromise.then(function(dataSource) {
            var pixelRange = 15;
            var minimumClusterSize = 3;
            var enabled = true;
        
            dataSource.clustering.enabled = enabled;
            dataSource.clustering.pixelRange = pixelRange;
            dataSource.clustering.minimumClusterSize = minimumClusterSize;
        
            var removeListener;
        
            var pinBuilder = new Cesium.PinBuilder();
            var pin50 = pinBuilder.fromText('50+', Cesium.Color.RED, 38).toDataURL();
            var pin40 = pinBuilder.fromText('40+', Cesium.Color.ORANGE, 38).toDataURL();
            var pin30 = pinBuilder.fromText('30+', Cesium.Color.YELLOW, 38).toDataURL();
            var pin20 = pinBuilder.fromText('20+', Cesium.Color.GREEN, 38).toDataURL();
            var pin10 = pinBuilder.fromText('10+', Cesium.Color.BLUE, 48).toDataURL();
        
            var singleDigitPins = new Array(8);
            for (var i = 0; i < singleDigitPins.length; ++i) {
                singleDigitPins[i] = pinBuilder.fromText('' + (i + 2), Cesium.Color.VIOLET, 48).toDataURL();
            }
        
            function customStyle() {
                if (Cesium.defined(removeListener)) {
                    removeListener();
                    removeListener = undefined;
                } else {
                    removeListener = dataSource.clustering.clusterEvent.addEventListener(function(clusteredEntities, cluster) {
                        cluster.label.show = false;
                        cluster.billboard.show = true;
                        cluster.billboard.id = cluster.label.id;
                        cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
        
                        if (clusteredEntities.length >= 50) {
                            cluster.billboard.image = pin50;
                        } else if (clusteredEntities.length >= 40) {
                            cluster.billboard.image = pin40;
                        } else if (clusteredEntities.length >= 30) {
                            cluster.billboard.image = pin30;
                        } else if (clusteredEntities.length >= 20) {
                            cluster.billboard.image = pin20;
                        } else if (clusteredEntities.length >= 10) {
                            cluster.billboard.image = pin10;
                        } else {
                            cluster.billboard.image = singleDigitPins[clusteredEntities.length - 2];
                        }
                    });
                }
        
                // force a re-cluster with the new styling
                var pixelRange = dataSource.clustering.pixelRange;
                dataSource.clustering.pixelRange = 0;
                dataSource.clustering.pixelRange = pixelRange;
            }
        
            // start with custom style
            customStyle();
        
            var viewModel = {
                pixelRange: pixelRange,
                minimumClusterSize: minimumClusterSize
            };
            Cesium.knockout.track(viewModel);
        
            var toolbar = document.getElementById('toolbar');
            Cesium.knockout.applyBindings(viewModel, toolbar);
        
            function subscribeParameter(name) {
                Cesium.knockout.getObservable(viewModel, name).subscribe(
                    function(newValue) {
                        dataSource.clustering[name] = newValue;
                    }
                );
            }
        
            subscribeParameter('pixelRange');
            subscribeParameter('minimumClusterSize');
        
            Sandcastle.addToggleButton('Enabled', true, function(checked) {
                dataSource.clustering.enabled = checked;
            });
        
            Sandcastle.addToggleButton('Custom Styling', true, function(checked) {
              customStyle();
            });
        
            var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            handler.setInputAction(function(movement) {
                var pickedLabel = viewer.scene.pick(movement.position);
                if (Cesium.defined(pickedLabel)) {
                    var ids = pickedLabel.id;
                    if (Cesium.isArray(ids)) {
                        for (var i = 0; i < ids.length; ++i) {
                            ids[i].billboard.color = Cesium.Color.RED;
                        }
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        });
    }
    //htmlOverlay
    static HtmlOverlay(){
        var htmlOverlay = document.getElementById('displaySettingWin');
        var scratch = new Cesium.Cartesian2();
        viewer.scene.preRender.addEventListener(function() {
            var position = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
            var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
            if (Cesium.defined(canvasPosition)) {
                htmlOverlay.style.top = canvasPosition.y + 'px';
                htmlOverlay.style.left = canvasPosition.x + 'px';
            }
        });
    }
    //add point
    static addPoints(){
        var pinBuilder = new Cesium.PinBuilder();

        var bluePin = viewer.entities.add({
            name : 'Blank blue pin',
            position : Cesium.Cartesian3.fromDegrees(-75.170726, 39.9208667),
            billboard : {
                image : pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
                verticalOrigin : Cesium.VerticalOrigin.BOTTOM
            }
        });

        var questionPin = viewer.entities.add({
            name : 'Question mark',
            position : Cesium.Cartesian3.fromDegrees(-75.1698529, 39.9220071),
            description: '<div>tile:chekai</div><hr/><div></div>',
            billboard : {
                image : pinBuilder.fromText('我是陈锴大魔王', Cesium.Color.BLACK, 48).toDataURL(),
                distanceDisplayCondition: 2000,
                width: 200,
                height: 100,
                verticalOrigin : Cesium.VerticalOrigin.BOTTOM
            }
        });

        var url = Cesium.buildModuleUrl('../../img/page/nav/logo.png');
        var groceryPin = Cesium.when(pinBuilder.fromUrl(url, Cesium.Color.GREEN, 48), function(canvas) {
            return viewer.entities.add({
                name : 'Grocery store',
                position : Cesium.Cartesian3.fromDegrees(-75.1705217, 39.921786),
                billboard : {
                    image : canvas.toDataURL(),
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM
                }
            });
        });

        //Create a red pin representing a hospital from the maki icon set.
        var hospitalPin = Cesium.when(pinBuilder.fromMakiIconId('hospital', Cesium.Color.RED, 48), function(canvas) {
            return viewer.entities.add({
                name : 'Hospital',
                description: '<div>tile:chekai</div><hr/><div></div>',
                position : Cesium.Cartesian3.fromDegrees(-75.1698606, 39.9211275),
                billboard : {
                    image : canvas.toDataURL(),
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM
                }
            });
        });

        // for(var i=0;i<=1000;i++){
        //     viewer.entities.add({
        //         name : 'testData:'+i,
        //         position : Cesium.Cartesian3.fromDegrees(Math.random()*360-180, Math.random()*180-90),
        //         billboard : {
        //             image : pinBuilder.fromText(i, Cesium.Color.BLACK, 48).toDataURL(),
        //             verticalOrigin : Cesium.VerticalOrigin.BOTTOM
        //         }
        //     });
        // }

        //Since some of the pins are created asynchronously, wait for them all to load before zooming/
        // Cesium.when.all([bluePin, questionPin, groceryPin, hospitalPin], function(pins){
        //     viewer.zoomTo(pins);
        // });
    }
}